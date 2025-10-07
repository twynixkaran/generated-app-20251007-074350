import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 text-center">
      <h1 className="text-9xl font-black text-gray-200 dark:text-gray-700">404</h1>
      <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
        Page Not Found
      </p>
      <p className="mt-4 text-gray-500 dark:text-gray-400">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Button asChild className="mt-6">
        <Link to="/">Go back home</Link>
      </Button>
    </div>
  );
}