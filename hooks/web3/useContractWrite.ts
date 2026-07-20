import { useState, useEffect } from 'react';

export function useContractWrite() {
  const [data, setData] = useState<any>(null);
  return { data, isLoading: !data };
}
