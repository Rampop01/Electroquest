// Utility function for hashMessage
export const hashMessage = (input: any) => {
  if (!input) throw new Error('Invalid input');
  return String(input);
};
