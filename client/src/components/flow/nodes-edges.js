const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

const exampleCourses = [
  "MATH 19A/20A",
  "CSE 16",
  "CSE 20",
  "CSE 12/L",
  "MATH 19B/20B",
  "AM 30/MATH 23A",
  "AM 10/MATH 21",
  "CSE 30",
  "CSE 13S/13E",
  "CSE 120",
  "CSE 101",
  "CSE 114A",
  "CSE 102",
  "CSE 103",
  "CSE 130/131",
  "CSE 107/STAT 131",
  "CSE 115A",
  "ELECTIVE 1",
  "ELECTIVE 2",
  "ELECTIVE 3",
  "ELECTIVE 4",
];
export const examplePrereqs = [
  ["CSE 16", "MATH 19A/20A"],
  ["MATH 19B/20B", "MATH 19A/20A"],
  ["AM 30/MATH 23A", "MATH 19B/20B"],
  ["CSE 30", "CSE 20"],
  ["CSE 12/L", "CSE 20"],
  ["CSE 13S/13E", "CSE 12/L"],
  ["CSE 120", "CSE 13S/13E"],
  ["CSE 101", "MATH 19B/20B"],
  ["CSE 101", "CSE 16"],
  ["CSE 101", "CSE 30"],
  ["CSE 101", "CSE 13S/13E"],
  ["CSE 102", "CSE 101"],
  ["CSE 103", "CSE 101"],
  ["CSE 114A", "CSE 101"],
  ["CSE 130/131", "CSE 101"],
  ["CSE 115A", "CSE 130/131"],
  ["CSE 107/STAT 131", "CSE 16"],
  ["CSE 107/STAT 131", "AM 30/MATH 23A"],
  ["ELECTIVE 1", "CSE 101"],
  ["ELECTIVE 2", "CSE 101"],
  ["ELECTIVE 3", "CSE 101"],
  ["ELECTIVE 4", "CSE 101"],
];

let initialNodes = [];
let initialEdges = [];

for (let i = 0; i < exampleCourses.length; i++) {
  initialNodes.push({
    id: exampleCourses[i],
    data: { label: exampleCourses[i] },
    position,
  });
}

for (let i = 0; i < examplePrereqs.length; i++) {
  initialEdges.push({
    id: examplePrereqs[i][0] + examplePrereqs[i][0] + i,
    source: examplePrereqs[i][1],
    target: examplePrereqs[i][0],
    type: edgeType,
  });
}

export { initialNodes, initialEdges };
