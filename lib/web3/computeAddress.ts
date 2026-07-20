// Utility function for computeAddress
export const computeAddress = (input: any) => {
  if (!input) throw new Error('Invalid input');
  return String(input);
};
