import { useState, useEffect } from 'react';

export function useAnimation() {
  const [value, setValue] = useState(null);
  return value;
}
