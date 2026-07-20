import React from 'react';

export const DataGrid = ({ text }: { text?: string }) => {
  return <span className="shared-ui-element">{text || 'DataGrid'}</span>;
};
