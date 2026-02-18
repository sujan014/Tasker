'use client';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/zustand/auth/authStore';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const TopNavigation = () => {
  const logoutAuthUser = useAuthStore((state) => state.logoutAuthUser);
  const isAuthenticated = useAuthStore(
    (state) => state.authState.isAuthenticated,
  );

  const router = useRouter();

  const [hoverDashboard, setHoverDashboard] = useState(false);
  const [pageLoad, setPageLoad] = useState(false);

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
        Taskify
      </Link>
      <div className="w-[150px] sm:w-[200px] mr-1 flex justify-end items-center">
        <motion.button
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 5,
          }}
          className="sm:hidden h-16 w-16 rounded-full bg-[#3e49df] text-white cursor-pointer"
          onClick={handleLogin}
        >
          <LayoutDashboard
            strokeWidth={2}
            className="w-[30px] h-[30px] mx-auto"
          />
        </motion.button>
        <motion.button
          layout
          onHoverStart={() => {
            setHoverDashboard(true);
            setPageLoad(true);
          }}
          onHoverEnd={() => {
            setHoverDashboard(false);
          }}
          className={clsx(
            'hidden sm:flex justify-center items-center h-16 rounded-full bg-[#3e49df] text-white cursor-pointer',
            !hoverDashboard && 'w-16',
            hoverDashboard && 'w-full',
          )}
          onClick={handleLogin}
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={
            !hoverDashboard
              ? !pageLoad
                ? {
                    type: 'spring', // animation for button dropping vertically
                    stiffness: 100,
                    damping: 5,
                  }
                : {
                    ease: 'easeOut', // animation for button contract when not hovering
                  }
              : {
                  type: 'spring', // animation for button expand when hover
                  stiffness: 100,
                  damping: 10,
                }
          }
        >
          {!hoverDashboard ? (
            <LayoutDashboard
              strokeWidth={2}
              className="w-[30px] h-[30px] mx-auto"
            />
          ) : (
            <div className="flex w-full h-full items-center justify-evenly">
              <LayoutDashboard className="w-[30px] h-[30px]" />
              My dashboard
            </div>
          )}
        </motion.button>
      </div>
    </nav>
  );
};

export default TopNavigation;

{
  /* {!isAuthenticated ? (
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
        )} */
}
