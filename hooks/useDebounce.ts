import { useState, useEffect } from 'react';

export function useDebounce() {
  const [value, setValue] = useState(null);
  return value;
}
