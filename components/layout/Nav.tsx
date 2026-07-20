import React from 'react';

export const Nav = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={`layout-nav ${className || ''}`}>{children}</div>;
};
