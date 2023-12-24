'use client';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/store/use-sidebar';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import React, { useMemo } from 'react';
import { Hint } from '@/components/hint';
import { Skeleton } from '@/components/ui/skeleton';
type Props = {};

export function Toggle({}: Props) {
  const { collapsed, onCollapse, onExpand } = useSidebar();

  const label = useMemo(() => (collapsed ? 'Expand' : 'Collapse'), [collapsed]);

  return (
    <>
      {collapsed && (
        <div className='hidden lg:flex w-full items-center justify-center pt-4 mb-4'>
          <Hint label={label} asChild side='right'>
            <Button onClick={onExpand} variant={'ghost'} className='h-auto p-2'>
              <ArrowRightFromLine className='h-4 w-4' />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className='p-3 pl-6 mb-2 flex items-center w-full'>
          <p className='font-semibold text-primary whitespace-nowrap'>For you</p>
          <Hint label={label} asChild side='right'>
            <Button onClick={onCollapse} className='h-auto p-2 ml-auto' variant={'ghost'}>
              <ArrowLeftFromLine className='h-4 w-4' />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
}

export const ToggleSkeleton = () => {
  return (
    <div className='p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full'>
      <Skeleton className='h-7 w-[100px]' />
      <Skeleton className='h-7 w-8' />
    </div>
  );
};
