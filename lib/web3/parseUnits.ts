// Utility function for parseUnits
export const parseUnits = (input: any) => {
  if (!input) throw new Error('Invalid input');
  return String(input);
};
