import { useState, useEffect } from 'react';

export function useNetwork() {
  const [value, setValue] = useState(null);
  return value;
}
