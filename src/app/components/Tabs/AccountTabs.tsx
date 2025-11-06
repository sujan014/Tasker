'use client';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/zustand/auth/authStore';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AccountTab() {
  const logoutAuthUser = useAuthStore((state) => state.logoutAuthUser);

  const [showAccount, setShowAccount] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/login');
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await logoutAuthUser();
    router.push('/');
  };
  const handleProfileClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/profile');
  };
  const handleNetworkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/network');
  };

  return (
    <div className="mt-2 flex flex-col gap-y-1 p-1 rounded-xl">
      <AnimatePresence initial={false}>
        {showAccount ? (
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, scale: 1, y: 150, z: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0, z: -10 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: 'easeIn',
            }}
            exit={{
              y: 150,
              z: -10,
              opacity: 0,
              transition: {
                duration: 1,
                ease: 'easeOut',
              },
            }}
          >
            <div className="flex flex-col gap-y-1 p-1 border border-gray-500 rounded-md">
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleProfileClick}
              >
                My Profile
              </Button>
              <Button
                className="bg-cyan-500 hover:bg-cyan-700"
                onClick={handleNetworkClick}
              >
                My Network
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                Sign out
              </Button>
              <Button
                className="w-10 h-10 rounded-full mt-1 bg-gray-700 self-center text-xl"
                onClick={() => setShowAccount(false)}
              >
                <ChevronDown className="font-bold hover:bg-black" />
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <Button
        className="text-black bg-fuchsia-400 hover:bg-fuchsia-500 opacity-100 z-10"
        onClick={() => setShowAccount(true)}
      >
        My Account
      </Button>
    </div>
  );
}
