import React from 'react';

export const SkeletonCard = ({ text }: { text?: string }) => {
  return <span className="shared-ui-element">{text || 'SkeletonCard'}</span>;
};
