import React from 'react';

export const SuccessState = ({ text }: { text?: string }) => {
  return <span className="shared-ui-element">{text || 'SuccessState'}</span>;
};
