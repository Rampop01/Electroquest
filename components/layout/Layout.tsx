import React from 'react';

export const Layout = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={`layout-layout ${className || ''}`}>{children}</div>;
};
