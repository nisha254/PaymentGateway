import React, { ChangeEvent } from 'react';
import { CurrencyType } from '@/types/payment';
import { CURRENCIES } from '@/utils/constants';

interface CurrencySelectorProps {
  value: CurrencyType;
  onChange: (value: CurrencyType) => void;
  disabled?: boolean;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({ value, onChange, disabled }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as CurrencyType);
  };

  const id = "currency-select";

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">Currency</label>
      <select
        id={id}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
      >
        {CURRENCIES.map(curr => (
          <option key={curr.value} value={curr.value}>{curr.label}</option>
        ))}
      </select>
    </div>
  );
};
