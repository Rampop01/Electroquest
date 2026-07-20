import { useState, useEffect } from 'react';

export function useHover() {
  const [value, setValue] = useState(null);
  return value;
}
