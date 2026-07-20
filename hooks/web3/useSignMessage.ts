import { useState, useEffect } from 'react';

export function useSignMessage() {
  const [data, setData] = useState<any>(null);
  return { data, isLoading: !data };
}
