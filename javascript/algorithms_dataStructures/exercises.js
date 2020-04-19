// HELPERS
// Frequency Counter Approach
function frequencyCounter(iterable) {
  if(!Array.isArray(iterable) && typeof(iterable) !== 'string') {
    if(typeof(iterable) === 'number') {
      iterable = iterable.toString()
    } else {
      return 'Unsupported DS!'
    }
  }
  const frequencies = {};
  for(let i of iterable) {
    frequencies[i] = (frequencies[i] || 0) + 1;
  }
  return frequencies;
}

/* FREQUENCY COUNTER */

function sameFrequency(num1, num2) {
  strNum1 = num1.toString()
  strNum2 = num2.toString()
  if(strNum1.length !== strNum2.length) {
    return false;
  }
  const num1Freq = frequencyCounter(strNum1)
  const num2Freq = frequencyCounter(strNum2)
  for(let key in num1Freq) {
    if(num1Freq[key] !== num2Freq[key]) return false;
  }
  return true;
}
// Course's solution
// function sameFrequency(num1, num2) {
//   let strNum1 = num1.toString();
//   let strNum2 = num2.toString();
//   if(strNum1.length !== strNum2.length) return false;
//   let countNum1 = {};
//   let countNum2 = {};
//   for(let i = 0; i < strNum1.length; i++){
//     countNum1[strNum1[i]] = (countNum1[strNum1[i]] || 0) + 1
//   }
//   for(let j = 0; j < strNum1.length; j++){
//     countNum2[strNum2[j]] = (countNum2[strNum2[j]] || 0) + 1
//   }
//   for(let key in countNum1){
//     if(countNum1[key] !== countNum2[key]) return false;
//   }
//   return true;
// }
// console.log(sameFrequency(23425,54322)) // true

function areThereDuplicates(...args) {
  const argsFreq = frequencyCounter(args);
  for(let arg in argsFreq) {
    if(argsFreq[arg] > 1) return true;
  }
  return false;
}
// Courses's solution
// function areThereDuplicates() {
//   let collection = {}
//   for(let val in arguments){
//     collection[arguments[val]] = (collection[arguments[val]] || 0) + 1
//   }
//   for(let key in collection){
//     if(collection[key] > 1) return true
//   }
//   return false;
// }

/* MULTIPLE POINTERS */

function areThereDuplicates(...args) {
  const sortedArgs = args.sort();
  // Explicitly declaring pointers
  let pointer1;
  let pointer2;
  for(let idx=0; idx<sortedArgs.length-1; idx++) {
    pointer1 = idx;
    pointer2 = idx +1;
    if(sortedArgs[pointer1] === sortedArgs[pointer2]) return true;
  }
  return false;
}
// Course's Solution
// function areThereDuplicates(...args) {
//   // Two pointers
//   args.sort((a,b) => a > b);
//   let start = 0;
//   let next = 1;
//   while(next < args.length){
//     if(args[start] === args[next]){
//         return true
//     }
//     start++
//     next++
//   }
//   return false;
// }

/* One-liner solution */
function areThereDuplicatesOneLiner(...args) {
  return new Set(args).size !== args.length;
}

// This implementation assumes the list provided is not sorted entirely
function averagePair(arr,num) {
  arr.sort(); 
  let start = 0;
  let end = arr.length-1;
  let avg;
  while(start < end) {
    avg = (arr[start]+arr[end])/2
    if(avg > num) {
      end--;
    } else if (avg < num) {
      start++;
    } else {
      return true;
    }
  }
  return false;
}

// Course's Solution
// function averagePair(arr, num){
//   let start = 0
//   let end = arr.length-1;
//   while(start < end){
//     let avg = (arr[start]+arr[end]) / 2 
//     if(avg === num) return true;
//     else if(avg < num) start++
//     else end--
//   }
//   return false;
// }

function isSubsequence(str1,str2) {
  if(!str1) return true;
  let i = 0;
  let j = 0;
  for(let s of str2) {
    if(str1[i] === s) i++;
    if(i === str1.length) return true;
  }
  return false;
}
// Course's Solution
// function isSubsequence(str1, str2) {
//   var i = 0;
//   var j = 0;
//   if (!str1) return true;
//   while (j < str2.length) {
//     if (str2[j] === str1[i]) i++;
//     if (i === str1.length) return true;
//     j++;
//   }
//   return false;
// }

function isSubsequenceRecursive(str1,str2) {
  if(!str1) return true;
  if(!str2) return false;
  if(str1[0] === str2[0]) return isSubsequenceRecursive(str1.slice(1),str2.slice(1));
  return isSubsequenceRecursive(str1,str2.slice(1));
}
// Course's Solution
// function isSubsequenceRecursive(str1, str2) {
//   if(str1.length === 0) return true
//   if(str2.length === 0) return false
//   if(str2[0] === str1[0]) return isSubsequence(str1.slice(1), str2.slice(1))  
//   return isSubsequence(str1, str2.slice(1))
// }

/* SLIDING WINDOW */

