import React from 'react';

export const Flex = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={`layout-flex ${className || ''}`}>{children}</div>;
};
