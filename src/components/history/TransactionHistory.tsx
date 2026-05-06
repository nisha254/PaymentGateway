import React, { useEffect, useState } from 'react';
import { usePaymentStore } from '@/store/paymentStore';
import { TransactionCard } from './TransactionCard';
import { TransactionDetails } from './TransactionDetails';
import { Transaction } from '@/types/payment';

export const TransactionHistory: React.FC = () => {
  const { transactions, loadHistory } = usePaymentStore();
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
        <p>No past transactions found.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h3>
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 pb-2">
        {transactions.map(tx => (
          <TransactionCard 
            key={tx.id} 
            transaction={tx} 
            onClick={() => setSelectedTx(tx)}
          />
        ))}
      </div>

      {selectedTx && (
        <TransactionDetails 
          transaction={selectedTx} 
          onClose={() => setSelectedTx(null)} 
        />
      )}
    </div>
  );
};
