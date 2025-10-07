import { IndexedEntity } from "./core-utils";
import type { User, Expense } from "@shared/types";
import { MOCK_USERS, MOCK_EXPENSES } from "@shared/mock-data";
// USER ENTITY
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "", email: "", role: "employee" };
  static seedData = MOCK_USERS;
}
// EXPENSE ENTITY
export class ExpenseEntity extends IndexedEntity<Expense> {
  static readonly entityName = "expense";
  static readonly indexName = "expenses";
  static readonly initialState: Expense = {
    id: "",
    userId: "",
    merchant: "",
    amount: 0,
    currency: "USD",
    date: 0,
    description: "",
    status: "pending",
    category: "",
    history: [],
  };
  static seedData = MOCK_EXPENSES;
}