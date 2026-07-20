import React from 'react';

export const Main = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={`layout-main ${className || ''}`}>{children}</div>;
};
