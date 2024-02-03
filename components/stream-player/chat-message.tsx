'use client';

import { stringToColor } from '@/lib/utils';
import { ReceivedChatMessage } from '@livekit/components-react';
import { format } from 'date-fns';
import { Skeleton } from '../ui/skeleton';
type Props = {
  data: ReceivedChatMessage;
};

export function ChatMessage({ data }: Props) {
  const color = stringToColor(data.from?.name || '');
  return (
    <div className='flex gap-2 p-2 rounded-md hover:bg-white/5'>
      <p className='text-sm text-white/40'>{format(data.timestamp, 'HH:MM')}</p>
      <div className='flex flex-wrap items-baseline gap-1 grow'>
        <p className='text-sm font-semibold whitespace-nowrap'>
          <span style={{ color }} className='truncate font-bold'>
            {data.from?.name}
          </span>
          :
        </p>
        <p className='text-sm break-all'>{data.message}</p>
      </div>
    </div>
  );
}

export const ChatSkeleton = () => {
  return (
    <div className='flex h-full items-center justify-center'>
      <Skeleton className='w-1/2 h-6' />
    </div>
  );
};
