import React from 'react';

export const FooterWrap = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={`layout-footerwrap ${className || ''}`}>{children}</div>;
};
