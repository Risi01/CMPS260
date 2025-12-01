console.log("Module 6 Assignment Loaded");

// ArrayList (no prototype)

function ArrayList() {
  var array = [];

  function swap(i1, i2) {
    var temp = array[i1];
    array[i1] = array[i2];
    array[i2] = temp;
  }

  // Insert values
  this.insert = function(item) {
    array.push(item);
  };

  // Output as string
  this.toString = function() {
    return array.join(", ");
  };


  // Bubble Sort

  this.bubbleSort = function() {
    var length = array.length;
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < length - 1 - i; j++) {
        if (array[j] > array[j + 1]) {
          swap(j, j + 1);
        }
      }
    }
  };


  // Selection Sort

  this.selectionSort = function() {
    var length = array.length;
    for (var i = 0; i < length - 1; i++) {
      var minIndex = i;
      for (var j = i + 1; j < length; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        swap(i, minIndex);
      }
    }
  };


  // Sequential Search

  this.sequentialSearch = function(item) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === item) return i;
    }
    return -1;
  };

  this.getArray = function() {
    return array;
  };
}


// Create Non-Sorted Array

function createNonSortedArray(size) {
  var list = new ArrayList();
  for (var i = size; i > 0; i--) {
    list.insert(i);  // descending = guaranteed unsorted
  }
  return list;
}


// Tests

// Bubble Sort Test
console.log("=== Bubble Sort Test ===");
var bubbleList = createNonSortedArray(10);
console.log("Before:", bubbleList.toString());
bubbleList.bubbleSort();
console.log("After:", bubbleList.toString());

// Selection Sort Test
console.log("=== Selection Sort Test ===");
var selectionList = createNonSortedArray(10);
console.log("Before:", selectionList.toString());
selectionList.selectionSort();
console.log("After:", selectionList.toString());

// Sequential Search Test
console.log("=== Sequential Search Test ===");
var searchList = createNonSortedArray(10);
console.log("Array:", searchList.toString());
console.log("Search for 5 →", searchList.sequentialSearch(5));
console.log("Search for 20 →", searchList.sequentialSearch(20));
