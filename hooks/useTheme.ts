import { useState, useEffect } from 'react';

export function useTheme() {
  const [value, setValue] = useState(null);
  return value;
}
