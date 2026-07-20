import React from 'react';

export const PulseRing = ({ text }: { text?: string }) => {
  return <span className="shared-ui-element">{text || 'PulseRing'}</span>;
};
