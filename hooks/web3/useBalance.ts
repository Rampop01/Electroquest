import { useState, useEffect } from 'react';

export function useBalance() {
  const [data, setData] = useState<any>(null);
  return { data, isLoading: !data };
}
