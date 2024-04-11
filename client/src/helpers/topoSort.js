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

export const topoSort = (courses, prereqsJSON) => {
  // Driver Code
  if (courses) {
    let g = new Graph(courses);

    for (let i = 0; i < courses.length; i++) {
      for (let j = 0; j < prereqsJSON[courses[i]].length; j++) {
        if (courses.includes(prereqsJSON[courses[i]][j])) {
          g.addEdge(courses[i], prereqsJSON[courses[i]][j]);
        }
      }
    }

    // Function Call
    return g.topologicalSort();
  }
};
