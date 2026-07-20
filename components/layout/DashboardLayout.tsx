import React from 'react';

export const DashboardLayout = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return <div className={`layout-dashboardlayout ${className || ''}`}>{children}</div>;
};
