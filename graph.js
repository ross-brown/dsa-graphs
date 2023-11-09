/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addNode(node) {
    this.nodes.add(node);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addNodes(nodeArray) {
    for (let node of nodeArray) {
      this.nodes.add(node);
    }
  }

  /** add edge between nodes n1,n2 */
  addEdge(n1, n2) {
    n1.adjacent.add(n2);
    n2.adjacent.add(n1);
  }

  /** remove edge between nodes n1,n2 */
  removeEdge(n1, n2) {
    n1.adjacent.delete(n2);
    n2.adjacent.delete(n1);
  }

  /** remove node from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that node
   */
  removeNode(node) {
    this.nodes.delete(node);

    for (let neighbor of node.adjacent) {
      neighbor.adjacent.delete(node);
    }
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start, seen = new Set([start]), output = []) {
    // if all adjacent seen, stop recursing
    output.push(start.value);

    for (const neighbor of start.adjacent) {
      if (!seen.has(neighbor)) {
        seen.add(neighbor);
        this.depthFirstSearch(neighbor, seen, output);
      }
    }

    return output;

    // let visitStack = [start];
    // let seen = new Set(visitStack);
    // const output = [];

    // while (visitStack.length) {
    //   const current = visitStack.pop();
    //   output.push(current.value);

    //   for (const neighbor of current.adjacent) {
    //     if (!seen.has(neighbor)) {
    //       seen.add(neighbor);
    //       visitStack.push(neighbor);
    //     }
    //   }
    // }

    // return output;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    let visitQueue = [start];
    let seen = new Set(visitQueue);
    const output = [];

    while (visitQueue.length) {
      const current = visitQueue.shift();
      output.push(current.value);

      for (const neighbor of current.adjacent) {
        if (!seen.has(neighbor)) {
          seen.add(neighbor);
          visitQueue.push(neighbor);
        }
      }
    }

    return output;
  }

  /** find the distance of the shortest path from the start node to the end node */
  distanceOfShortestPath(start, end) {
    const BFSvalues = this.breadthFirstSearch(start);
    const DFSvalues = this.depthFirstSearch(start);

    for (let distance = 0; distance < BFSvalues.length; distance++) {
      if (BFSvalues[distance] === end.value
        || DFSvalues[distance] === end.value) return distance;
    }
  }

}

module.exports = { Graph, Node };
