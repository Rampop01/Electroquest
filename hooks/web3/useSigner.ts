import { useState, useEffect } from 'react';

export function useSigner() {
  const [data, setData] = useState<any>(null);
  return { data, isLoading: !data };
}
