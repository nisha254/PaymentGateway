import React from 'react';
import { PaymentFormState, CardType } from '@/types/payment';
import { getCardLogo } from '@/utils/card';
import { cn } from '@/lib/helpers';

interface CardPreviewProps {
  formState: PaymentFormState;
  cardType: CardType;
}

export const CardPreview: React.FC<CardPreviewProps> = ({ formState, cardType }) => {
  const { cardNumber, cardholderName, expiryDate } = formState;

  const displayNum = cardNumber ? cardNumber : '•••• •••• •••• ••••';
  const displayName = cardholderName || 'YOUR NAME';
  const displayExpiry = expiryDate || 'MM/YY';

  const cardColors: Record<CardType | 'unknown', string> = {
    visa: 'from-blue-700 to-blue-900',
    mastercard: 'from-gray-800 to-gray-900',
    amex: 'from-blue-400 to-blue-600',
    unknown: 'from-slate-700 to-slate-800'
  };

  return (
    <div className={cn(
      "w-full max-w-sm aspect-[1.586/1] rounded-xl p-6 text-white shadow-xl flex flex-col justify-between bg-gradient-to-br transition-all duration-300",
      cardColors[cardType]
    )}>
      <div className="flex justify-between items-start">
        <div className="w-12 h-8 bg-white/20 rounded flex items-center justify-center">
          <div className="w-8 h-6 border border-white/40 rounded-sm flex flex-wrap">
            <div className="w-1/2 h-1/2 border-r border-b border-white/40"></div>
            <div className="w-1/2 h-1/2 border-b border-white/40"></div>
            <div className="w-1/2 h-1/2 border-r border-white/40"></div>
            <div className="w-1/2 h-1/2"></div>
          </div>
        </div>
        <div className="text-xl font-bold italic tracking-wider opacity-80 select-none">
          {getCardLogo(cardType)}
        </div>
      </div>
      
      <div>
        <div className="text-2xl font-mono tracking-widest mb-4 drop-shadow-md">
          {displayNum}
        </div>
        <div className="flex justify-between items-end text-sm uppercase">
          <div className="flex flex-col max-w-[70%]">
            <span className="text-[10px] opacity-70 mb-1">Cardholder Name</span>
            <span className="truncate font-medium tracking-wider">{displayName}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] opacity-70 mb-1">Valid Thru</span>
            <span className="font-medium tracking-wider">{displayExpiry}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
