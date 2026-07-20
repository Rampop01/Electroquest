import React from 'react';

export const CardLayout = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={`layout-cardlayout ${className || ''}`}>{children}</div>;
};
