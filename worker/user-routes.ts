import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, ExpenseEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import { User, Expense } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // Ensure seed data is present on first load
  app.use('/api/*', async (c, next) => {
    await Promise.all([
      UserEntity.ensureSeed(c.env),
      ExpenseEntity.ensureSeed(c.env)
    ]);
    await next();
  });
  // USERS
  app.get('/api/users', async (c) => {
    const page = await UserEntity.list(c.env);
    return ok(c, page.items);
  });
  app.get('/api/users/:id', async (c) => {
    const id = c.req.param('id');
    const userEntity = new UserEntity(c.env, id);
    if (!(await userEntity.exists())) {
      return notFound(c, 'User not found');
    }
    const user = await userEntity.getState();
    return ok(c, user);
  });
  // EXPENSES
  app.get('/api/expenses', async (c) => {
    const userId = c.req.query('userId');
    const userRole = c.req.query('role');
    const { items: allExpenses } = await ExpenseEntity.list(c.env);
    if (userRole === 'admin' || userRole === 'manager') {
      // Admins and managers can see all expenses
      return ok(c, allExpenses.sort((a, b) => b.date - a.date));
    }
    if (userId) {
      // Employees see only their own expenses
      const userExpenses = allExpenses.filter(exp => exp.userId === userId);
      return ok(c, userExpenses.sort((a, b) => b.date - a.date));
    }
    return bad(c, 'A userId or admin/manager role is required to fetch expenses.');
  });
  app.get('/api/expenses/:id', async (c) => {
    const id = c.req.param('id');
    const expenseEntity = new ExpenseEntity(c.env, id);
    if (!(await expenseEntity.exists())) {
      return notFound(c, 'Expense not found');
    }
    const expense = await expenseEntity.getState();
    return ok(c, expense);
  });
  app.post('/api/expenses', async (c) => {
    const body = await c.req.json();
    // Basic validation
    if (!body.userId || !body.merchant || !body.amount || !body.date || !body.category) {
      return bad(c, 'Missing required expense fields.');
    }
    const newExpense: Expense = {
      id: `exp-${crypto.randomUUID()}`,
      userId: body.userId,
      merchant: body.merchant,
      amount: body.amount,
      currency: body.currency || 'USD',
      date: body.date,
      description: body.description || '',
      status: 'pending',
      category: body.category,
      history: [],
    };
    try {
      const createdExpense = await ExpenseEntity.create(c.env, newExpense);
      return ok(c, createdExpense);
    } catch (error) {
      console.error('Failed to create expense:', error);
      return c.json({ success: false, error: 'Failed to create expense' }, 500);
    }
  });
}