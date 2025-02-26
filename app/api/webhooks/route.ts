// app/api/webhooks/payments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PaymentWebhookPayload, SignatureVerificationResponse } from '@/types/hesabpay';
import { paymentStore } from '@/lib/paymentStore';
// In-memory store (replace with database in production)

async function verifySignature(signature: string, timestamp: string): Promise<boolean> {
  const url = 'https://api-sandbox.hesab.com/api/v1/hesab/webhooks/verify-signature';
  const apiKey = 'ZTUyNTg4MTYtNDU2MS00MmIzLTg0NzQtYzlmNGM4ODA0N2MzX181MjcwYjc1YjA4MzkwZjFiMmJlYg==';

  const headers = {
    'Authorization': `HesabPay ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const body = { signature, timestamp };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Signature verification failed with status: ${response.status}`);
    }

    const data = await response.json() as SignatureVerificationResponse;
    return data.success === true;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}
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

    const isValidSignature = isDev ? true : await verifySignature(signature, timestamp);
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
