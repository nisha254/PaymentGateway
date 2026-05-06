import { TIMEOUT_MS } from './constants';

export const createTimeoutSignal = (timeoutMs: number = TIMEOUT_MS): AbortSignal => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutMs);
  return controller.signal;
};
