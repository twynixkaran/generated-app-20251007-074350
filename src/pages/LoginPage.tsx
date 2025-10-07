import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/hooks/use-auth-store';
import { api } from '@/lib/api-client';
import type { User } from '@shared/types';
import { toast } from 'sonner';
import { FileText, Loader2 } from 'lucide-react';
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('');
};
export function LoginPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { login, currentUser } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await api<User[]>('/api/users');
        setUsers(fetchedUsers);
      } catch (error) {
        toast.error('Failed to load user profiles.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  const handleLogin = (user: User) => {
    login(user);
    toast.success(`Welcome back, ${user.name}!`);
    navigate('/dashboard');
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-black opacity-50" />
      <div className="relative z-10 flex flex-col items-center space-y-4 mb-8">
        <FileText className="h-12 w-12 text-blue-500" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50">Clarity Expense</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Select a profile to sign in</p>
      </div>
      <Card className="w-full max-w-md relative z-10 animate-fade-in shadow-lg">
        <CardHeader>
          <CardTitle>User Profiles</CardTitle>
          <CardDescription>Choose a user to simulate logging in.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <Button
                  key={user.id}
                  variant="outline"
                  className="w-full flex justify-start items-center h-16 p-4 text-left transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => handleLogin(user)}
                >
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${user.name}`} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="font-semibold text-base">{user.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <footer className="absolute bottom-8 text-center text-muted-foreground/80">
        <p>Built with ❤️ at Cloudflare</p>
      </footer>
    </div>
  );
}