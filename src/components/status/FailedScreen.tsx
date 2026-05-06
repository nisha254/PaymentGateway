import React, { useEffect, useRef } from 'react';
import { XCircle, RefreshCw } from 'lucide-react';
import { usePaymentStore } from '@/store/paymentStore';
import { MAX_RETRIES } from '@/utils/constants';
import { usePayment } from '@/hooks/usePayment';

export const FailedScreen: React.FC = () => {
  const { failureReason, attempts, resetPayment, transactions, currentTransactionId, lastFormState } = usePaymentStore();
  const { processPayment } = usePayment();
  const containerRef = useRef<HTMLDivElement>(null);

  const canRetry = attempts < MAX_RETRIES;
  const currentTx = transactions.find(t => t.id === currentTransactionId);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const handleRetry = () => {
    if (!lastFormState) return;
    processPayment(lastFormState, true);
  };

  return (
    <div 
      ref={containerRef}
      tabIndex={-1}
      className="flex flex-col items-center justify-center py-12 outline-none"
      role="alert"
      aria-live="assertive"
    >
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <XCircle className="w-10 h-10 text-red-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h2>
      <p className="text-gray-600 text-center mb-6">
        {failureReason || "We couldn't process your payment. Please try again."}
      </p>

      {canRetry ? (
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <button
            onClick={handleRetry}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
          <span className="text-sm text-gray-500">
            Attempt {attempts} of {MAX_RETRIES}
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <div className="bg-red-50 text-red-700 text-sm p-3 rounded-md w-full text-center border border-red-100">
            Maximum retry attempts reached. Please use a different payment method.
          </div>
          <button
            onClick={resetPayment}
            className="w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            Start New Payment
          </button>
        </div>
      )}
    </div>
  );
};
