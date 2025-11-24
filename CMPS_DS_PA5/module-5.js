// The binary and binary search trees //
console.log("The binary and binary search trees");

function BinarySearchTree() {
  function Node(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }

  var root = null;

  function insertNode(node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
    }
  }

  function searchNode(node, key) {
    if (node === null) return false;
    if (key < node.key) return searchNode(node.left, key);
    if (key > node.key) return searchNode(node.right, key);
    return true;
  }

  function inOrderTraverseNode(node, callback) {
    if (node !== null) {
      inOrderTraverseNode(node.left, callback);
      callback(node.key);
      inOrderTraverseNode(node.right, callback);
    }
  }

  function preOrderTraverseNode(node, callback) {
    if (node !== null) {
      callback(node.key);
      preOrderTraverseNode(node.left, callback);
      preOrderTraverseNode(node.right, callback);
    }
  }

  function postOrderTraverseNode(node, callback) {
    if (node !== null) {
      postOrderTraverseNode(node.left, callback);
      postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  function minNode(node) {
    if (!node) return null;
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  function maxNode(node) {
    if (!node) return null;
    while (node.right !== null) {
      node = node.right;
    }
    return node;
  }

  function removeNode(node, key) {
    if (node === null) return null;

    if (key < node.key) {
      node.left = removeNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      var aux = minNode(node.right);
      node.key = aux.key;
      node.right = removeNode(node.right, aux.key);
      return node;
    }
  }

  this.insert = function(key) {
    var newNode = new Node(key);
    if (root === null) root = newNode;
    else insertNode(root, newNode);
  };

  this.search = function(key) {
    return searchNode(root, key);
  };

  this.inOrderTraverse = function(cb) {
    inOrderTraverseNode(root, cb);
  };

  this.preOrderTraverse = function(cb) {
    preOrderTraverseNode(root, cb);
  };

  this.postOrderTraverse = function(cb) {
    postOrderTraverseNode(root, cb);
  };

  this.min = function() {
    var node = minNode(root);
    return node ? node.key : null;
  };

  this.max = function() {
    var node = maxNode(root);
    return node ? node.key : null;
  };

  this.remove = function(key) {
    root = removeNode(root, key);
  };

  this.print = function() {
    function print(node) {
      if (node !== null) {
        var left = node.left ? node.left.key : "None";
        var right = node.right ? node.right.key : "None";
        console.log(`${left} <-- ${node.key} --> ${right}`);
        print(node.left);
        print(node.right);
      }
    }
    console.log("===tree===");
    print(root);
    console.log("==========");
  };
}


// Build the sample tree from book

var tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);

tree.print();


// Traversal tests
console.log("In-order traversal:");
tree.inOrderTraverse(v => console.log(v));

console.log("Pre-order traversal:");
tree.preOrderTraverse(v => console.log(v));

console.log("Post-order traversal:");
tree.postOrderTraverse(v => console.log(v));

console.log("Min:", tree.min());
console.log("Max:", tree.max());
console.log("Search 13:", tree.search(13));
console.log("Search 4:", tree.search(4));


// Graph class

console.log("Graph class");

function Graph() {
  var vertices = [];
  var adjList = {};

  function initializeColor() {
    var color = {};
    vertices.forEach(v => color[v] = "white");
    return color;
  }

  this.addVertex = function(v) {
    vertices.push(v);
    adjList[v] = [];
  };

  this.addEdge = function(v, w) {
    adjList[v].push(w);
    adjList[w].push(v);
  };

  this.toString = function() {
    var s = "";
    vertices.forEach(v => {
      s += v + " -> " + adjList[v].join(" ") + "\n";
    });
    return s;
  };

  this.bfs = function(start, cb) {
    var color = initializeColor();
    var queue = [start];
    var distances = {};
    var predecessors = {};

    vertices.forEach(v => {
      distances[v] = 0;
      predecessors[v] = null;
    });

    while (queue.length > 0) {
      var u = queue.shift();
      adjList[u].forEach(w => {
        if (color[w] === "white") {
          color[w] = "grey";
          distances[w] = distances[u] + 1;
          predecessors[w] = u;
          queue.push(w);
        }
      });
      color[u] = "black";
      if (cb) cb(u);
    }

    return { distances, predecessors };
  };

  this.dfs = function(cb) {
    var color = initializeColor();
    var discovery = {};
    var finished = {};
    var predecessors = {};
    var time = 0;

    vertices.forEach(v => {
      discovery[v] = 0;
      finished[v] = 0;
      predecessors[v] = null;
    });

    function dfsVisit(u) {
      color[u] = "grey";
      discovery[u] = ++time;
      if (cb) cb(u);

      adjList[u].forEach(w => {
        if (color[w] === "white") {
          predecessors[w] = u;
          dfsVisit(w);
        }
      });

      color[u] = "black";
      finished[u] = ++time;
    }

    vertices.forEach(v => {
      if (color[v] === "white") dfsVisit(v);
    });

    return { discovery, finished, predecessors };
  };
}


// Build graph example

var graph = new Graph();
["A","B","C","D","E","F"].forEach(v => graph.addVertex(v));

graph.addEdge("A","B");
graph.addEdge("A","C");
graph.addEdge("A","D");
graph.addEdge("C","D");
graph.addEdge("C","E");
graph.addEdge("B","E");
graph.addEdge("D","E");
graph.addEdge("D","F");
graph.addEdge("E","F");

console.log(graph.toString());

console.log("BFS from A:");
graph.bfs("A", v => console.log("BFS visit:", v));

console.log("DFS traversal:");
graph.dfs(v => console.log("DFS visit:", v));


// Dijkstra

function dijkstra(matrix, src) {
  var dist = [];
  var visited = [];
  var n = matrix.length;

  for (let i = 0; i < n; i++) {
    dist[i] = Infinity;
    visited[i] = false;
  }

  dist[src] = 0;

  function minDistance() {
    var min = Infinity;
    var index = -1;
    for (let v = 0; v < n; v++) {
      if (!visited[v] && dist[v] <= min) {
        min = dist[v];
        index = v;
      }
    }
    return index;
  }

  for (let count = 0; count < n - 1; count++) {
    var u = minDistance();
    visited[u] = true;

    for (let v = 0; v < n; v++) {
      if (
        !visited[v] &&
        matrix[u][v] !== 0 &&
        dist[u] !== Infinity &&
        dist[u] + matrix[u][v] < dist[v]
      ) {
        dist[v] = dist[u] + matrix[u][v];
      }
    }
  }

  return dist;
}

var weightGraph = [
  [0,2,4,0,0,0],
  [0,0,1,4,2,0],
  [0,0,0,0,3,0],
  [0,0,0,0,0,2],
  [0,0,0,3,0,2],
  [0,0,0,0,0,0]
];

console.log("Dijkstra distances from 0:");
console.log(dijkstra(weightGraph, 0));
