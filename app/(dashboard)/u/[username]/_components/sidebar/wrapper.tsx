'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';

type Props = {
  children: React.ReactNode;
};

export function Wrapper({ children }: Props) {
  const { collapsed } = useCreatorSidebar();
  return (
    <aside
      className={cn(
        `fixed left-0 flex flex-col w-[70px] transition-all lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50`,
        collapsed && 'w-[70px] lg:w-[70px]',
      )}
    >
      {children}
    </aside>
  );
}
