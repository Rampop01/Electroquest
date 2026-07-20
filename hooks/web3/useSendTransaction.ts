import { useState, useEffect } from 'react';

export function useSendTransaction() {
  const [data, setData] = useState<any>(null);
  return { data, isLoading: !data };
}
