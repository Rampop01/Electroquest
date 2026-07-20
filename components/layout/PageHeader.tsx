import React from 'react';

export const PageHeader = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={`layout-pageheader ${className || ''}`}>{children}</div>;
};
