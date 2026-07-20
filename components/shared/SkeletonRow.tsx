import React from 'react';

export const SkeletonRow = ({ text }: { text?: string }) => {
  return <span className="shared-ui-element">{text || 'SkeletonRow'}</span>;
};
