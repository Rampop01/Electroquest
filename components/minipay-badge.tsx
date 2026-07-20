"use client";

import { useEffect, useState } from "react";
import { useMiniPay } from "@/hooks/use-minipay";
import { CheckCircle2, Smartphone } from "lucide-react";

export function MiniPayBadge() {
  const [mounted, setMounted] = useState(false);
  const isMiniPay = useMiniPay();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isMiniPay) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-sm font-medium text-emerald-400 backdrop-blur-md shadow-lg shadow-emerald-500/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Smartphone className="w-4 h-4" />
      <span>MiniPay Active</span>
      <CheckCircle2 className="w-4 h-4 ml-1" />
    </div>
  );
}
