import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";

import { initialNodes, initialEdges } from "./nodes-edges";

// ReactFlow Data
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 72;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    // let nodeWidth = node.data.label.length * 10;
    // let nodeHeight = node.data.label.length * 5;

    node.style = {
      width: 120,
    };

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  );
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );
  return (
    <div
      className="min-h-96 min-w-96 border-2 border-cyan-500"
      style={{ height: "70vh", width: "60vw" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionLineType={ConnectionLineType.SmoothStep}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      <div className="mt-2 text-xs">
        <button
          type="button"
          onClick={() => onLayout("TB")}
          className="mr-4 bg-slate-100 border rounded border-slate-600 px-2 py-1 hover:bg-slate-200 hover:border-slate-700 active:bg-slate-50 active:border-slate-500"
        >
          vertical layout
        </button>
        <button
          type="button"
          onClick={() => onLayout("LR")}
          className="bg-slate-100 border rounded border-slate-600 px-2 py-1 hover:bg-slate-200 hover:border-slate-700 active:bg-slate-50 active:border-slate-500"
        >
          horizontal layout
        </button>
      </div>
    </div>
  );
};

export default Flow;
