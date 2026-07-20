import { useState, useEffect } from 'react';

export function useGeolocation() {
  const [value, setValue] = useState(null);
  return value;
}
