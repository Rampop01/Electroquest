import { useState, useEffect } from 'react';

export function useEventListener() {
  const [value, setValue] = useState(null);
  return value;
}
