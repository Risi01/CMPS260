// Project //
console.log("Project");


// Node constructor

function Node(key) {
  this.key = key;
  this.left = null;
  this.right = null;
}


// BinarySearchTree (prototype)

function BinarySearchTree() {
  this.root = null;
}

// Insert helper
BinarySearchTree.prototype._insertNode = function(node, newNode) {
  if (newNode.key < node.key) {
    if (node.left === null) node.left = newNode;
    else this._insertNode(node.left, newNode);
  } else {
    if (node.right === null) node.right = newNode;
    else this._insertNode(node.right, newNode);
  }
};

// Insert
BinarySearchTree.prototype.insert = function(key) {
  var newNode = new Node(key);
  if (this.root === null) this.root = newNode;
  else this._insertNode(this.root, newNode);
};

// Traversal helpers
BinarySearchTree.prototype._inOrderTraverseNode = function(node, cb) {
  if (node !== null) {
    this._inOrderTraverseNode(node.left, cb);
    cb(node.key);
    this._inOrderTraverseNode(node.right, cb);
  }
};

BinarySearchTree.prototype._preOrderTraverseNode = function(node, cb) {
  if (node !== null) {
    cb(node.key);
    this._preOrderTraverseNode(node.left, cb);
    this._preOrderTraverseNode(node.right, cb);
  }
};

BinarySearchTree.prototype._postOrderTraverseNode = function(node, cb) {
  if (node !== null) {
    this._postOrderTraverseNode(node.left, cb);
    this._postOrderTraverseNode(node.right, cb);
    cb(node.key);
  }
};

// Public traversal methods
BinarySearchTree.prototype.inOrderTraverse = function(cb) {
  this._inOrderTraverseNode(this.root, cb);
};

BinarySearchTree.prototype.preOrderTraverse = function(cb) {
  this._preOrderTraverseNode(this.root, cb);
};

BinarySearchTree.prototype.postOrderTraverse = function(cb) {
  this._postOrderTraverseNode(this.root, cb);
};

// Min / Max / Search
BinarySearchTree.prototype._minNode = function(node) {
  if (!node) return null;
  while (node.left !== null) node = node.left;
  return node;
};

BinarySearchTree.prototype._maxNode = function(node) {
  if (!node) return null;
  while (node.right !== null) node = node.right;
  return node;
};

BinarySearchTree.prototype._searchNode = function(node, key) {
  if (node === null) return false;
  if (key < node.key) return this._searchNode(node.left, key);
  if (key > node.key) return this._searchNode(node.right, key);
  return true;
};

BinarySearchTree.prototype.min = function() {
  var node = this._minNode(this.root);
  return node ? node.key : null;
};

BinarySearchTree.prototype.max = function() {
  var node = this._maxNode(this.root);
  return node ? node.key : null;
};

BinarySearchTree.prototype.search = function(key) {
  return this._searchNode(this.root, key);
};

// Print tree
BinarySearchTree.prototype.print = function() {
  function p(node) {
    if (node) {
      console.log(
        (node.left ? node.left.key : "None") +
        " <-- " + node.key + " --> " +
        (node.right ? node.right.key : "None")
      );
      p(node.left);
      p(node.right);
    }
  }
  console.log("=== tree ===");
  p(this.root);
  console.log("============");
};

// Print function for traversals
function printNode(v) {
  console.log(v);
}


// Build sample tree

var tree = new BinarySearchTree();
[11,7,15,5,3,9,8,10,13,12,14,20,18,25,6].forEach(v => tree.insert(v));

console.log("Original tree:");
tree.print();

console.log("In-order:");
tree.inOrderTraverse(printNode);

console.log("Pre-order:");
tree.preOrderTraverse(printNode);

console.log("Post-order:");
tree.postOrderTraverse(printNode);

console.log("Min:", tree.min());
console.log("Max:", tree.max());
console.log("Search 13:", tree.search(13));
console.log("Search 4:", tree.search(4));


// Balanced tree copy

var sorted = [];
tree.inOrderTraverse(v => sorted.push(v));
console.log("Sorted keys:", sorted);

function buildBalancedTree(arr) {
  var t = new BinarySearchTree();
  function insertMid(start, end) {
    if (start > end) return;
    var mid = Math.floor((start+end)/2);
    t.insert(arr[mid]);
    insertMid(start, mid-1);
    insertMid(mid+1, end);
  }
  insertMid(0, arr.length - 1);
  return t;
}

var balancedTree = buildBalancedTree(sorted);
console.log("Balanced tree:");
balancedTree.print();


// Graph (prototype)

function Graph() {
  this.vertices = [];
  this.adjList = {};
}

Graph.prototype.addVertex = function(v) {
  this.vertices.push(v);
  this.adjList[v] = [];
};

Graph.prototype.addEdge = function(v, w) {
  this.adjList[v].push(w);
  this.adjList[w].push(v);
};

Graph.prototype.toString = function() {
  var s = "";
  this.vertices.forEach(v => {
    s += v + " -> " + this.adjList[v].join(" ") + "\n";
  });
  return s;
};

// Test graph
console.log("Graph test:");
var g = new Graph();
["A","B","C","D","E","F"].forEach(v => g.addVertex(v));

g.addEdge("A","B");
g.addEdge("A","C");
g.addEdge("A","D");
g.addEdge("B","E");
g.addEdge("C","D");
g.addEdge("C","E");
g.addEdge("D","E");
g.addEdge("D","F");
g.addEdge("E","F");

console.log(g.toString());


// Prim's Algorithm

function minKey(key, visited) {
  var min = Infinity;
  var idx = -1;
  for (var i = 0; i < key.length; i++) {
    if (!visited[i] && key[i] < min) {
      min = key[i]; idx = i;
    }
  }
  return idx;
}

function prim(matrix) {
  var n = matrix.length;
  var parent = [];
  var key = [];
  var visited = [];

  for (var i = 0; i < n; i++) {
    key[i] = Infinity;
    visited[i] = false;
  }

  key[0] = 0;
  parent[0] = -1;

  for (var c = 0; c < n - 1; c++) {
    var u = minKey(key, visited);
    visited[u] = true;

    for (var v = 0; v < n; v++) {
      if (matrix[u][v] && !visited[v] && matrix[u][v] < key[v]) {
        parent[v] = u;
        key[v] = matrix[u][v];
      }
    }
  }

  return { parent, key };
}

// Test Prim
var wGraph = [
  [0,2,4,0,0,0],
  [2,0,1,4,2,0],
  [4,1,0,0,3,0],
  [0,4,0,0,3,2],
  [0,2,3,3,0,2],
  [0,0,0,2,2,0]
];

console.log("Prim MST:");
var mst = prim(wGraph);
console.log(mst);

console.log("Edges:");
for (var i = 1; i < mst.parent.length; i++) {
  console.log(mst.parent[i], "-", i, "weight:", wGraph[i][mst.parent[i]]);
}
