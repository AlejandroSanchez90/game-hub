import { getSelfByUsername } from '@/lib/auth-service';
import { redirect } from 'next/navigation';
import React from 'react';
import Navbar from './_components/navbar';
import { Sidebar } from './_components/sidebar';
import { Container } from './_components/container';

type Props = {
  params: { username: string };
  children: React.ReactNode;
};

async function CreatorLayout({ params: { username }, children }: Props) {
  const self = await getSelfByUsername(username);

  if (!self) {
    redirect('/');
  }

  return (
    <>
      <Navbar />
      <div className='flex h-full pt-20'>
        <Sidebar />
        <Container>{children}</Container>
      </div>
      ;
    </>
  );
}

export default CreatorLayout;
