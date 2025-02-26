// app/api/payments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { paymentStore } from '@/lib/paymentStore';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    return NextResponse.json(paymentStore);
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}