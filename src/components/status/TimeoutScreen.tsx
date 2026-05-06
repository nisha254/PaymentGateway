import React, { useEffect, useRef } from 'react';
import { Clock, RefreshCw } from 'lucide-react';
import { usePaymentStore } from '@/store/paymentStore';
import { MAX_RETRIES } from '@/utils/constants';
import { usePayment } from '@/hooks/usePayment';

export const TimeoutScreen: React.FC = () => {
  const { attempts, resetPayment, transactions, currentTransactionId, lastFormState } = usePaymentStore();
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
      <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
        <Clock className="w-10 h-10 text-orange-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Timed Out</h2>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        The payment gateway took too long to respond. This might be due to a poor network connection.
      </p>

      {canRetry ? (
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <button
            onClick={handleRetry}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <RefreshCw size={18} />
            Retry Connection
          </button>
          <span className="text-sm text-gray-500">
            Attempt {attempts} of {MAX_RETRIES}
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <div className="bg-orange-50 text-orange-800 text-sm p-3 rounded-md w-full text-center border border-orange-200">
            Maximum retry attempts reached.
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
