import { PaymentPayload, ApiResponse } from '@/types/payment';
import { API_ENDPOINT } from './constants';

export const submitPayment = async (payload: PaymentPayload, signal: AbortSignal): Promise<ApiResponse> => {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal,
  });

  const data = await response.json();

  if (!response.ok && !data.status) {
    throw new Error(data.reason || 'Network response was not ok');
  }

  return data;
};
