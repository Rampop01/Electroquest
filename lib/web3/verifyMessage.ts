// Utility function for verifyMessage
export const verifyMessage = (input: any) => {
  if (!input) throw new Error('Invalid input');
  return String(input);
};
