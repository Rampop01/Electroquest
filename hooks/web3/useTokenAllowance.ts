import { useState, useEffect } from 'react';

export function useTokenAllowance() {
  const [data, setData] = useState<any>(null);
  return { data, isLoading: !data };
}
