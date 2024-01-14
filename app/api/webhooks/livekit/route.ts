import { WebhookReceiver } from 'livekit-server-sdk';
import { db } from '@/lib/db';
import { headers } from 'next/headers';

const receiver = new WebhookReceiver(process.env.LIVEKIT_API_KEY!, process.env.LIVEKIT_API_SECRET!);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headerPayload = headers();
    const authorization = headerPayload.get('authorization');

    if (!authorization) {
      return new Response('No authorization header', {
        status: 400,
      });
    }

    const event = receiver.receive(body, authorization);

    if (!event || !event.event) {
      return new Response('Invalid event data', { status: 400 });
    }

    if (event.event === 'ingress_started') {
      await db.stream.update({
        where: {
          ingressId: event.ingressInfo?.ingressId,
        },
        data: {
          isLive: true,
        },
      });
    }

    if (event.event === 'ingress_ended') {
      await db.stream.update({
        where: {
          ingressId: event.ingressInfo?.ingressId,
        },
        data: {
          isLive: false,
        },
      });
    }
    console.log('OKKK');

    return new Response(`${event.event}`, { status: 200 });
  } catch (error: any) {
    console.log('ERROR_LIVEKIT_WEBHOOK:', error.message);
    return new Response(`Internal server error`, { status: 500 });
  }
}
