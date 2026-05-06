import React, { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

export const ProcessingScreen: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <div 
      ref={containerRef}
      tabIndex={-1}
      className="flex flex-col items-center justify-center py-16 outline-none"
      role="alert"
      aria-live="assertive"
    >
      <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Processing Payment</h2>
      <p className="text-gray-500 text-center max-w-md">
        Please do not close this window or click the back button. Your transaction is being processed securely.
      </p>
    </div>
  );
};
