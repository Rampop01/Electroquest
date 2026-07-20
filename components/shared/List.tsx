import React from 'react';

export const List = ({ text }: { text?: string }) => {
  return <span className="shared-ui-element">{text || 'List'}</span>;
};
