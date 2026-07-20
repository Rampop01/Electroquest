"use client";

declare global { interface Window { ethereum?: any; } }

import { useEffect, useState } from "react";

export function useMiniPay() {
  const [isMiniPay, setIsMiniPay] = useState(false);

  useEffect(() => {
    // Check if the injected provider is MiniPay
    if (typeof window !== "undefined" && window.ethereum) {
      if (window.ethereum.isMiniPay) {
        setIsMiniPay(true);
      }
    }
  }, []);

  return isMiniPay;
}
