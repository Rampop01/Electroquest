import React from 'react';

export const Wrapper = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={`layout-wrapper ${className || ''}`}>{children}</div>;
};
