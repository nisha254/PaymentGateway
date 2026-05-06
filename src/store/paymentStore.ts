import { create } from 'zustand';
import { PaymentStatus, Transaction, PaymentFormState } from '@/types/payment';
import { getItem, setItem } from '@/utils/storage';
import { STORAGE_KEY_HISTORY } from '@/utils/constants';

interface PaymentState {
  status: PaymentStatus;
  transactions: Transaction[];
  currentTransactionId: string | null;
  attempts: number;
  failureReason: string | null;
  lastFormState: PaymentFormState | null;
  
  setStatus: (status: PaymentStatus) => void;
  startTransaction: (id: string, formState: PaymentFormState) => void;
  incrementAttempt: () => void;
  setFailureReason: (reason: string | null) => void;
  addTransaction: (tx: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  resetPayment: () => void;
  loadHistory: () => void;
}

export const usePaymentStore = create<PaymentState>((set, get) => ({
  status: 'idle',
  transactions: [],
  currentTransactionId: null,
  attempts: 0,
  failureReason: null,
  lastFormState: null,

  setStatus: (status) => set({ status }),
  startTransaction: (id, formState) => set({ 
    currentTransactionId: id, 
    attempts: 1, 
    status: 'processing', 
    failureReason: null,
    lastFormState: formState
  }),
  incrementAttempt: () => set((state) => ({ attempts: state.attempts + 1 })),
  setFailureReason: (reason) => set({ failureReason: reason }),
  
  addTransaction: (tx) => {
    const newHistory = [tx, ...get().transactions];
    set({ transactions: newHistory });
    setItem(STORAGE_KEY_HISTORY, newHistory);
  },
  
  updateTransaction: (id, updates) => {
    const updatedHistory = get().transactions.map((tx) => 
      tx.id === id ? { ...tx, ...updates } : tx
    );
    set({ transactions: updatedHistory });
    setItem(STORAGE_KEY_HISTORY, updatedHistory);
  },
  
  resetPayment: () => set({ 
    status: 'idle', 
    currentTransactionId: null, 
    attempts: 0, 
    failureReason: null,
    lastFormState: null
  }),
  
  loadHistory: () => {
    const history = getItem<Transaction[]>(STORAGE_KEY_HISTORY, []);
    set({ transactions: history });
  }
}));
