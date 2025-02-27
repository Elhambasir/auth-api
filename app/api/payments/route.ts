// app/api/payments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PaymentWebhookPayload } from '@/types/hesabpay'; // Ensure this import matches your types file
import { paymentStore } from '@/lib/paymentStore';

// Define the response type explicitly (optional, for clarity)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    const response = NextResponse.json(paymentStore as PaymentWebhookPayload[]); // Cast if needed
    
    // Add CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins for testing
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

// Handle CORS preflight requests
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow all origins for testing
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}