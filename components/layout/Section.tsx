import React from 'react';

export const Section = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={`layout-section ${className || ''}`}>{children}</div>;
};
