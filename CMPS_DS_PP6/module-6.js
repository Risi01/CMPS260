console.log("Module 6 Project Loaded");

// ArrayList using PROTOTYPE

function ArrayList() {
  this.array = [];
}

// Insert
ArrayList.prototype.insert = function(item) {
  this.array.push(item);
};

// Swap
ArrayList.prototype.swap = function(i1, i2) {
  var t = this.array[i1];
  this.array[i1] = this.array[i2];
  this.array[i2] = t;
};

// To string
ArrayList.prototype.toString = function() {
  return this.array.join(", ");
};


// createNonSortedRandomArray()

function createNonSortedRandomArray(size) {
  var temp = [];

  // Fill 1..size
  for (var i = 1; i <= size; i++) {
    temp.push(i);
  }

  // Fisher-Yates shuffle
  for (var j = temp.length - 1; j > 0; j--) {
    var rand = Math.floor(Math.random() * (j + 1));
    var tmp = temp[j];
    temp[j] = temp[rand];
    temp[rand] = tmp;
  }

  // Load into ArrayList
  var list = new ArrayList();
  for (var k = 0; k < temp.length; k++) {
    list.insert(temp[k]);
  }
  return list;
}


// QUICK SORT

ArrayList.prototype._partition = function(arr, left, right) {
  var pivot = arr[Math.floor((left + right) / 2)];
  var i = left;
  var j = right;

  while (i <= j) {
    while (arr[i] < pivot) i++;
    while (arr[j] > pivot) j--;
    if (i <= j) {
      this.swap(i, j);
      i++;
      j--;
    }
  }
  return i;
};

ArrayList.prototype._quick = function(arr, left, right) {
  if (arr.length > 1) {
    var index = this._partition(arr, left, right);
    if (left < index - 1) this._quick(arr, left, index - 1);
    if (index < right) this._quick(arr, index, right);
  }
};

ArrayList.prototype.quickSort = function() {
  if (this.array.length > 1) {
    this._quick(this.array, 0, this.array.length - 1);
  }
};


// Searching

ArrayList.prototype.sequentialSearch = function(item) {
  for (var i = 0; i < this.array.length; i++) {
    if (this.array[i] === item) return i;
  }
  return -1;
};

ArrayList.prototype.binarySearch = function(item) {
  var low = 0;
  var high = this.array.length - 1;

  while (low <= high) {
    var mid = Math.floor((low + high) / 2);
    var value = this.array[mid];

    if (value < item) low = mid + 1;
    else if (value > item) high = mid - 1;
    else return mid;
  }
  return -1;
};


// Tests (numbers)

console.log("=== QUICK SORT TEST ===");
var list = createNonSortedRandomArray(10);
console.log("Original:", list.toString());
list.quickSort();
console.log("Sorted:  ", list.toString());

console.log("Sequential search 5 →", list.sequentialSearch(5));
console.log("Binary search 5 →", list.binarySearch(5));
console.log("Binary search 999 →", list.binarySearch(999));


// BILL OF RIGHTS SEARCHING

var text = "Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances. A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed. No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law. The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated, and no Warrants shall issue, but upon probable cause, supported by Oath or affirmation, and particularly describing the place to be searched, and the persons or things to be seized. No person shall be held to answer for a capital, or otherwise infamous crime, unless on a presentment or indictment of a Grand Jury, except in cases arising in the land or naval forces, or in the Militia, when in actual service in time of War or public danger; nor shall any person be subject for the same offence to be twice put in jeopardy of life or limb; nor shall be compelled in any criminal case to be a witness against himself, nor be deprived of life, liberty, or property, without due process of law; nor shall private property be taken for public use, without just compensation. In all criminal prosecutions, the accused shall enjoy the right to a speedy and public trial, by an impartial jury of the State and district wherein the crime shall have been committed, which district shall have been previously ascertained by law, and to be informed of the nature and cause of the accusation; to be confronted with the witnesses against him; to have compulsory process for obtaining witnesses in his favor, and to have the Assistance of Counsel for his defence. In Suits at common law, where the value in controversy shall exceed twenty dollars, the right of trial by jury shall be preserved, and no fact tried by a jury, shall be otherwise re-examined in any Court of the United States, than according to the rules of the common law. Excessive bail shall not be required, nor excessive fines imposed, nor cruel and unusual punishments inflicted. The enumeration in the Constitution, of certain rights, shall not be construed to deny or disparage others retained by the people. The powers not delegated to the United States by the Constitution, nor prohibited by it to the States, are reserved to the States respectively, or to the people.";

text = text.toLowerCase().replace(/[.,;]/g, "");
var words = text.split(" ");

var wordsList = new ArrayList();
for (var i = 0; i < words.length; i++) {
  wordsList.insert(words[i]);
}

wordsList.quickSort();

function contains(word) {
  return wordsList.binarySearch(word) !== -1;
}

console.log("=== BILL OF RIGHTS CHECKS ===");
console.log("president →", contains("president"));
console.log("state →", contains("state"));
console.log("country →", contains("country"));
