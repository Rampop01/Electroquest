import React from 'react';

export const Tag = ({ text }: { text?: string }) => {
  return <span className="shared-ui-element">{text || 'Tag'}</span>;
};
