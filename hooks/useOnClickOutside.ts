import { useState, useEffect } from 'react';

export function useOnClickOutside() {
  const [value, setValue] = useState(null);
  return value;
}
