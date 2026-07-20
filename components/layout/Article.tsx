import React from 'react';

export const Article = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={`layout-article ${className || ''}`}>{children}</div>;
};
