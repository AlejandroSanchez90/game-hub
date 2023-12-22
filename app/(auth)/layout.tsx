import React from 'react';
import { Logo } from './_components/logo';

type Props = {
  children: React.ReactNode;
};

function AuthLayout({ children }: Props) {
  return (
    <div className='flex flex-col h-full items-center justify-center space-y-6'>
      <Logo />
      {children}
    </div>
  );
}

export default AuthLayout;
