import React from 'react';

export const Spinner = ({ text }: { text?: string }) => {
  return <span className="shared-ui-element">{text || 'Spinner'}</span>;
};
