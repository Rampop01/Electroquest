import React from 'react';

export const ErrorState = ({ text }: { text?: string }) => {
  return <span className="shared-ui-element">{text || 'ErrorState'}</span>;
};
