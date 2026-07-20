import React from 'react';

export const Panel = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={`layout-panel ${className || ''}`}>{children}</div>;
};
