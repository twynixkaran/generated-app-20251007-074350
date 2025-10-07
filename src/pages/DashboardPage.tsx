import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, CheckCircle, XCircle, Hourglass } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuthStore } from '@/hooks/use-auth-store';
import { api } from '@/lib/api-client';
import type { Expense } from '@shared/types';
import { Skeleton } from '@/components/ui/skeleton';
export function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useAuthStore((state) => state.currentUser);
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!currentUser) return;
      try {
        setLoading(true);
        const params = new URLSearchParams({ userId: currentUser.id, role: currentUser.role });
        const data = await api<Expense[]>(`/api/expenses?${params.toString()}`);
        setExpenses(data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, [currentUser]);
  const summary = expenses.reduce(
    (acc, expense) => {
      acc.total += expense.amount;
      if (expense.status === 'approved') acc.approved += 1;
      if (expense.status === 'rejected') acc.rejected += 1;
      if (expense.status === 'pending') acc.pending += 1;
      return acc;
    },
    { total: 0, approved: 0, rejected: 0, pending: 0 }
  );
  const chartData = expenses.reduce((acc, expense) => {
    const category = acc.find(c => c.name === expense.category);
    if (category) {
      category.amount += expense.amount;
    } else {
      acc.push({ name: expense.category, amount: expense.amount });
    }
    return acc;
  }, [] as { name: string; amount: number }[]);
  const SummaryCard = ({ title, value, icon: Icon, isLoading }: { title: string; value: string | number; icon: React.ElementType; isLoading: boolean }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? <Skeleton className="h-8 w-3/4" /> : <div className="text-2xl font-bold">{value}</div>}
      </CardContent>
    </Card>
  );
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Total Spent" value={`$${summary.total.toFixed(2)}`} icon={DollarSign} isLoading={loading} />
        <SummaryCard title="Approved" value={summary.approved} icon={CheckCircle} isLoading={loading} />
        <SummaryCard title="Pending" value={summary.pending} icon={Hourglass} isLoading={loading} />
        <SummaryCard title="Rejected" value={summary.rejected} icon={XCircle} isLoading={loading} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-[350px] w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="amount" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}