import { useState, useEffect } from 'react';

export function useContractRead() {
  const [data, setData] = useState<any>(null);
  return { data, isLoading: !data };
}
