import ProfileForm from '@/app/components/Forms/ProfileForm';
import { verifyJWT } from '@/app/utils/auth';
import { PayloadSignJWT } from '@/app/utils/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Profile() {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = await verifyJWT<PayloadSignJWT>(token);
  console.table(user);

  if (!user) {
    redirect('/login');
  }

  return (
    <div>
      <header>
        <h2 className="text-3xl">Welcome, {user.email}</h2>
      </header>
      <ProfileForm />
    </div>
  );
}
