import { useState, useEffect } from 'react';

export function useScroll() {
  const [value, setValue] = useState(null);
  return value;
}
