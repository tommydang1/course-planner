import React from "react";
import Layout from "../Layout";
import Flow from "../flow";

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

// Course Scheduling Algorithm
// This class represents a directed graph using adjacency list representation
// https://www.geeksforgeeks.org/topological-sorting/
class Graph {
  // Constructor
  constructor(nodes) {
    // Adjacency List
    this.adj = {};
    for (let i = 0; i < nodes.length; i++) {
      this.adj[nodes[i]] = [];
    }
    this.nodes = nodes;
  }

  // Function to add an edge into the graph
  addEdge(v, w) {
    this.adj[v].push(w);
  }

  // A recursive function used by topologicalSort
  topologicalSortUtil(v, visited, stack) {
    // Mark the current node as visited.
    visited[v] = true;
    let i = 0;

    // Recur for all the vertices adjacent
    // to thisvertex
    for (i = 0; i < this.adj[v].length; i++) {
      if (!visited[this.adj[v][i]]) {
        this.topologicalSortUtil(this.adj[v][i], visited, stack);
      }
    }

    // Push current vertex to stack
    // which stores result
    stack.push(v);
  }

  // The function to do Topological Sort.
  // It uses recursive topologicalSortUtil()
  topologicalSort() {
    let stack = [];

    // Mark all the vertices as not visited
    let visited = {};
    for (let i = 0; i < this.nodes.length; i++) {
      visited[this.nodes[i]] = false;
    }

    // Call the recursive helper
    // function to store
    // Topological Sort starting
    // from all vertices one by one
    for (let key in visited) {
      if (visited[key] === false) {
        this.topologicalSortUtil(key, visited, stack);
      }
    }

    // Print contents of stack
    return stack;
  }
}

const SchedulerPage = () => {
  // Driver Code
  let g = new Graph(exampleCourses);

  for (let i = 0; i < examplePrereqs.length; i++) {
    g.addEdge(examplePrereqs[i][0], examplePrereqs[i][1]);
  }

  // Function Call
  const courseSchedule = g.topologicalSort();

  let courseList = courseSchedule.map((course) => (
    <ol key={course}>{course}</ol>
  ));

  return (
    <Layout>
      <div className="flex justify-between" style={{ minHeight: "100vh" }}>
        <div className="border pr-20">
          Possible Course Order:
          {courseList}
        </div>
        <Flow />
      </div>
    </Layout>
  );
};

export default SchedulerPage;
