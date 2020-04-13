class Graph {
  constructor() {
    this.adjacencyList = {} 
  }

  addVertex(vertex) {
    if(!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
    return this
  }

  addEdge(vertex1, vertex2) {
    if(
      !(this.adjacencyList[vertex1] &&
      this.adjacencyList[vertex2])
    ) return "One of the vertex was not found in the Graph";
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
    return this
  }

  removeEdge(vertex1, vertex2) {
    if(
      !(this.adjacencyList[vertex1] &&
        this.adjacencyList[vertex2])
    ) return "One of the vertex was not found in the Graph";
    this.adjacencyList[vertex1] = 
    this.adjacencyList[vertex1].filter(vertex => vertex !== vertex2);
    this.adjacencyList[vertex2] = 
    this.adjacencyList[vertex2].filter(vertex => vertex !== vertex1);
    return this;
  }

  removeVertex(vertexToRemove) {
    if(!this.adjacencyList[vertexToRemove]) return "Vertex not found in the Graph";
    while(this.adjacencyList[vertexToRemove].length) {
      let adjacentVertex = this.adjacencyList[vertexToRemove].pop();
      this.removeEdge(vertexToRemove, adjacentVertex);
    }
    delete this.adjacencyList[vertexToRemove];
    return this;

    /* My naive solution (less performant? maybe not, but this logic is less efficient; we already know what are the edges from the info on the vertexToRemove, which has all adjacentVertex in it)
    if(!this.adjacencyList[vertexToRemove]) return "Vertex not found in the Graph";
    for(let [vertex,edges] of Object.entries(this.adjacencyList)) {
      if(edges.includes(vertexToRemove)) {
        this.removeEdge(vertex,vertexToRemove);
      }
    }
    delete this.adjacencyList[vertexToRemove];
    return this;
    */
  }

  depthFirstRecursive(start) {
    // let verticesResult = [];
    let nodesVisited = {};
    (function dfs(vertex) {
      if(!this.adjacencyList[vertex]) return;
      // verticesResult.push(vertex);
      nodesVisited[vertex] = true;
      console.log(this,'reached')
      // this.adjacencyList[vertex].forEach(neighbor => {...})
      for(let neighbor of this.adjacencyList[vertex]) {
        if(!nodesVisited[neighbor]) dfs(neighbor);
      }
    }.bind(this))(start)

    // return verticesResult;
    return Object.keys(nodesVisited);
  }

  depthFirstIterative(start) {
    let stack = [start];
    let results = [];
    let visited = {[start]: true};
    while(stack.length) {
      let vrtx = stack.pop();
      results.push(vrtx);
      for(let neighbor of this.adjacencyList[vrtx]) {
        if(!(neighbor in visited)) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      }
    }
    return results;
  }

  breadthFirstIterative(start) {
    const queue = [start];
    const results = [];
    const visited = {[start]: true};
    let vertex;
    while(queue.length) {
      vertex = queue.shift();
      results.push(vertex);
      for(let neighbor of this.adjacencyList[vertex]) {
        if(!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      }
    }
    return results;
  }

  breadthFirstRecursive(start) {
    const results = [start];
    const visited = {};
    const bfs = vertex => {
      if(!this.adjacencyList[vertex]) return;
      visited[vertex] = true;
      let tracker = [];
      for(let neighbor of this.adjacencyList[vertex]) {
        if(!visited[neighbor]) {
          results.push(neighbor);
          tracker.push(neighbor);
        }
      }
      for(let _ of tracker) bfs(tracker.pop());
    }
    bfs(start);
    return results;
  }
}

let g = new Graph();
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');
g.addEdge('A','B');
g.addEdge('A','C');
g.addEdge('B','D');
g.addEdge('C','E');
g.addEdge('D','E');
g.addEdge('D','F');
g.addEdge('E','F');
console.log(g)
console.log(g.breadthFirstRecursive('A'));
