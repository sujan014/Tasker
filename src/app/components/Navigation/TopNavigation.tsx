'use client';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/zustand/auth/authStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const TopNavigation = () => {
  const logoutAuthUser = useAuthStore((state) => state.logoutAuthUser);
  const isAuthenticated = useAuthStore(
    (state) => state.authState.isAuthenticated
  );

  const router = useRouter();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await logoutAuthUser();
    router.push('/');
  };

  return (
    <nav className="flex justify-between items-center px-3 py-5 border-b-2 bg-gray-100 border-blue-900">
      <Link
        href="/"
        className="text-2xl sm:text-5xl font-serif font-extrabold text-red-700"
      >
        Todos
      </Link>
      {/* <NotebookTabs size={50} strokeWidth={1} fill="yellow" /> */}
      <div className="flex gap-x-2">
        {!isAuthenticated ? (
          <Button
            className="border-1 border-blue-500 rounded-2xl cursor-pointer hover:bg-blue-500 hover:text-white"
            variant={'secondary'}
            onClick={handleLogin}
          >
            My Dashboard
          </Button>
        ) : (
          <Button
            className="bg-transparent text-gray-800 rounded-2xl hover:bg-gray-800 hover:text-gray-200"
            onClick={handleLogout}
          >
            Log out
          </Button>
        )}
      </div>
    </nav>
  );
};

export default TopNavigation;
