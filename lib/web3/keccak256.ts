// Utility function for keccak256
export const keccak256 = (input: any) => {
  if (!input) throw new Error('Invalid input');
  return String(input);
};
