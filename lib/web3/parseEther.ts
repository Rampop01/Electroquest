// Utility function for parseEther
export const parseEther = (input: any) => {
  if (!input) throw new Error('Invalid input');
  return String(input);
};
