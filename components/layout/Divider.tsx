import React from 'react';

export const Divider = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={`layout-divider ${className || ''}`}>{children}</div>;
};
