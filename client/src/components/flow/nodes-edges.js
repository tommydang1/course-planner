export const setNodesEdges = (courses, prereqs) => {
  const position = { x: 0, y: 0 };
  const edgeType = "smoothstep";

  let initialNodes = [];
  let initialEdges = [];

  for (let i = 0; i < courses?.length; i++) {
    initialNodes.push({
      id: courses[i],
      data: { label: courses[i] },
      position,
    });
  }

  for (let i = 0; i < prereqs?.length; i++) {
    initialEdges.push({
      id: prereqs[i][0] + prereqs[i][0] + i,
      source: prereqs[i][1],
      target: prereqs[i][0],
      type: edgeType,
    });
  }
  return [initialNodes, initialEdges];
};
