"use client";

import Dagre from "@dagrejs/dagre";
import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

class Gender {
  static MALE = "MALE";
  static FEMALE = "FEMALE";
}
// const initialNodes = [
//   {
//     id: "1",
//     name: "John Doe",
//     children: ["2a", "2b"],
//     gender: "MALE",
//   },
//   {
//     id: "1b",
//     name: "wife",
//     children: ["2a", "2b"],
//     gender: "FEMALE",
//   },
//   {
//     id: "2a",
//     name: "dary",
//     children: [],
//   },
//   {
//     id: "2b",
//     name: "honey",
//     children: ["3"],
//   },
// ];

const LayoutFlow = ({ data }) => {
  const initialEdges = [];
  const initialNodes = Object.values(data.people);

  initialNodes.forEach((node) => {
    if (node.children) {
      node.children.forEach((child) => {
        initialEdges.push({
          id: `e-${node.id}-${child}`,
          source: node.id,
          target: child,
          animated: true,
          type: "smoothstep",
        });
      });
    }
    node["data"] = { label: node.name };
  });

  console.log(initialNodes);

  const { fitView } = useReactFlow();
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

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
      <Controls />
      <MiniMap />
      {/* <Panel position="top-right">
        <button onClick={() => onLayout()}>vertical layout</button>
      </Panel> */}
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
