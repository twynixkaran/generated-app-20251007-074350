import { Outlet } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  return (
    <AppLayout>
      <Outlet />
      <Toaster richColors />
    </AppLayout>
  );
}