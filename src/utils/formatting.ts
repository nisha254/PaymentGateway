export const formatCardNumber = (value: string): string => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const parts = v.match(/.{1,4}/g);

  if (!v) return '';
  if (parts) {
    return parts.join(' ').substring(0, 19);
  } else {
    return v;
  }
};

export const formatExpiryDate = (value: string): string => {
  const v = value.replace(/[^0-9]/gi, '');
  if (v.length === 0) return '';
  if (v.length > 2) {
    return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
  }
  return v;
};

export const formatAmount = (value: string): string => {
  return value.replace(/[^0-9.]/g, '');
};

export const maskCardNumber = (number: string): string => {
  const stripped = number.replace(/\s/g, '');
  if (stripped.length < 4) return '•••• •••• •••• ••••';
  const last4 = stripped.slice(-4);
  return `•••• •••• •••• ${last4}`;
};
