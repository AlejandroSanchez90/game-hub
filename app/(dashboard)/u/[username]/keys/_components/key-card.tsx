'use client';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { CopyButton } from './copy-button';
import { Button } from '@/components/ui/button';

type Props = {
  value: string | null;
};

export function KeyCard({ value }: Props) {
  const [show, setShow] = useState(false);
  return (
    <div className='rounded-xl bg-muted p-6'>
      <div className='flex items-start gap-x-10'>
        <p className='font-semibold shrink-0'>Stream Key</p>
        <div className='space-y-2 w-full'>
          <div className='w-full flex items-center gap-x-2'>
            <Input
              value={value || ''}
              type={show ? 'text' : 'password'}
              disabled
              placeholder='Stream Key'
            />
            <CopyButton value={value || ''} />
          </div>
          {value && (
            <Button onClick={() => setShow(!show)} size={'sm'} variant={'link'}>
              {show ? 'Hide' : 'Show'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
