import { useState, useEffect } from 'react';

export function useInterval() {
  const [value, setValue] = useState(null);
  return value;
}
