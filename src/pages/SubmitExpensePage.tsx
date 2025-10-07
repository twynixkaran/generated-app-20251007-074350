import { ExpenseForm } from '@/components/ExpenseForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
export function SubmitExpensePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Submit Expense</h1>
        <p className="text-muted-foreground">
          Fill out the form below to submit a new expense for approval.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>New Expense Details</CardTitle>
          <CardDescription>Please provide all necessary information.</CardDescription>
        </CardHeader>
        <CardContent>
          <ExpenseForm />
        </CardContent>
      </Card>
    </div>
  );
}