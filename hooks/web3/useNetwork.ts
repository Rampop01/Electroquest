import { useState, useEffect } from 'react';

export function useNetwork() {
  const [data, setData] = useState<any>(null);
  return { data, isLoading: !data };
}
