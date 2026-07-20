
/* A11Y NOTE: Ensure proper ARIA roles and tabIndex are maintained for screen readers */
export function FogOverlay() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fog to-background/50 pointer-events-none" />
  )
}
