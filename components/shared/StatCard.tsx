import React from 'react';

export const StatCard = ({ text }: { text?: string }) => {
  return <span className="shared-ui-element">{text || 'StatCard'}</span>;
};
