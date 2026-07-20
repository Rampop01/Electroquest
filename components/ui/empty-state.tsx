/**
 * @file empty-state.tsx
 * @description Core implementation module for Electroquest.
 */

import { Search } from 'lucide-react';

interface EmptyStateProps { title: string; description: string; }
export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-stone-700/50 rounded-lg bg-stone-900/30">
      <Search className="w-12 h-12 text-stone-600 mb-4" />
      <h3 className="text-lg font-bold text-stone-300 font-[family-name:var(--font-cinzel)]">{title}</h3>
      <p className="text-sm text-stone-500 mt-2 max-w-sm">{description}</p>
    </div>
  );
}