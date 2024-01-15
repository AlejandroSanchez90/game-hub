'use client';
import React from 'react';
import { MessageSquareText, ArrowRightFromLine } from 'lucide-react';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { useChatSidebar } from '@/store/use-chat-sidebar';
type Props = {};

export function ChatToggle({}: Props) {
  const { collapsed, onExpand, onCollapse } = useChatSidebar();

  const Icon = collapsed ? MessageSquareText : ArrowRightFromLine;

  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };

  const label = collapsed ? 'Show chat' : 'Hide chat';
  return (
    <Hint label={label} side='left' asChild>
      <Button
        onClick={onToggle}
        variant={'ghost'}
        className='h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent'
      >
        <Icon className='h-4 w-4' />
      </Button>
    </Hint>
  );
}
