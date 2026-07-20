import React from 'react';

export const Loader = ({ text }: { text?: string }) => {
  return <span className="shared-ui-element">{text || 'Loader'}</span>;
};
