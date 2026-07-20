import { useState, useEffect } from 'react';

export function useMediaQuery() {
  const [value, setValue] = useState(null);
  return value;
}
