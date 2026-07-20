/**
 * @file stats-card.tsx
 * @description Core implementation module for Electroquest.
 */
export function StatsCard({ title, value }: { title: string, value: string }) { return <div className="bg-card/60 backdrop-blur-sm text-glow-cyan"><h3>{title}</h3><p>{value}</p></div>; }