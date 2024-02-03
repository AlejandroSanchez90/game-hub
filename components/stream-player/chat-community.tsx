'use client';

import { useParticipants } from '@livekit/components-react';
import { useDebounce } from 'usehooks-ts';
import React, { useMemo, useState } from 'react';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { hostname } from 'os';
import { CommunityItem } from './community-item';
import { LocalParticipant, RemoteParticipant } from 'livekit-client';
type Props = {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
};

export function ChatCommunity({ hostName, viewerName, isHidden }: Props) {
  const [value, setValue] = useState('');
  const debounceValue = useDebounce<string>(value, 500);

  const participants = useParticipants();

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const filteredParticipants = useMemo(() => {
    const deduplicated = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;

      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }

      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduplicated.filter((participant) => {
      return participant.name?.toLocaleLowerCase().includes(debounceValue.toLocaleLowerCase());
    });
  }, [participants, debounceValue]);

  if (isHidden) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <p className='text-sm text-muted-foreground'>Community is disabled</p>
      </div>
    );
  }

  return (
    <div className='p-4'>
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder='Search community'
        className='border-white/10'
      />
      <ScrollArea className='gap-y-2 mt-4'>
        <p className='text-center text-sm text-muted-foreground hidden last:block p-2'>
          No results
        </p>
        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
