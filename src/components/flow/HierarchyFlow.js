'use client';

import React, { useCallback, useState } from 'react';
import {
  Background,
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  Controls,
} from '@xyflow/react';
import dagre from '@dagrejs/dagre';

import '@xyflow/react/dist/style.css';
import './HierarchyFlow.css';

import { initialNodes, initialEdges } from './initialElements';

// Initialize dagre graph
const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

// Define node dimensions
const nodeWidth = 180;
const nodeHeight = 40;

// Function to calculate layout
const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  // Clear previous nodes
  dagreGraph.nodes().forEach(node => dagreGraph.removeNode(node));

  // Add nodes to dagre graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  // Add edges to dagre graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Run the layout algorithm
  dagre.layout(dagreGraph);

  // Apply layout positions to nodes
  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      // Adjust position to match React Flow's coordinate system
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: newNodes, edges };
};

// Get initial layouted elements
const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges,
);

const HierarchyFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [layoutDirection, setLayoutDirection] = useState('TB');

  // Handle connections between nodes
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds),
      ),
    [],
  );

  // Apply layout when direction changes
  const onLayout = useCallback(
    (direction) => {
      setLayoutDirection(direction);
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction,
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges, setNodes, setEdges],
  );

  return (
    <div className="hierarchy-flow-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        proOptions={{ hideAttribution: true }}
        style={{ backgroundColor: '#111111' }}
      >
        <Panel position="top-right">
          <button
            className="hierarchy-button"
            onClick={() => onLayout('TB')}
            style={{ fontWeight: layoutDirection === 'TB' ? 'bold' : 'normal' }}
          >
            Vertical Layout
          </button>
          <button
            className="hierarchy-button"
            onClick={() => onLayout('LR')}
            style={{ fontWeight: layoutDirection === 'LR' ? 'bold' : 'normal' }}
          >
            Horizontal Layout
          </button>
        </Panel>
        <Controls style={{ backgroundColor: '#222222', color: '#e0e0e0', borderColor: '#444444' }} />
        <Background color="#333333" gap={16} variant="dots" />
      </ReactFlow>
    </div>
  );
};

export default HierarchyFlow;
