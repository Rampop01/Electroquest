import { useState, useEffect } from 'react';

export function useTimeout() {
  const [value, setValue] = useState(null);
  return value;
}
