'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { PaymentForm } from '@/components/payment/PaymentForm';
import { StatusScreen } from '@/components/status/StatusScreen';
import { TransactionHistory } from '@/components/history/TransactionHistory';
import { usePaymentStore } from '@/store/paymentStore';

export default function Home() {
  const { status } = usePaymentStore();

  return (
    <main className="flex-1 flex flex-col items-center py-10 px-4 md:px-8">
      <div className="w-full max-w-6xl space-y-8">
        
        <header className="flex items-center gap-3 pb-6 border-b border-gray-200">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
            <p className="text-sm text-gray-500">Fast and encrypted payment processing</p>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[500px]">
            {status === 'idle' ? <PaymentForm /> : <StatusScreen />}
          </div>

          <div className="xl:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <TransactionHistory />
          </div>

        </div>

      </div>
    </main>
  );
}
