class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(value, priority) {
    this.values.push({ value, priority })
    this.sort()
    return this;
  }
  dequeue() {
    return this.values.shift();
  }
  sort() {
    this.values.sort(function sortingCriteria(a,b) {
      return a.priority - b.priority;
    })
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    return this;
  }
  addEdge(vertex1, vertex2,weight) {
    if(
      !(this.adjacencyList[vertex1] && 
      this.adjacencyList[vertex2])
    ) return "One of the vertex was not found in the graph"
    this.adjacencyList[vertex1].push({node: vertex2, weight});
    this.adjacencyList[vertex2].push({node: vertex1, weight});
    return this;
  }

  shortestPath(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    const visited = [];
    let shortestPath = [];
    let smallest;
    for(let vtx in this.adjacencyList) {
      if (vtx !== start) {
        distances[vtx] = Infinity;
        nodes.enqueue(vtx, Infinity);
      } else {
        distances[start] = 0;
        nodes.enqueue(start, 0);
      }
      previous[vtx] = null;
    }
    while(true) { //Be careful of never reaching the stopping condition (start === finish) when using while(true)
      smallest = nodes.dequeue().value;
      if(smallest === finish) {
        // Build the shortestPath list
        do {
          shortestPath.push(smallest)
          smallest = previous[smallest]
        } while (smallest);
        /* recursive approach
        (function buildPath(path) {
          shortestPath.push(path)
          if(path === start) return;
          buildPath(previous[path])
        })(finish)
        */
        break;
      }
      if(visited.includes(smallest)) continue;
      visited.push(smallest);
      for(let {node,weight} of this.adjacencyList[smallest]) {
        let totalDistance = weight;
        if(previous[smallest]) totalDistance += distances[smallest];
        if(totalDistance < distances[node]) {
          distances[node] = totalDistance;
          previous[node] = smallest;
          nodes.enqueue(node, totalDistance);
        }
      }
    }
    return {distances, previous, shortestPath: shortestPath.reverse()};
  }
}

let g = new WeightedGraph();
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');
g.addEdge('A','B',4);
g.addEdge('A','C',2);
g.addEdge('B','E',3);
g.addEdge('C','D',2);
g.addEdge('C','F',4);
g.addEdge('D','F',1);
g.addEdge('D','E',3);
g.addEdge('F','E',1);
// console.log(g.adjacencyList)

console.log(g.shortestPath('A','E'));