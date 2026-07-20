import React from 'react';

export const Sidebar = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={className}>{children}</div>;
};
