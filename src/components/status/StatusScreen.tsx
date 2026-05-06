import React from 'react';
import { usePaymentStore } from '@/store/paymentStore';
import { ProcessingScreen } from './ProcessingScreen';
import { SuccessScreen } from './SuccessScreen';
import { FailedScreen } from './FailedScreen';
import { TimeoutScreen } from './TimeoutScreen';

export const StatusScreen: React.FC = () => {
  const { status } = usePaymentStore();

  switch (status) {
    case 'processing':
      return <ProcessingScreen />;
    case 'success':
      return <SuccessScreen />;
    case 'failed':
      return <FailedScreen />;
    case 'timeout':
      return <TimeoutScreen />;
    default:
      return null;
  }
};
