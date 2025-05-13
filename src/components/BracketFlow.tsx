
import React, { useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionLineType,
  BackgroundVariant
} from '@xyflow/react';
import MatchNode from './MatchNode';
import ResultNode from './ResultNode';
import RoundLabel from './RoundLabel';
import { initialNodes, initialEdges } from '../data/bracketData';
import { initialDoubleNodes, initialDoubleEdges } from '../data/doubleBracketData';
import { BracketType } from '@/types/bracket';

const nodeTypes = {
  match: MatchNode,
  resultNode: ResultNode,
  roundLabel: RoundLabel,
};

interface BracketFlowProps {
  zoomLevel: number;
  bracketType: BracketType;
}

const BracketFlow: React.FC<BracketFlowProps> = ({ zoomLevel, bracketType }) => {
  // Use the appropriate nodes and edges based on bracket type
  const initialNodesData = bracketType === 'single' ? initialNodes : initialDoubleNodes;
  const initialEdgesData = bracketType === 'single' ? initialEdges : initialDoubleEdges;
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesData);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdgesData);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(
      { 
        ...params, 
        animated: true, 
        style: { stroke: '#555', strokeWidth: 2 } 
      }, 
      eds
    )),
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
        defaultViewport={{ x: 0, y: 0, zoom: zoomLevel }}
        minZoom={0.2}
        maxZoom={2}
        fitView
        attributionPosition="bottom-right"
        style={{ background: '#0A0A0A' }}
        nodesDraggable={false} // Disable dragging for all nodes
        panOnDrag={true} // Enable panning the entire canvas
        deleteKeyCode={null} // Disable deletion with delete key
      >
        <Controls showInteractive={false} />
        <Background color="#333" variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default BracketFlow;
