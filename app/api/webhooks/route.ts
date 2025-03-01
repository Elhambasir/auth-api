// app/api/webhooks/payments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PaymentWebhookPayload } from '@/types/hesabpay';
import { paymentStore } from '@/lib/paymentStore';
import { verifySignature } from '@/lib/verifySignature';
// In-memory store (replace with database in production)

// app/api/webhooks/payments/route.ts
export async function POST(req: NextRequest) {
  const isDev = process.env.NODE_ENV === 'development';
  const origin = req.headers.get('origin') || req.headers.get('referer');

  if (!isDev && !origin?.includes('https://api-sandbox.hesab.com')) {
    return NextResponse.json(
      { status: 'error', message: 'Invalid request origin' },
      { status: 403 }
    );
  }

  try {
    const payload = (await req.json()) as PaymentWebhookPayload;
    const { signature, timestamp } = payload;

    const isValidSignature = await verifySignature(signature, timestamp);
    if (!isValidSignature) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid signature' },
        { status: 401 }
      );
    }

    paymentStore.push(payload);
    console.log('Payment stored:', payload);

    return NextResponse.json({
      status: 'success',
      message: 'Webhook received and processed',
    });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
// export async function POST(req: NextRequest) {
//   const origin = req.headers.get('origin') || req.headers.get('referer');
//   if (!origin?.includes('https://api-sandbox.hesab.com')) {
//     return NextResponse.json(
//       { status: 'error', message: 'Invalid request origin' },
//       { status: 403 }
//     );
//   }

//   try {
//     const payload = (await req.json()) as PaymentWebhookPayload;
//     const { signature, timestamp } = payload;

//     const isValidSignature = await verifySignature(signature, timestamp);
//     if (!isValidSignature) {
//       return NextResponse.json(
//         { status: 'error', message: 'Invalid signature' },
//         { status: 401 }
//       );
//     }

//     paymentStore.push(payload);
//     console.log('Payment stored:', payload);

//     return NextResponse.json({
//       status: 'success',
//       message: 'Webhook received and processed',
//     });
//   } catch (error) {
//     console.error('Webhook processing error:', error);
//     return NextResponse.json(
//       { status: 'error', message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