function maxSubArraySum(arr,num) {
  if(!arr.length) return null;
  let window = 0;
  let max = 0;
  // Initializing the window
  for(let i=0; i<num; i++) {
    window += arr[i];
  }
  // Window sliding
  for(let j=0; j<arr.length-num; j++) {
    window += arr[j+num] - arr[j]
    max = Math.max(window,max);
  }
  return max;
}
// Course's solution
// function maxSubArraySum(arr, num){
//   if (arr.length < num) return null;
//   let total = 0;
//   for (let i=0; i<num; i++){
//      total += arr[i];
//   }
//   let currentTotal = total;
//   for (let i = num; i < arr.length; i++) {
//      currentTotal += arr[i] - arr[i-num];
//      total = Math.max(total, currentTotal);
//   }
//   return total;
// }

function minSubArrayLen(nums, sum) {
/* 


  UNSUCCESSFUL SOLUTION, CHECK AGAIN!!!!!


  0. Take care of edge cases.
  1. initialize variables to track results (minLen, total, start, end).
    - minLen = Infinity
    - total, start and end = 0
  2. Create a loop; while end is less than nums length:
    - if total is less than sum, add to it the value at end index. increase end by 1 (i.e. increase the window).
    - if total is greater or equal than sum:
      - assign the min value between current minLen and window to minLen.
      - substract nums's value at start index. Increase start by 1 (i.e. decrease the window).
    - 
  3. return if minLen is Infinty: null/0 else minLen.
*/
  if(!nums.length) return null;
  if(nums[0] >= sum) return 1;
  let minLen = Infinity;
  let [start,end,total] = [0,0,0];
  while(end <= nums.length ) {
    if(total < sum) {
      total += nums[end];
      end++;
    } else {
      minLen = Math.min(minLen, end-start);
      total -= nums[start];
      start++;
    }
  }
  return minLen === Infinity ? 0 : minLen;
}
// Course's solution
// function minSubArrayLenSol(nums, sum) {
//   let total = 0;
//   let start = 0;
//   let end = 0;
//   let minLen = Infinity;

//   while (start < nums.length) {
//     // if current window doesn't add up to the given sum then 
// 		// move the window to right
//     if(total < sum && end < nums.length){
//       total += nums[end];
// 			end++;
//     }
//     // if current window adds up to at least the sum given then
// 		// we can shrink the window 
//     else if(total >= sum){
//       minLen = Math.min(minLen, end-start);
// 			total -= nums[start];
// 			start++;
//     } 
//     // current total less than required total but we reach the end, need this or else we'll be in an infinite loop 
//     else {
//       break;
//     }
//   }

//   return minLen === Infinity ? 0 : minLen;
// }

function findLongestSubstring(str) {
  /* 
  The goal is to find the longest substring of unrepeated characters in a given string.
  - Pseudocode:
    1. Define variables to keep track the state of the solution:
      - maxLen, numeric variable to store the length of longest substring found. Default to 0.
      - currentLen, numeric variable to count the length of current substring without repetition.
      - letters, an object to store each letter with its index position in the string. Default to {}.
      - idx, numeric variable to keep track of position while iterating over the string. Default to 0.
    2. Enter a loop; while idx is less than string length:
      - If letter at string[idx] not in letters:
        - Add a key-value pair to letters with letter as key and idx as value.
        - Increase idx and currentLen by 1.
      - Otherwise:
        - reassing idx to index after first occurence of repeated letter (idx = string[letter]+1).
        - reassing letters to empty object {}.
        - if currentLen greater than maxLen then make maxLen = currentLen.
        - Reset currentLen.
        3. Return maxLen.    
  */
  let [maxLen,currentLen,idx] = [0,0,0];
  let letters = {};
  let s;
  while(idx<str.length) {
    s = str[idx]
    if(!letters[s]) {
      letters[s] = idx;
      idx += 1;
      currentLen += 1;
      if(currentLen > maxLen) maxLen = currentLen;
    } else {
      idx = letters[s] + 1
      letters = {};
      currentLen = 0;
    }
  }
  return maxLen
}
/* Should refactor solution to be more 'sliding window'-ish */

// Course's solution
// function findLongestSubstringSol(str) {
//   let longest = 0;
//   let seen = {};
//   let start = 0;

//   for (let i = 0; i < str.length; i++) {
//     let char = str[i];
//     if (seen[char]) {
//       start = Math.max(start, seen[char]);
//     }
//     // index - beginning of substring + 1 (to include current in count)
//     longest = Math.max(longest, i - start + 1);
//     // store the index of the next char so as to not double count
//     seen[char] = i + 1;
//   }
//   return longest;
// }

/* RECURSION */

function power(base, exponent) {
  if(exponent === 0) return 1;
  return base * power(base, exponent-1)
}

function factorial(num, acc = 1) {
  if(num < 0) return 0;
  if(num <= 1) return acc;
  return factorial(num-1, acc*num)
}

function productOfArray(arr, acc = 1) {
  if(arr.length === 0) return acc;
  return productOfArray(arr.slice(1), acc*arr[0])
}

function recursiveRange(num, acc = 0) {
  if(num <= 0) return acc;
  return recursiveRange(num-1, acc+num)
}

function recursiveRangeSol(x){
  if (x === 0 ) return 0;
  return x + recursiveRange(x-1);
}

function memoFib(num, memo = [undefined,1,1]) {
  if(num <= 0) return null;
  if(!memo[num]) memo[num] = memoFib(num-1,memo) + memoFib(num-2,memo);
  return memo[num];
}
// Course's Solution
function fibSol(num) {
  if(num<=0) return null;
  if(num<=2) return 1; 
  return fibSol(num-1) + fibSol(num-2);
}

console.log(memoFib(40))
// console.log(fibSol(40))