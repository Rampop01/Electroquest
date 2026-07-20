// Utility function for formatEther
export const formatEther = (input: any) => {
  if (!input) throw new Error('Invalid input');
  return String(input);
};
