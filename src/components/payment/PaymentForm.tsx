import React, { useState } from 'react';
import { PaymentFormState } from '@/types/payment';
import { useCardValidation } from '@/hooks/useCardValidation';
import { usePayment } from '@/hooks/usePayment';
import { usePaymentStore } from '@/store/paymentStore';
import { CardInput } from './CardInput';
import { ExpiryInput } from './ExpiryInput';
import { CVVInput } from './CVVInput';
import { AmountInput } from './AmountInput';
import { CurrencySelector } from './CurrencySelector';
import { CardPreview } from './CardPreview';
import { PaymentButton } from './PaymentButton';
import { CURRENCIES } from '@/utils/constants';

export const PaymentForm: React.FC = () => {
  const [formState, setFormState] = useState<PaymentFormState>({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: '',
    currency: 'INR'
  });

  const { errors, touched, handleBlur, validateAll, isFormValid, cardType } = useCardValidation(formState);
  const { processPayment } = usePayment();
  const { status } = usePaymentStore();

  const handleFieldChange = (field: keyof PaymentFormState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      await processPayment(formState);
    }
  };

  const selectedCurrency = CURRENCIES.find(c => c.value === formState.currency) || CURRENCIES[0];

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      <div className="flex-1 order-2 lg:order-1">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 flex flex-col gap-1 w-full">
              <label htmlFor="cardholder-name" className="text-sm font-medium text-gray-700">Cardholder Name</label>
              <input
                id="cardholder-name"
                type="text"
                value={formState.cardholderName}
                onChange={(e) => handleFieldChange('cardholderName', e.target.value)}
                onBlur={() => handleBlur('cardholderName')}
                placeholder="John Doe"
                aria-invalid={touched.cardholderName && !!errors.cardholderName}
                aria-describedby={touched.cardholderName && errors.cardholderName ? "cardholder-error" : undefined}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${touched.cardholderName && errors.cardholderName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {touched.cardholderName && errors.cardholderName && (
                <span id="cardholder-error" className="text-xs text-red-500 font-medium">{errors.cardholderName}</span>
              )}
            </div>

            <div className="md:col-span-2">
              <CardInput
                value={formState.cardNumber}
                onChange={(val) => handleFieldChange('cardNumber', val)}
                onBlur={() => handleBlur('cardNumber')}
                error={errors.cardNumber}
                touched={touched.cardNumber}
                cardType={cardType}
              />
            </div>

            <ExpiryInput
              value={formState.expiryDate}
              onChange={(val) => handleFieldChange('expiryDate', val)}
              onBlur={() => handleBlur('expiryDate')}
              error={errors.expiryDate}
              touched={touched.expiryDate}
            />

            <CVVInput
              value={formState.cvv}
              onChange={(val) => handleFieldChange('cvv', val)}
              onBlur={() => handleBlur('cvv')}
              error={errors.cvv}
              touched={touched.cvv}
              cardType={cardType}
            />

            <AmountInput
              value={formState.amount}
              onChange={(val) => handleFieldChange('amount', val)}
              onBlur={() => handleBlur('amount')}
              error={errors.amount}
              touched={touched.amount}
              symbol={selectedCurrency.symbol}
            />

            <CurrencySelector
              value={formState.currency}
              onChange={(val) => handleFieldChange('currency', val)}
            />
          </div>

          <PaymentButton
            onClick={() => {}}
            disabled={!isFormValid}
            isLoading={status === 'processing'}
            amount={formState.amount}
            symbol={selectedCurrency.symbol}
          />
        </form>
      </div>

      <div className="flex-1 order-1 lg:order-2 flex flex-col items-center justify-start pt-4 lg:pt-0">
        <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase w-full max-w-sm text-left">Live Preview</h3>
        <CardPreview formState={formState} cardType={cardType} />
      </div>
    </div>
  );
};
