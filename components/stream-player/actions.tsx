'use client';
import React, { useTransition } from 'react';
import { Button } from '../ui/button';
import { useAuth } from '@clerk/nextjs';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { onFollow, onUnfollow } from '@/actions/follow';
import { toast } from 'sonner';
import { Skeleton } from '../ui/skeleton';

type Props = {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
};

export function Actions({ hostIdentity, isFollowing, isHost }: Props) {
  const { userId } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) => toast.success(`You are now following ${data.following.username}`))
        .catch(() => toast.error('Failed to follow user'));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
        .catch(() => toast.error('Failed to unfollow user'));
    });
  };

  const toggleFollow = () => {
    if (!userId) {
      return router.push('/sign-in');
    }

    if (isHost) {
      return;
    }

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant={'primary'}
      size={'sm'}
      className='w-full lg:w-auto'
    >
      <Heart className={cn('h-4 w-4 mr-2', isFollowing ? 'fill-white' : 'fill-none')} />
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
}

export const ActionsSkeleton = () => {
  return <Skeleton className='h-10 w-full lg:w-24' />;
};
