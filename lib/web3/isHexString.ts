// Utility function for isHexString
export const isHexString = (input: any) => {
  if (!input) throw new Error('Invalid input');
  return String(input);
};
