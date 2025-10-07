export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type UserRole = 'employee' | 'manager' | 'admin';
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
export type ExpenseStatus = 'pending' | 'approved' | 'rejected';
export interface ApprovalStep {
  approverId: string;
  approverName: string;
  status: 'approved' | 'rejected';
  timestamp: number;
  notes?: string;
}
export interface Expense {
  id: string;
  userId: string;
  merchant: string;
  amount: number;
  currency: string;
  date: number; // epoch millis
  description: string;
  status: ExpenseStatus;
  category: string;
  receiptUrl?: string;
  history: ApprovalStep[];
}