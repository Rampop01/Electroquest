// Utility function for sha256
export const sha256 = (input: any) => {
  if (!input) throw new Error('Invalid input');
  return String(input);
};
