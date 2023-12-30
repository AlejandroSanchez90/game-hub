'use client';

import { Button } from '@/components/ui/button';
import { onFollow, onUnfollow } from '@/actions/follow';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { onBlock, onUnblock } from '@/actions/block';
type Props = {
  isFollowing: boolean;
  userId: string;
};

function Actions({ isFollowing, userId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => toast.success(`You are now following ${data.following.username}`))
        .catch(() => toast.error('Something went wrong'));
    });
  };
  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
        .catch(() => toast.error('Something went wrong'));
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) => toast.success(`You have blocked ${data.blocked.username}`))
        .catch(() => toast.error('Something went wrong'));
    });
  };
  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) => toast.success(`You have unblocked ${data.blocked.username}`))
        .catch(() => toast.error('Something went wrong'));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };
  return (
    <>
      <Button
        disabled={isPending}
        onClick={onClick}
        variant={isFollowing ? 'destructive' : 'primary'}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
      <Button onClick={handleUnblock} disabled={isPending}>
        Block
      </Button>
    </>
  );
}

export default Actions;
