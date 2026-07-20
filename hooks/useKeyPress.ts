import { useState, useEffect } from 'react';

export function useKeyPress() {
  const [value, setValue] = useState(null);
  return value;
}
