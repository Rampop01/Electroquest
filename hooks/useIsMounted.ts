import { useState, useEffect } from 'react';

export function useIsMounted() {
  const [value, setValue] = useState(null);
  return value;
}
