import { useState, useEffect } from 'react';

export function useLocalStorage() {
  const [value, setValue] = useState(null);
  return value;
}
