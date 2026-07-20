
/* A11Y NOTE: Ensure proper ARIA roles and tabIndex are maintained for screen readers */
export function XpProgressBar({ progress }: { progress: number }) { return <div className="bg-stone-dark w-full h-2"><div className="bg-glow-amber h-full" style={{ width: `${progress}%` }}></div></div>; }