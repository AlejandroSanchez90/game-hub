'use client';
import { useMemo } from 'react';
import { Info } from 'lucide-react';
import { Hint } from '../hint';
type Props = {
  isDelayed: boolean;
  isFollowerOnly: boolean;
};

export function ChatInfo({ isDelayed, isFollowerOnly }: Props) {
  const hint = useMemo(() => {
    if (isFollowerOnly && !isDelayed) {
      return 'Only followers can chat';
    }

    if (isDelayed && !isFollowerOnly) {
      return 'Messages are delayed by 3 seconds';
    }

    if (isDelayed && isFollowerOnly) {
      return 'Only followers can chat and messages are delayed by 3 seconds';
    }

    return '';
  }, [isDelayed, isFollowerOnly]);

  const label = useMemo(() => {
    if (isFollowerOnly && !isDelayed) {
      return 'Followers only';
    }

    if (isDelayed && !isFollowerOnly) {
      return 'Slow mode';
    }

    if (isDelayed && isFollowerOnly) {
      return 'Followers only and slow mode';
    }

    return '';
  }, [isDelayed, isFollowerOnly]);

  if (!isDelayed && !isFollowerOnly) return null;

  return (
    <div className='p-2 text-muted-foreground bg-white/5 boder border-white/70 w-full rounded-t-md flex items-center gap-x-2'>
      <Hint label={hint}>
        <Info className='h-4 w-4' />
      </Hint>
      <p className='text-xs font-semibold'>{label}</p>
    </div>
  );
}
