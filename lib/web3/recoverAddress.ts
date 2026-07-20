// Utility function for recoverAddress
export const recoverAddress = (input: any) => {
  if (!input) throw new Error('Invalid input');
  return String(input);
};
