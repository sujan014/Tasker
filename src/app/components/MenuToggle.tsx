'use client';
import { useState } from 'react';
import SidebarMenu from './SideMenu';
import SlideMenuBar, { MenuButton } from './SlideMenu';

export default function MenuToggle({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expandMenu, setexpandMenu] = useState(false);

  const Show_Hide_Menu = () => {
    setexpandMenu((prev) => !prev);
  };

  return (
    <div className="">
      <MenuButton handleMenu={Show_Hide_Menu} />
      <div className="flex">
        <SlideMenuBar menuState={expandMenu} />
        <SidebarMenu />
        <main className="flex-1 sm:ml-56">{children}</main>
      </div>
    </div>
  );
}
