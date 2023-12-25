'use client';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import React, { useState } from 'react';
import { ToggleSkeleton } from './toggle';
import { RecommendedSkeleton } from './recommended';
import { useIsClient } from 'usehooks-ts';
import { FollowingSkeleton } from './following';

type Props = {
  children: React.ReactNode;
};

function Wrapper({ children }: Props) {
  const isClient = useIsClient();
  const { collapsed } = useSidebar();

  if (!isClient)
    return (
      <aside
        className={cn(
          'fixed left-0 flex   flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50 transition-all',
        )}
      >
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );

  return (
    <aside
      className={cn(
        'fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50 transition-all',
        collapsed && 'w-[70px] ',
      )}
    >
      {children}
    </aside>
  );
}

export default Wrapper;
