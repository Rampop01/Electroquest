import React from 'react';

export const ListItem = ({ text }: { text?: string }) => {
  return <span className="shared-ui-element">{text || 'ListItem'}</span>;
};
