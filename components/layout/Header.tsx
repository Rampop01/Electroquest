import React from 'react';

export const Header = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={`layout-header ${className || ''}`}>{children}</div>;
};
