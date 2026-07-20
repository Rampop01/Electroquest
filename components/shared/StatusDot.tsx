import React from 'react';

export const StatusDot = ({ text }: { text?: string }) => {
  return <span className="shared-ui-element">{text || 'StatusDot'}</span>;
};
