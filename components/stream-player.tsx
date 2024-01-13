'use client';

import { useViewerToken } from '@/hooks/use-viewer-token';
import { User, Stream } from '@prisma/client';

type Props = {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
};

export function StreamPlayer({ user, stream, isFollowing }: Props) {
  const { name, token, identity } = useViewerToken(user.id);

  if (!token || !name || !identity) {
    return <div className=''>Cannot watch the stream</div>;
  }
  return <div>Allowed to watch the stream</div>;
}
