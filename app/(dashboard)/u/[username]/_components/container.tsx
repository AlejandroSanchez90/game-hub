'use client';
import { cn } from '@/lib/utils';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import React, { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

type Props = {
  children: React.ReactNode;
};

export function Container({ children }: Props) {
  const { collapsed, onCollapse, onExpand } = useCreatorSidebar();
  const isMobile = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    if (isMobile) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [isMobile, onCollapse, onExpand]);

  return (
    <div className={cn('flex-1  transition-all', collapsed ? 'ml-[70px]' : 'ml-[70px] lg:ml-60')}>
      {children}
    </div>
  );
}
