
import React, { useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionLineType,
  Panel
} from '@xyflow/react';
import MatchNode from './MatchNode';
import ResultNode from './ResultNode';
import RoundLabel from './RoundLabel';
import { initialNodes, initialEdges } from '../data/bracketData';

const nodeTypes = {
  match: MatchNode,
  resultNode: ResultNode,
  roundLabel: RoundLabel,
};

interface BracketFlowProps {
  zoomLevel: number;
}

const BracketFlow: React.FC<BracketFlowProps> = ({ zoomLevel }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#555', strokeWidth: 2 } }, eds)),
    [setEdges]
  );

  return (
    <div className="flow-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        defaultZoom={zoomLevel}
        minZoom={0.2}
        maxZoom={2}
        fitView
        attributionPosition="bottom-right"
        style={{ background: '#0A0A0A' }}
        deleteKeyCode={[]}
      >
        <Controls showInteractive={false} />
        <Background color="#333" variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default BracketFlow;
