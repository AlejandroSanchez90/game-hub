import { getUserByUsername } from '@/lib/user-service';
import { useSearchParams } from 'next/navigation';
import React from 'react';

type Props = {
  params: {
    username: string;
  };
};

async function CreatorPage({ params: { username } }: Props) {
  const user = await getUserByUsername(username);

  return <div>{user?.username}</div>;
}

export default CreatorPage;
