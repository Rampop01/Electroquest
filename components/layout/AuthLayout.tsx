import React from 'react';

export const AuthLayout = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={`layout-authlayout ${className || ''}`}>{children}</div>;
};
