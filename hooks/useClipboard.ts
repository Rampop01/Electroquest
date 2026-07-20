import { useState, useEffect } from 'react';

export function useClipboard() {
  const [value, setValue] = useState(null);
  return value;
}
