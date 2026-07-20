import React from 'react';

export const EmptyState = ({ text }: { text?: string }) => {
  return <span className="shared-ui-element">{text || 'EmptyState'}</span>;
};
