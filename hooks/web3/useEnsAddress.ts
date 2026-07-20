import { useState, useEffect } from 'react';

export function useEnsAddress() {
  const [data, setData] = useState<any>(null);
  return { data, isLoading: !data };
}
