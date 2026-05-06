import React, { ChangeEvent } from 'react';
import { cn } from '@/lib/helpers';
import { CardType } from '@/types/payment';

interface CVVInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  cardType: CardType;
  disabled?: boolean;
}

export const CVVInput: React.FC<CVVInputProps> = ({ 
  value, onChange, onBlur, error, touched, cardType, disabled 
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    const maxLength = cardType === 'amex' ? 4 : 3;
    if (val.length <= maxLength) {
      onChange(val);
    }
  };

  const id = "cvv-input";
  const errorId = `${id}-error`;
  const isInvalid = touched && !!error;
  const maxLength = cardType === 'amex' ? 4 : 3;

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">CVV</label>
      <input
        id={id}
        type="password"
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={cardType === 'amex' ? "1234" : "123"}
        maxLength={maxLength}
        aria-invalid={isInvalid}
        aria-describedby={isInvalid ? errorId : undefined}
        className={cn(
          "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
          isInvalid ? "border-red-500 focus:ring-red-500" : "border-gray-300",
          disabled && "bg-gray-100 text-gray-500 cursor-not-allowed"
        )}
      />
      {isInvalid && (
        <span id={errorId} className="text-xs text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
};
