import { useState, useEffect } from 'react';

export function useEnsName() {
  const [data, setData] = useState<any>(null);
  return { data, isLoading: !data };
}
