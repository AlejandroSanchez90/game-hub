'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React, { useState, useTransition, useRef, ElementRef } from 'react';
import { updateStream } from '@/actions/stream';
import { toast } from 'sonner';
import { UploadDropzone } from '@/lib/uploadThings';
import { useRouter } from 'next/navigation';
import { Hint } from '../hint';
import { Trash } from 'lucide-react';
import Image from 'next/image';
type Props = {
  initialName: string;
  initialThumbnailUrl: string | null;
};

function InfoModal({ initialName, initialThumbnailUrl }: Props) {
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const closeRef = useRef<ElementRef<'button'>>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onRemoveThumbnail = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success('Thumbnail removed');
          setThumbnailUrl('');
          closeRef?.current?.click();
        })
        .catch(() => {
          toast.error('Failed to remove thumbnail');
        });
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({ name })
        .then(() => {
          toast.success('Stream updated');
          closeRef?.current?.click();
        })
        .catch(() => {
          toast.error('Failed to update stream');
        });
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
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className='space-y-14'>
          <div className='space-y-2'>
            <Label>Name</Label>
            <Input
              placeholder='Stream name'
              onChange={onChange}
              disabled={isPending}
              value={name}
            />
          </div>
          <div className='space-y-2'>
            <label>Thumbnail</label>
            {thumbnailUrl ? (
              <div className='relative aspect-video rounded-xl overflow-hidden border border-white/10'>
                <div className='absolute top-2 right-2 z-10'>
                  <Hint label='Remove thumbnail' asChild side='left'>
                    <Button
                      type='button'
                      disabled={isPending}
                      onClick={onRemoveThumbnail}
                      className='h-auto w-auto p-1.5'
                    >
                      <Trash className='h-4 w-4' />
                    </Button>
                  </Hint>
                </div>
                <Image src={thumbnailUrl} fill alt='thumbnail' className='object-cover' />
              </div>
            ) : (
              <div className='rounded-xl border outline-dashed outline-muted'>
                <UploadDropzone
                  endpoint='thumbnailUploader'
                  appearance={{
                    label: {
                      color: '#ffffff',
                    },
                    allowedContent: {
                      color: '#ffffff',
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnailUrl(res?.[0]?.url);
                    toast.success('Thumbnail uploaded');
                    closeRef?.current?.click();
                    router.refresh();
                  }}
                />
              </div>
            )}
          </div>
          <div className='flex justify-between'>
            <DialogClose asChild ref={closeRef}>
              <Button type='button' variant={'ghost'}>
                Cancel
              </Button>
            </DialogClose>
            <Button variant={'primary'} type='submit' disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default InfoModal;
