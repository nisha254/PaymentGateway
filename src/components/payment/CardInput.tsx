import React, { ChangeEvent } from 'react';
import { cn } from '@/lib/helpers';
import { formatCardNumber } from '@/utils/formatting';
import { CardType } from '@/types/payment';
import { getCardLogo } from '@/utils/card';

interface CardInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  cardType: CardType;
  disabled?: boolean;
}

export const CardInput: React.FC<CardInputProps> = ({ 
  value, onChange, onBlur, error, touched, cardType, disabled 
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    onChange(formatted);
  };

  const id = "card-number-input";
  const errorId = `${id}-error`;
  const isInvalid = touched && !!error;

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">Card Number</label>
      <div className="relative">
        <input
          id={id}
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder="0000 0000 0000 0000"
          maxLength={19}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? errorId : undefined}
          className={cn(
            "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
            isInvalid ? "border-red-500 focus:ring-red-500" : "border-gray-300",
            disabled && "bg-gray-100 text-gray-500 cursor-not-allowed"
          )}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400 select-none">
          {getCardLogo(cardType)}
        </div>
      </div>
      {isInvalid && (
        <span id={errorId} className="text-xs text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
};
