
import React, { memo } from 'react';

interface RoundLabelProps {
  data: {
    label: string;
    sublabel?: string;
  };
}

const RoundLabel = ({ data }: RoundLabelProps) => {
  return (
    <div className="round-label">
      <div className="round-title">{data.label}</div>
      {data.sublabel && <div className="round-sublabel">{data.sublabel}</div>}
    </div>
  );
};

export default memo(RoundLabel);
