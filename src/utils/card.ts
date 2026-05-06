import { CardType } from '@/types/payment';

export const detectCardType = (cardNumber: string): CardType => {
  const stripped = cardNumber.replace(/\s/g, '');
  
  if (/^4/.test(stripped)) {
    return 'visa';
  }
  if (/^5[1-5]/.test(stripped)) {
    return 'mastercard';
  }
  if (/^3[47]/.test(stripped)) {
    return 'amex';
  }
  return 'unknown';
};

export const getCardLogo = (type: CardType): string => {
  switch (type) {
    case 'visa':
      return 'VISA';
    case 'mastercard':
      return 'MC';
    case 'amex':
      return 'AMEX';
    default:
      return 'CARD';
  }
};
