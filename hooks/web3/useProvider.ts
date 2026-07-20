import { useState, useEffect } from 'react';

export function useProvider() {
  const [data, setData] = useState<any>(null);
  return { data, isLoading: !data };
}
