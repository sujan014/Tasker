import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PayloadSignJWT } from '../utils/types';
import { verifyJWT } from '../utils/auth';
import SidebarMenu from '../components/SideMenu';

const sidebarItems = [
  { title: 'Profile', url: '/profile' },
  { title: 'Tasks', url: '/dashboard' },
  { title: 'Settings', url: '#' },
];
export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = await verifyJWT<PayloadSignJWT>(token);
  console.log('jwt verify user', user);

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="">
      <SidebarMenu />
      <main className="flex-1 ml-56">{children}</main>
    </div>
  );

  // original
  return (
    <div className="flex-1 flex ">
      <SidebarMenu />
      <main className="flex-1">
        <main>{children}</main>
      </main>
    </div>
  );
}
