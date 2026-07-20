import React from 'react';

export const ImageFallback = ({ text }: { text?: string }) => {
  return <span className="shared-ui-element">{text || 'ImageFallback'}</span>;
};
