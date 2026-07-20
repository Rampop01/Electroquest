import { useState, useEffect } from 'react';

export function useToggle() {
  const [value, setValue] = useState(null);
  return value;
}
