import { useState, useEffect } from 'react';

export function useContract() {
  const [data, setData] = useState<any>(null);
  return { data, isLoading: !data };
}
