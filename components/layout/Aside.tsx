import React from 'react';

export const Aside = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={`layout-aside ${className || ''}`}>{children}</div>;
};
