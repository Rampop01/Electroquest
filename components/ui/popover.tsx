import React from 'react';

export const Popover = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={className}>{children}</div>;
};
