// Utility function for arrayify
export const arrayify = (input: any) => {
  if (!input) throw new Error('Invalid input');
  return String(input);
};
