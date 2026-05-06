import React from 'react';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/helpers';

interface PaymentButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
  amount: string;
  symbol: string;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({ 
  onClick, disabled, isLoading, amount, symbol 
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-semibold transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2",
        disabled || isLoading 
          ? "bg-gray-400 cursor-not-allowed" 
          : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
      )}
    >
      {isLoading ? (
        <span className="animate-pulse">Processing...</span>
      ) : (
        <>
          <Lock size={18} />
          Pay {symbol}{amount || '0.00'}
        </>
      )}
    </button>
  );
};
