import { CardType } from '@/types/payment';

export const validateCardholderName = (name: string): string => {
  if (!name.trim()) return 'Cardholder name is required';
  if (name.length < 3) return 'Name must be at least 3 characters';
  if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces';
  return '';
};

export const validateCardNumber = (number: string): string => {
  const stripped = number.replace(/\s/g, '');
  if (!stripped) return 'Card number is required';
  if (!/^\d+$/.test(stripped)) return 'Card number must contain only digits';
  if (stripped.length < 15 || stripped.length > 16) return 'Invalid card number length';
  
  let sum = 0;
  let isEven = false;
  for (let i = stripped.length - 1; i >= 0; i--) {
    let digit = parseInt(stripped.charAt(i), 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  if (sum % 10 !== 0) return 'Invalid card number checksum';
  
  return '';
};

export const validateExpiryDate = (expiry: string): string => {
  if (!expiry) return 'Expiry date is required';
  if (!/^\d{2}\/\d{2}$/.test(expiry)) return 'Format must be MM/YY';

  const [monthStr, yearStr] = expiry.split('/');
  const month = parseInt(monthStr, 10);
  const year = parseInt(`20${yearStr}`, 10);

  if (month < 1 || month > 12) return 'Invalid month';

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return 'Card has expired';
  }

  return '';
};

export const validateCVV = (cvv: string, cardType: CardType): string => {
  if (!cvv) return 'CVV is required';
  if (!/^\d+$/.test(cvv)) return 'CVV must be numeric';
  
  const expectedLength = cardType === 'amex' ? 4 : 3;
  if (cvv.length !== expectedLength) {
    return `CVV must be ${expectedLength} digits for this card`;
  }
  return '';
};

export const validateAmount = (amount: string): string => {
  if (!amount) return 'Amount is required';
  const num = parseFloat(amount);
  if (isNaN(num)) return 'Amount must be a valid number';
  if (num <= 0) return 'Amount must be greater than zero';
  if (!/^\d+(\.\d{1,2})?$/.test(amount)) return 'Amount can have up to 2 decimal places';
  return '';
};
