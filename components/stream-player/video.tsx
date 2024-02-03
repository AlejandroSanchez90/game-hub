'use client';

import React from 'react';
import { ConnectionState, Track } from 'livekit-client';
import { useConnectionState, useRemoteParticipant, useTracks } from '@livekit/components-react';
import { Parisienne } from 'next/font/google';
import { OfflineHost } from './offline-host';
import { hostname } from 'os';
import { LoadingVideo } from './loading-video';
import { LiveHost } from './live-host';
import { Skeleton } from '../ui/skeleton';
type Props = {
  hostName: string;
  hostIdentity: string;
};

export function Video({ hostIdentity, hostName }: Props) {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([Track.Source.Camera, Track.Source.Microphone]).filter((track) => {
    return track.participant.identity === hostIdentity;
  });

  let content;
  console.log({ participant, connectionState, tracks, hostIdentity });

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineHost username={hostName} />;
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo label={connectionState} />;
  } else {
    content = <LiveHost participant={participant} />;
  }
  return <div className='aspect-video border-b group relative'>{content}</div>;
}

export const VideoSkeleton = () => {
  return (
    <div className='aspect-video border-x border-background'>
      <Skeleton className='h-full w-full rounded-none' />
    </div>
  );
};
