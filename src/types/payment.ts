export type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed' | 'timeout';
export type CurrencyType = 'INR' | 'USD';
export type CardType = 'visa' | 'mastercard' | 'amex' | 'unknown';

export interface PaymentPayload {
  transactionId: string;
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  amount: string;
  currency: CurrencyType;
  attempt: number;
}

export interface Transaction {
  id: string;
  amount: string;
  currency: CurrencyType;
  status: PaymentStatus;
  timestamp: number;
  attempts: number;
  failureReason?: string;
  cardLast4: string;
}

export interface ApiResponse {
  status: 'success' | 'failed' | 'timeout';
  transactionId: string;
  timestamp: number;
  reason?: string;
}

export interface ValidationErrors {
  cardholderName?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  amount?: string;
}

export interface PaymentFormState {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  amount: string;
  currency: CurrencyType;
}
