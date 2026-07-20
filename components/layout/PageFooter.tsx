import React from 'react';

export const PageFooter = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={`layout-pagefooter ${className || ''}`}>{children}</div>;
};
