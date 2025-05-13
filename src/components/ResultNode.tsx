
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface ResultNodeProps {
  data: {
    label: string;
  };
  isConnectable: boolean;
}

const ResultNode = ({ data, isConnectable }: ResultNodeProps) => {
  return (
    <div className="result-node">
      <div className="result-label">{data.label}</div>
      <Handle
        type="target"
        position={Position.Left}
        style={{ visibility: 'hidden' }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(ResultNode);
