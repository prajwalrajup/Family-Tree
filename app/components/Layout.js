"use client";

import Dagre from "@dagrejs/dagre";
import React, { useCallback } from "react";
import "reactflow/dist/style.css";
import MarriedNode from "./MarriedNode";
import { preProcessData } from "./PreProcessData";
import ReactFlow, {
  MiniMap,
  Controls,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeTypes = {
  marriedNode: MarriedNode,
};

const LayoutFlow = ({ data }) => {
  const { fitView } = useReactFlow();
  const { initialNodes, initialEdges } = preProcessData(data);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  g.setGraph({ rankdir: "TB" });
  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, node));

  Dagre.layout(g);

  nodes.forEach((node) => {
    node.position = g.node(node.id);
  });

  window.requestAnimationFrame(() => {
    fitView();
  });

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      onConnect={onConnect}
      fitView
    >
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
};

export default function ({ data }) {
  return (
    <ReactFlowProvider>
      <LayoutFlow data={data} />
    </ReactFlowProvider>
  );
}
