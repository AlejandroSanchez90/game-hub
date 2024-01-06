import { getSelf } from '@/lib/auth-service';
import { getStreamByUserId } from '@/lib/stream-services';
import React from 'react';
import { ToggleCard } from './_components/toggle-card';

type Props = {};

async function ChatPage({}: Props) {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    throw new Error('Stream not found');
  }

  return (
    <div className='p-6'>
      <div className=' mb-4'>
        <h1 className='text-2xl font-bold truncate '>Chat settings</h1>
      </div>
      <div className='space-y-4'>
        <ToggleCard field='isChatEnabled' label='Chat' value={stream.isChatEnabled} />
        <ToggleCard field='isChatDelayed' label='Delay Chat' value={stream.isChatDelayed} />
        <ToggleCard
          field='isChatFollowersOnly'
          label='Followers Only'
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
}

export default ChatPage;
