import React from 'react';

export const Spacer = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={`layout-spacer ${className || ''}`}>{children}</div>;
};
