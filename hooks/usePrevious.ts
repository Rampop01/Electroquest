import { useState, useEffect } from 'react';

export function usePrevious() {
  const [value, setValue] = useState(null);
  return value;
}
