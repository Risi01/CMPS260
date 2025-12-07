// Recursion //
console.log("Recursion");

// Fibonacci using recursion
function fibonacci(n) {
  if (n < 0) return null;
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Test Fibonacci
for (var i = 0; i <= 10; i++) {
  console.log("fibonacci(" + i + ") = " + fibonacci(i));
}


// Dynamic programming //

console.log("Dynamic programming");

// Minimum coin change (DP)
function minCoinChangeDP(coins, amount) {
  var dp = new Array(amount + 1);
  var coinUsed = new Array(amount + 1);

  dp[0] = 0;
  coinUsed[0] = -1;

  for (var i = 1; i <= amount; i++) {
    dp[i] = Infinity;
    coinUsed[i] = -1;

    for (var j = 0; j < coins.length; j++) {
      var c = coins[j];
      if (c <= i && dp[i - c] + 1 < dp[i]) {
        dp[i] = dp[i - c] + 1;
        coinUsed[i] = c;
      }
    }
  }

  if (dp[amount] === Infinity) return null;

  // reconstruct solution
  var result = [];
  var current = amount;
  while (current > 0) {
    var coin = coinUsed[current];
    result.push(coin);
    current -= coin;
  }

  return result;
}

// Test DP version
var coinsDP = [1, 5, 10, 25];
var amountDP = 63;
var changeDP = minCoinChangeDP(coinsDP, amountDP);
console.log("DP change for", amountDP, "using", coinsDP, "=", changeDP,
  "number of coins:", changeDP ? changeDP.length : "no solution");


// Greedy algorithms //

console.log("Greedy algorithms");

// Greedy min coin change
function minCoinChangeGreedy(coins, amount) {
  var result = [];
  var remaining = amount;

  for (var i = 0; i < coins.length; i++) {
    var c = coins[i];
    while (remaining >= c) {
      result.push(c);
      remaining -= c;
    }
  }

  if (remaining !== 0) return null;

  return result;
}

// Test greedy version
var coinsGreedy = [25, 10, 5, 1];
var amountGreedy = 63;
var changeGreedy = minCoinChangeGreedy(coinsGreedy, amountGreedy);
console.log("Greedy change for", amountGreedy, "using", coinsGreedy, "=", changeGreedy,
  "number of coins:", changeGreedy ? changeGreedy.length : "no solution");


// Functional vs Imperative Programming   //

console.log("Introduction to functional programming");

// Imperative version
function getPositiveImperative(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      result.push(arr[i]);
    }
  }
  return result;
}

// Functional version
function getPositiveFunctional(arr) {
  return arr.filter(function(value) {
    return value > 0;
  });
}

// Test
var nums = [3, -1, 0, 5, -7, 10, -3];
console.log("Original array:", nums);
console.log("Positive (imperative):", getPositiveImperative(nums));
console.log("Positive (functional):", getPositiveFunctional(nums));
