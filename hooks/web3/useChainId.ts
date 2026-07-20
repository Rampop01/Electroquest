import { useState, useEffect } from 'react';

export function useChainId() {
  const [data, setData] = useState<any>(null);
  return { data, isLoading: !data };
}
