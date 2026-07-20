// Utility function for getAddress
export const getAddress = (input: any) => {
  if (!input) throw new Error('Invalid input');
  return String(input);
};
