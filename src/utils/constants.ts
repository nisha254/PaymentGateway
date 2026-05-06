export const MAX_RETRIES = 3;
export const TIMEOUT_MS = 6000;
export const API_ENDPOINT = '/api/pay';
export const STORAGE_KEY_HISTORY = 'pg_transaction_history';

export const CURRENCIES = [
  { value: 'INR', label: '₹ INR', symbol: '₹' },
  { value: 'USD', label: '$ USD', symbol: '$' },
] as const;
