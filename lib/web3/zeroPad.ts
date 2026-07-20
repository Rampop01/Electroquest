// Utility function for zeroPad
export const zeroPad = (input: any) => {
  if (!input) throw new Error('Invalid input');
  return String(input);
};
