import React from 'react';

export const Chip = ({ text }: { text?: string }) => {
  return <span className="shared-ui-element">{text || 'Chip'}</span>;
};
