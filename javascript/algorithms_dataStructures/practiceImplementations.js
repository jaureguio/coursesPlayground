function merge(arr1, arr2) {
  let results = [];
  let i = 0;
  let j = 0;
  while(i < arr1.length && j < arr2.length) {
    if(arr2[j] > arr1[i]) {
      results.push(arr1[i]);
      i++;
    } else {
      results.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    results.push(arr1[i]);
    i++
  }
  while (j < arr2.length) {
    results.push(arr2[j]);
    j++
  }
  return results;
}

// console.log(merge([1,10,50], [2,14,99,100]))




// Pivot Helper Implementation

var testArr = [54,23,4,0,9,11,21,-2,-5,16,13,2,8]

function pivot(arr, start = 0, end = arr.length - 1) {
  const pivotVal = arr[start];
  var pivotIdx = start;
  for(let i = start + 1; i <= end; i++) {
    if (pivotVal >= arr[i]) {
      pivotIdx++;
      [arr[i], arr[pivotIdx]] = [arr[pivotIdx], arr[i]];
    }
  }
  [arr[pivotIdx], arr[start]] = [arr[start], arr[pivotIdx]];
  return pivotIdx;
}

// console.log(pivot(testArr), testArr)

// Quicksort Implementation

function quickSort(arr, start = 0, end = arr.length -1) {
  if (start >= end) return;
  var pivotIdx = pivot(arr, start, end);
  quickSort(arr, start, pivotIdx - 1);
  quickSort(arr, pivotIdx+1, end);
  return arr;
}

// console.log(quickSort(testArr))


// Radix helpers

function getDigit(num, digitPos) {
  return Math.floor(Math.abs(num)/Math.pow(10,digitPos)) % 10;
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(numArr) {
  var mostDigits = 0;
  numArr.forEach(function digitChecker(num) {
    mostDigits = Math.max(digitCount(num), mostDigits);
  })
  return mostDigits;
}



// console.log(mostDigits([12,1,34,233]));

// Radix implementation

function radixSort(nums) {
  var largestDigitCount = mostDigits(nums);
  for(var i = 0; i < largestDigitCount; i++) {
    
    /* My implementation of buckets creation and filling
    var buckets = [0,1,2,3,4,5,6,7,8,9].reduce(function bucketCreator(buckets, digit) {
      buckets[digit] = []
      return buckets
    },{});
    
    nums.forEach(function inBucketsLocator(num) {
      buckets[getDigit(num, i)].push(num);
    })
    */
    
    /* My implementation of in-place list sorting (based on the assumption the array passed should be modified in-place)
    var count = 0;
    Object.values(buckets).forEach(function bucketPicker(bucket) {
      bucket.forEach(function numsSorter(bucketItem) {
        nums[count] = bucketItem;
        count++;
      })
    });
    */

    var digitBuckets = Array.from({length: 10}, () => []);
    
    nums.forEach(function inBucketsLocator(num) {
      var digit = getDigit(num, i)
      digitBuckets[digit].push(num);
    })
    console.log(digitBuckets)
    
  
   
    // this implementation reassign a new array with each iteration
    nums = [].concat(...digitBuckets);
  }
  return nums;
}

testArr2 = [5, 111, 21, 7, 30, 12, 1, 34, 233, 29, 2]

console.log(radixSort(testArr2));
