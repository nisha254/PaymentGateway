import React from 'react';
import { Transaction } from '@/types/payment';
import { CURRENCIES } from '@/utils/constants';
import { cn } from '@/lib/helpers';
import { CreditCard, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface TransactionCardProps {
  transaction: Transaction;
  onClick: () => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, onClick }) => {
  const currencySymbol = CURRENCIES.find(c => c.value === transaction.currency)?.symbol || '';
  const date = new Date(transaction.timestamp).toLocaleString();

  const getStatusIcon = () => {
    switch (transaction.status) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'timeout': return <Clock className="w-5 h-5 text-orange-500" />;
      case 'processing': return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
      default: return null;
    }
  };

  const getStatusBadge = () => {
    const base = "text-xs px-2 py-1 rounded-full font-medium capitalize";
    switch (transaction.status) {
      case 'success': return cn(base, "bg-green-100 text-green-700");
      case 'failed': return cn(base, "bg-red-100 text-red-700");
      case 'timeout': return cn(base, "bg-orange-100 text-orange-700");
      case 'processing': return cn(base, "bg-blue-100 text-blue-700");
      default: return cn(base, "bg-gray-100 text-gray-700");
    }
  };

  return (
    <button 
      onClick={onClick}
      className="w-full text-left bg-white border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all p-4 rounded-xl flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-blue-50 transition-colors">
          {getStatusIcon()}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">
            {currencySymbol}{transaction.amount}
          </span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1">
        <span className={getStatusBadge()}>{transaction.status}</span>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <CreditCard className="w-3 h-3" />
          <span>•••• {transaction.cardLast4}</span>
        </div>
      </div>
    </button>
  );
};
