import { useState, useEffect } from 'react';

export function useContractEvent() {
  const [data, setData] = useState<any>(null);
  return { data, isLoading: !data };
}
