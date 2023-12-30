import { isFollowingUser } from '@/lib/follow-service';
import { getUserByUsername } from '@/lib/user-service';
import { notFound } from 'next/navigation';
import React from 'react';
import Actions from './_components/actions';
import { isBlockedByUser } from '@/lib/block-service';

type Props = {
  params: {
    username: string;
  };
};

async function UserPage({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);
  if (isBlocked) {
    notFound();
  }

  return (
    <div className='flex flex-col gap-y-4'>
      <p>Username: {user.username}</p>
      <p>User Id: {user.id}</p>
      <p>is following: {`${isFollowing ? 'Yes' : 'No'}`}</p>
      <p>You are blocked by this user: {`${isBlocked ? 'Yes' : 'No'}`}</p>
      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  );
}

export default UserPage;
