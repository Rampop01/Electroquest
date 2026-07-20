// Utility function for isAddress
export const isAddress = (input: any) => {
  if (!input) throw new Error('Invalid input');
  return String(input);
};
