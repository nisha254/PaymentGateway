import React, { ChangeEvent } from 'react';
import { cn } from '@/lib/helpers';
import { formatExpiryDate } from '@/utils/formatting';

interface ExpiryInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}

export const ExpiryInput: React.FC<ExpiryInputProps> = ({ 
  value, onChange, onBlur, error, touched, disabled 
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    onChange(formatted);
  };

  const id = "expiry-input";
  const errorId = `${id}-error`;
  const isInvalid = touched && !!error;

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">Expiry Date</label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder="MM/YY"
        maxLength={5}
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
