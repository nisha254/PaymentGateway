import { useState, useCallback } from 'react';
import { ValidationErrors, PaymentFormState, CardType } from '@/types/payment';
import { 
  validateCardholderName, 
  validateCardNumber, 
  validateExpiryDate, 
  validateCVV, 
  validateAmount 
} from '@/utils/validation';
import { detectCardType } from '@/utils/card';

export const useCardValidation = (formState: PaymentFormState) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<keyof PaymentFormState, boolean>>({
    cardholderName: false,
    cardNumber: false,
    expiryDate: false,
    cvv: false,
    amount: false,
    currency: false,
  });

  const cardType = detectCardType(formState.cardNumber);

  const validateField = useCallback((field: keyof PaymentFormState, value: string) => {
    let error = '';
    switch (field) {
      case 'cardholderName':
        error = validateCardholderName(value);
        break;
      case 'cardNumber':
        error = validateCardNumber(value);
        break;
      case 'expiryDate':
        error = validateExpiryDate(value);
        break;
      case 'cvv':
        error = validateCVV(value, cardType);
        break;
      case 'amount':
        error = validateAmount(value);
        break;
    }
    return error;
  }, [cardType]);

  const handleBlur = (field: keyof PaymentFormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formState[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateAll = (): boolean => {
    const newErrors: ValidationErrors = {
      cardholderName: validateField('cardholderName', formState.cardholderName),
      cardNumber: validateField('cardNumber', formState.cardNumber),
      expiryDate: validateField('expiryDate', formState.expiryDate),
      cvv: validateField('cvv', formState.cvv),
      amount: validateField('amount', formState.amount),
    };
    setErrors(newErrors);
    
    setTouched({
      cardholderName: true,
      cardNumber: true,
      expiryDate: true,
      cvv: true,
      amount: true,
      currency: true,
    });

    return !Object.values(newErrors).some(Boolean);
  };

  const isFormValid = !Object.values({
    cardholderName: validateField('cardholderName', formState.cardholderName),
    cardNumber: validateField('cardNumber', formState.cardNumber),
    expiryDate: validateField('expiryDate', formState.expiryDate),
    cvv: validateField('cvv', formState.cvv),
    amount: validateField('amount', formState.amount),
  }).some(Boolean);

  return { errors, touched, handleBlur, validateAll, isFormValid, cardType };
};
