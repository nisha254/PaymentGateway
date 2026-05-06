import { NextRequest, NextResponse } from 'next/server';
import { PaymentPayload, ApiResponse } from '@/types/payment';

export async function POST(req: NextRequest) {
  try {
    const body: PaymentPayload = await req.json();
    
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const rand = Math.random();

    if (rand < 0.15) {
      await new Promise((resolve) => setTimeout(resolve, 8000));
      return NextResponse.json<ApiResponse>({
        status: 'timeout',
        transactionId: body.transactionId,
        timestamp: Date.now()
      }, { status: 408 });
    }

    if (rand < 0.40) {
      const reasons = ['Insufficient funds', 'Card declined by issuer', 'Suspected fraud', 'Bank unavailable'];
      const reason = reasons[Math.floor(Math.random() * reasons.length)];
      return NextResponse.json<ApiResponse>({
        status: 'failed',
        transactionId: body.transactionId,
        timestamp: Date.now(),
        reason
      });
    }

    return NextResponse.json<ApiResponse>({
      status: 'success',
      transactionId: body.transactionId,
      timestamp: Date.now()
    });

  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
