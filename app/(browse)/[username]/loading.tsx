import { StreamPlayerSkeleton } from '@/components/stream-player';
import React from 'react';

function loading() {
  return (
    <div className='h-full'>
      <StreamPlayerSkeleton />;
    </div>
  );
}

export default loading;
