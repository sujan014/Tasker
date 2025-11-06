'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import AccountTab from './Tabs/AccountTabs';
import { delay, motion } from 'framer-motion';
import {
  Activity,
  BellRing,
  FolderKanban,
  Hourglass,
  House,
  ListChecks,
  ListTodo,
} from 'lucide-react';

const sidebarItems = [
  // { title: 'Profile', url: '/profile' },
  // { title: 'Dashboard', url: '/dashboard' },
  // { title: 'Network', url: '/network' },
];

// export default function SidebarMenu() {
//   //const router = useRouter();
//   //const searchParams = useSearchParams();
//   const pathName = usePathname();

//   const getClass = (name: string) =>
//     `cursor-pointer w-full p-2 hover:bg-gray-200 hover:text-amber-900 hover:font-bold rounded-[8px] ${
//       pathName.includes(name.toLowerCase())
//         ? 'bg-black text-white hover:rounded-[8px]'
//         : 'bg-white text-black'
//     }`;

//   return (
//     <div className="flex flex-col w-56">
//       <div className="flex-1 flex flex-col border-r gap-y-2 mt-1 justify-between">
//         <div className="flex flex-col">
//           {sidebarItems.map((item) => (
//             <a
//               href={item.url}
//               key={item.title}
//               className={getClass(item.title)}
//             >
//               {item.title}
//             </a>
//           ))}
//         </div>
//         <AccountTab />
//       </div>
//     </div>
//   );
// }

export default function SidebarMenu() {
  const router = useRouter();

  const gotoRoute = (path: string) => {
    router.push(path);
  };

  const itemList = [
    <SideMenuItem
      key="1"
      name={'Todos'}
      color="bg-red-100"
      icon={ListTodo}
      link={'/todos'}
      routeClick={gotoRoute}
    />,
    <SideMenuItem
      key="2"
      name={'Notes'}
      color="bg-green-100"
      icon={FolderKanban}
      link={'/notes'}
      routeClick={gotoRoute}
    />,
    <SideMenuItem
      key="3"
      name={'Timers'}
      color="bg-blue-100"
      icon={Hourglass}
      link={'/timers'}
      routeClick={gotoRoute}
    />,
    <SideMenuItem
      key="4"
      name={'Check Lists'}
      color="bg-orange-100"
      icon={ListChecks}
      link={'/checklist'}
      routeClick={gotoRoute}
    />,
    <SideMenuItem
      key="5"
      name={'Reminders'}
      color="bg-purple-400"
      icon={BellRing}
      link={'/reminders'}
      routeClick={gotoRoute}
    />,
  ];
  return (
    <div className="fixed h-screen flex-1 flex flex-col w-56 overflow-hidden">
      <div className="flex-1 flex flex-col border-r gap-y-2 mt-1 justify-between">
        <div className="flex-1 flex flex-col">
          <div
            onClick={() => router.push('/')}
            className="text-2xl sm:text-5xl font-serif font-extrabold text-red-700 flex justify-center hover:cursor-pointer"
          >
            <House size={40} strokeWidth={1} />
          </div>
          {itemList.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.2 }}
            >
              {item}
            </motion.div>
          ))}
        </div>
        <AccountTab />
      </div>
    </div>
  );
}

type SideMenuProp = {
  name: string;
  color: string;
  icon: LucideIcon;
  link: string;
  routeClick: (arg: string) => void;
};

function SideMenuItem({
  name,
  color,
  icon: Icon,
  link,
  routeClick,
}: SideMenuProp) {
  //const pathName = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    routeClick(link);
  };

  return (
    <div className="m-2 hover:cursor-pointer">
      <motion.div
        className={`h-10 mx-auto flex items-center justify-center gap-2 ${color} rounded-sm`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1 }}
        onClick={handleClick}
      >
        <p className="text-center text-xl font-bold">{name}</p>
        <div>
          <Icon />
        </div>
      </motion.div>
    </div>
  );
}
