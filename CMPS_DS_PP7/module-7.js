// Project //
console.log("Project");

// 1. Recursive factorial
function factorial(n) {
  if (n < 0) return null;
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

// Test factorial
console.log("Factorial tests:");
for (var i = 0; i <= 10; i++) {
  console.log("factorial(" + i + ") = " + factorial(i));
}


// 2. Fibonacci sequence in an array
function fibonacciSequence(n) {
  if (n < 0) return [];
  if (n === 0) return [0];

  var result = [0, 1];
  for (var i = 2; i <= n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }
  return result;
}

// Test fibonacciSequence
console.log("\nFibonacci sequence tests:");
console.log("fibonacciSequence(0):", fibonacciSequence(0));
console.log("fibonacciSequence(1):", fibonacciSequence(1));
console.log("fibonacciSequence(7):", fibonacciSequence(7));
console.log("fibonacciSequence(10):", fibonacciSequence(10));


// 3. Longest Common Subsequence (Dynamic Programming)
function longestCommonSubsequence(a, b) {
  var m = a.length;
  var n = b.length;

  var dp = new Array(m + 1);
  for (var i = 0; i <= m; i++) {
    dp[i] = new Array(n + 1).fill(0);
  }

  for (var i2 = 1; i2 <= m; i2++) {
    for (var j2 = 1; j2 <= n; j2++) {
      if (a.charAt(i2 - 1) === b.charAt(j2 - 1)) {
        dp[i2][j2] = dp[i2 - 1][j2 - 1] + 1;
      } else {
        dp[i2][j2] = Math.max(dp[i2 - 1][j2], dp[i2][j2 - 1]);
      }
    }
  }

  var i3 = m;
  var j3 = n;
  var lcsChars = [];

  while (i3 > 0 && j3 > 0) {
    if (a.charAt(i3 - 1) === b.charAt(j3 - 1)) {
      lcsChars.unshift(a.charAt(i3 - 1));
      i3--;
      j3--;
    } else if (dp[i3 - 1][j3] >= dp[i3][j3 - 1]) {
      i3--;
    } else {
      j3--;
    }
  }

  return lcsChars.join("");
}

// Test LCS
console.log("\nLCS tests:");
var s1 = "ABCBDAB";
var s2 = "BDCAB";
console.log("LCS of", s1, "and", s2, "=", longestCommonSubsequence(s1, s2));

var s3 = "XMJYAUZ";
var s4 = "MZJAWXU";
console.log("LCS of", s3, "and", s4, "=", longestCommonSubsequence(s3, s4));


// 4. Sum using imperative style
function sumImperative(arr) {
  var total = 0;
  for (var i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}


// 5. Sum using functional style
function sumFunctional(arr) {
  return arr.reduce(function (acc, value) {
    return acc + value;
  }, 0);
}

// Test sums
console.log("\nSum tests:");
var nums = [1, 2, 3, 4, 5, 10];
console.log("Array:", nums);
console.log("sumImperative:", sumImperative(nums));
console.log("sumFunctional:", sumFunctional(nums));


// 6. Project Euler #14 — Collatz
function collatzLength(n, cache) {
  if (n === 1) return 1;
  if (cache[n]) return cache[n];

  var next = (n % 2 === 0) ? n / 2 : 3 * n + 1;
  var length = 1 + collatzLength(next, cache);
  cache[n] = length;
  return length;
}

function longestCollatz(limit) {
  var cache = {};
  var maxLength = 0;
  var bestStart = 1;

  for (var i = 1; i < limit; i++) {
    var length = collatzLength(i, cache);
    if (length > maxLength) {
      maxLength = length;
      bestStart = i;
    }
  }

  return {
    start: bestStart,
    length: maxLength
  };
}

// Test with smaller limit first
console.log("\nCollatz / Project Euler 14 tests:");
var smallLimit = 100000;
var smallResult = longestCollatz(smallLimit);
console.log("Longest Collatz chain under", smallLimit,
            "starts at", smallResult.start,
            "with length", smallResult.length);

// Full test (1,000,000)
var fullLimit = 1000000;
var fullResult = longestCollatz(fullLimit);
console.log("Longest Collatz chain under", fullLimit,
            "starts at", fullResult.start,
            "with length", fullResult.length);

