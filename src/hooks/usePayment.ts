import { usePaymentStore } from '@/store/paymentStore';
import { PaymentPayload, PaymentFormState, Transaction } from '@/types/payment';
import { submitPayment } from '@/utils/paymentApi';

export const usePayment = () => {
  const { 
    currentTransactionId, 
    attempts, 
    startTransaction, 
    incrementAttempt, 
    setStatus, 
    setFailureReason,
    addTransaction,
    updateTransaction
  } = usePaymentStore();

  const processPayment = async (formState: PaymentFormState, isRetry: boolean = false) => {
    const txId = isRetry && currentTransactionId ? currentTransactionId : crypto.randomUUID();
    
    const nextAttempt = isRetry ? attempts + 1 : 1;

    if (!isRetry) {
      startTransaction(txId, formState);
      const newTx: Transaction = {
        id: txId,
        amount: formState.amount,
        currency: formState.currency,
        status: 'processing',
        timestamp: Date.now(),
        attempts: nextAttempt,
        cardLast4: formState.cardNumber.replace(/\s/g, '').slice(-4),
      };
      addTransaction(newTx);
    } else {
      incrementAttempt();
      setStatus('processing');
      updateTransaction(txId, { attempts: nextAttempt, status: 'processing' });
    }

    const payload: PaymentPayload = {
      transactionId: txId,
      ...formState,
      attempt: nextAttempt,
    };

    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 6000);

    try {
      const response = await submitPayment(payload, abortController.signal);
      clearTimeout(timeoutId);

      setStatus(response.status);
      updateTransaction(txId, { 
        status: response.status, 
        failureReason: response.reason 
      });
      
      if (response.status === 'failed') {
        setFailureReason(response.reason || 'Payment failed');
      }

    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        setStatus('timeout');
        updateTransaction(txId, { status: 'timeout', failureReason: 'Request timed out' });
        setFailureReason('The request took too long. Please try again.');
      } else {
        setStatus('failed');
        updateTransaction(txId, { status: 'failed', failureReason: 'Network error' });
        setFailureReason('Network error occurred. Please check your connection.');
      }
    }
  };

  return { processPayment };
};
