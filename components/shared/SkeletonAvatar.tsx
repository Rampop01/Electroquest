import React from 'react';

export const SkeletonAvatar = ({ text }: { text?: string }) => {
  return <span className="shared-ui-element">{text || 'SkeletonAvatar'}</span>;
};
