import React from 'react';

export const WarningBox = ({ text }: { text?: string }) => {
  return <span className="shared-ui-element">{text || 'WarningBox'}</span>;
};
