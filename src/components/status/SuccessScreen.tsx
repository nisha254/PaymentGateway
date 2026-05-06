import React, { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import { usePaymentStore } from '@/store/paymentStore';

export const SuccessScreen: React.FC = () => {
  const { resetPayment, currentTransactionId } = usePaymentStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <div 
      ref={containerRef}
      tabIndex={-1}
      className="flex flex-col items-center justify-center py-12 outline-none"
      role="alert"
      aria-live="polite"
    >
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
      <p className="text-gray-600 mb-6 text-center">
        Thank you for your purchase. Your transaction was completed successfully.
      </p>
      
      {currentTransactionId && (
        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-sm text-gray-500 border border-gray-100 text-center w-full max-w-sm">
          <span className="block font-medium mb-1">Transaction ID</span>
          <span className="font-mono">{currentTransactionId}</span>
        </div>
      )}

      <button
        onClick={resetPayment}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Make Another Payment
      </button>
    </div>
  );
};
