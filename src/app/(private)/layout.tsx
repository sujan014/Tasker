import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PayloadSignJWT } from '../utils/types';
import { verifyJWT } from '../utils/auth';
import MenuToggle from '../components/MenuToggle';

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

  return <MenuToggle>{children}</MenuToggle>;

  // original
  // return (
  //   <div className="flex-1 flex ">
  //     <SidebarMenu />
  //     <main className="flex-1">
  //       <main>{children}</main>
  //     </main>
  //   </div>
  // );
}
