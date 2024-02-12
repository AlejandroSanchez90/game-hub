'use client';
import React, { useState, useTransition, useRef, ElementRef } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { updateUser } from '@/actions/user';
import { toast } from 'sonner';
type Props = {
  initialValue: string | null;
};

function BioModal({ initialValue }: Props) {
  const closeRef = useRef<ElementRef<'button'>>(null);
  const [value, setValue] = useState(initialValue || '');
  const [isPending, startTransition] = useTransition();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          closeRef.current?.click();
          toast.success('User bio updated');
        })
        .catch(() => toast.error('Something went wrong'));
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'link'} size={'sm'} className='ml-auto'>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Edit user bio</DialogTitle>
        </DialogHeader>
        <form action='' onSubmit={onSubmit} className='space-y-4'>
          <Textarea
            placeholder='User bio'
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={isPending}
            className='resize-none'
          />
          <div className='flex justify-between'>
            <DialogClose asChild ref={closeRef}>
              <Button type='button' variant={'ghost'}>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type='submit' variant={'primary'}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default BioModal;
