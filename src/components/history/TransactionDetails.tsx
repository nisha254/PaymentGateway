import React from 'react';
import { Transaction } from '@/types/payment';
import { X } from 'lucide-react';
import { cn } from '@/lib/helpers';
import { CURRENCIES } from '@/utils/constants';

interface TransactionDetailsProps {
  transaction: Transaction;
  onClose: () => void;
}

export const TransactionDetails: React.FC<TransactionDetailsProps> = ({ transaction, onClose }) => {
  const symbol = CURRENCIES.find(c => c.value === transaction.currency)?.symbol || '';
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 id="modal-title" className="font-semibold text-gray-800">Transaction Details</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-end border-b pb-4">
            <span className="text-sm text-gray-500">Amount</span>
            <span className="text-3xl font-bold text-gray-800">{symbol}{transaction.amount}</span>
          </div>
          
          <DetailRow label="Transaction ID" value={transaction.id} monospace />
          <DetailRow label="Date & Time" value={new Date(transaction.timestamp).toLocaleString()} />
          <DetailRow label="Status" value={transaction.status} className="capitalize" />
          <DetailRow label="Card Used" value={`•••• •••• •••• ${transaction.cardLast4}`} monospace />
          <DetailRow label="Attempts" value={transaction.attempts.toString()} />
          
          {transaction.failureReason && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
              <span className="font-semibold block mb-1">Failure Reason:</span>
              {transaction.failureReason}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, monospace, className }: { label: string, value: string, monospace?: boolean, className?: string }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className={cn("text-gray-800 font-medium", monospace && "font-mono text-xs mt-1", className)}>
      {value}
    </span>
  </div>
);
