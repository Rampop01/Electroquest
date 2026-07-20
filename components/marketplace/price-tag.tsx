
/* A11Y NOTE: Ensure proper ARIA roles and tabIndex are maintained for screen readers */
export function PriceTag({ price }: { price: number }) { return <span className="text-glow-amber">{price} CELO</span>; }