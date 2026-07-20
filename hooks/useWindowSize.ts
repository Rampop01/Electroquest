import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [value, setValue] = useState(null);
  return value;
}
