import React, { ChangeEvent } from 'react';
import { cn } from '@/lib/helpers';
import { formatAmount } from '@/utils/formatting';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  symbol: string;
}

export const AmountInput: React.FC<AmountInputProps> = ({ 
  value, onChange, onBlur, error, touched, disabled, symbol 
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAmount(e.target.value);
    onChange(formatted);
  };

  const id = "amount-input";
  const errorId = `${id}-error`;
  const isInvalid = touched && !!error;

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">Amount</label>
      <div className="relative">
        <input
          id={id}
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder="0.00"
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? errorId : undefined}
          className={cn(
            "w-full pl-8 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
            isInvalid ? "border-red-500 focus:ring-red-500" : "border-gray-300",
            disabled && "bg-gray-100 text-gray-500 cursor-not-allowed"
          )}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium select-none pointer-events-none">
          {symbol}
        </div>
      </div>
      {isInvalid && (
        <span id={errorId} className="text-xs text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
};
