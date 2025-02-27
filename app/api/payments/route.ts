// app/api/payments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PaymentWebhookPayload } from '@/types/hesabpay';
import { paymentStore } from '@/lib/paymentStore';

// Define allowed origins
const allowedOrigins = [
  'https://smartbazar.af', // Your production frontend domain
  'http://localhost:3002', // Optional: for local development (remove in prod if not needed)
];

export async function GET(req: NextRequest) {
  try {
    const origin = req.headers.get('origin');
    const response = NextResponse.json(paymentStore as PaymentWebhookPayload[]);

    // Check if the request origin is allowed
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    } else {
      return NextResponse.json(
        { error: 'Origin not allowed' },
        { status: 403 }
      );
    }

    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');

  if (origin && allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } else {
    return NextResponse.json(
      { error: 'Origin not allowed' },
      { status: 403 }
    );
  }
}