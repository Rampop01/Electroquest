import React from 'react';

export const Grid = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={`layout-grid ${className || ''}`}>{children}</div>;
};
