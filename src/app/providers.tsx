'use client';
import store from '@/redux/store';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <Toaster richColors={true} />
    </Provider>
  );
}
