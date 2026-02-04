'use client';

import { useAppSelector } from '@/hooks';
import { motion } from 'framer-motion';
import {
  BellRing,
  FolderKanban,
  Hourglass,
  ListChecks,
  ListTodo,
  LucideIcon,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  //const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  // useEffect(() => {
  //   console.log('user: ', user);
  // }, []);
  const handleRoute = (path: string) => {
    router.push(path);
  };

  return (
    <div className="w-full p-5 grid grid-cols-1 md:grid-cols-2 gap-4 border">
      <TaskCard
        name={'Todos'}
        color="bg-red-100"
        icon={ListTodo}
        link={'/todos'}
        routeClick={handleRoute}
      />
      <TaskCard
        name={'Notes'}
        color="bg-green-100"
        icon={FolderKanban}
        link={'/notes'}
        routeClick={handleRoute}
      />
      <TaskCard
        name={'Timers'}
        color="bg-blue-100"
        icon={Hourglass}
        link={'/timers'}
        routeClick={handleRoute}
      />
      <TaskCard
        name={'Check Lists'}
        color="bg-orange-100"
        icon={ListChecks}
        link={'/checklist'}
        routeClick={handleRoute}
      />
      <TaskCard
        name={'Reminders'}
        color="bg-purple-400"
        icon={BellRing}
        link={'/reminders'}
        routeClick={handleRoute}
      />
    </div>
  );
}

type TaskProp = {
  name: string;
  color: string;
  icon: LucideIcon;
  link: string;
  routeClick: (arg: string) => void;
};

function TaskCard({ name, color, icon: Icon, link, routeClick }: TaskProp) {
  const pathName = usePathname();

  const handleClick = () => {
    routeClick(pathName + link);
  };

  return (
    <motion.div
      className={`w-full max-w-[400px] h-44 mx-auto flex items-center justify-center gap-2 ${color} rounded-2xl`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
    >
      <p className="text-center text-5xl font-bold">{name}</p>
      <div>
        <Icon size={50} />
      </div>
    </motion.div>
  );
}

// export default function Dashboard() {
//   const { user, isAuthenticated, errorMessage, loginFailed, registerFailed } =
//     useAppSelector((state) => state.auth);

//   const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     const logoutResponse = await logoutUser();
//     if (logoutResponse.isSuccess) {
//       redirect('/');
//     }
//     toast.message('You are Logged out.');
//   };
//   return (
//     <div>
//       <h1 className="text-3xl">Dashboard</h1>
//       <p>Welcome.</p>
//       <TodoForm />
//       <Button onClick={handleLogout}>Logout</Button>
//     </div>
//   );
// }
