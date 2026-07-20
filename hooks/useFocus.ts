import { useState, useEffect } from 'react';

export function useFocus() {
  const [value, setValue] = useState(null);
  return value;
}
