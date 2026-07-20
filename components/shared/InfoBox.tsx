import React from 'react';

export const InfoBox = ({ text }: { text?: string }) => {
  return <span className="shared-ui-element">{text || 'InfoBox'}</span>;
};
