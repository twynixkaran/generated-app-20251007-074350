import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/hooks/use-auth-store';
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const currentUser = useAuthStore((state) => state.currentUser);
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}