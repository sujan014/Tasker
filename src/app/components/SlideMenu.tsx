'use client';

import { SideMenuItem } from './SideMenu';

import {
  BellRing,
  FolderKanban,
  Hourglass,
  House,
  ListChecks,
  ListTodo,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import AccountTab from './Tabs/AccountTabs';

interface menuBtnProp {
  handleMenu: () => void;
}
const MenuButton: React.FC<menuBtnProp> = ({ handleMenu }) => {
  return (
    <div className="w-fit h-fit border border-gray-300 rounded-2xl cursor-pointer">
      <div
        className="flex flex-col justify-between items-center gap-1 h-12 w-12 px-2 py-2 bg-white rounded-2xl sm:hidden group"
        onClick={handleMenu}
      >
        <div className="h-50 w-full bg-blue-900 rounded-4xl group-hover:bg-blue-500"></div>
        <div className="h-50 w-full bg-blue-900 rounded-4xl group-hover:bg-blue-500"></div>
        <div className="h-50 w-full bg-blue-900 rounded-4xl group-hover:bg-blue-500"></div>
      </div>
    </div>
  );
};

export { MenuButton };

interface menuProp {
  menuState: boolean;
}
const SlideMenuBar: React.FC<menuProp> = ({ menuState }) => {
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
    <AnimatePresence initial={false}>
      {menuState && (
        <motion.div
          className="w-56 fixed sm:flex-1 flex flex-col overflow-hidden sm:hidden"
          initial={{ opacity: 1, x: -160 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.3, ease: 'linear' },
          }}
          exit={{
            opacity: 0,
            x: '-100%',
            transition: { duration: 0.3, ease: 'linear' },
          }}
        >
          <div className="flex-1 flex flex-col border-r gap-y-2 mt-1 justify-between backdrop-blur-lg border border-gray-200 rounded-2xl">
            <div className="flex-1 flex flex-col">
              <div
                onClick={() => router.push('/')}
                className="text-2xl sm:text-5xl font-serif font-extrabold text-red-700 flex justify-center hover:cursor-pointer"
              >
                <House size={40} strokeWidth={1} />
              </div>
              {itemList.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
            <AccountTab />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlideMenuBar;
