import { useState, useEffect } from 'react';

export function useTokenBalance() {
  const [data, setData] = useState<any>(null);
  return { data, isLoading: !data };
}
