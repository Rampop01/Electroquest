// Utility function for hexlify
export const hexlify = (input: any) => {
  if (!input) throw new Error('Invalid input');
  return String(input);
};
