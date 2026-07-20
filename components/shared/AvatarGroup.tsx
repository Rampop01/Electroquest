import React from 'react';

export const AvatarGroup = ({ text }: { text?: string }) => {
  return <span className="shared-ui-element">{text || 'AvatarGroup'}</span>;
};
