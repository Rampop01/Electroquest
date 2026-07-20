import { useState, useEffect } from 'react';

export function useTransaction() {
  const [data, setData] = useState<any>(null);
  return { data, isLoading: !data };
}
