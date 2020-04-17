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
console.log(frequencyCounter('abcdeefsaa'))

function sameFrequency(num1, num2) {
  

}

function sameFrequency(num1, num2){
  let strNum1 = num1.toString();
  let strNum2 = num2.toString();
  if(strNum1.length !== strNum2.length) return false;
  
  let countNum1 = {};
  let countNum2 = {};
  
  for(let i = 0; i < strNum1.length; i++){
    countNum1[strNum1[i]] = (countNum1[strNum1[i]] || 0) + 1
  }
  
  for(let j = 0; j < strNum1.length; j++){
    countNum2[strNum2[j]] = (countNum2[strNum2[j]] || 0) + 1
  }
  
  for(let key in countNum1){
    if(countNum1[key] !== countNum2[key]) return false;
  }

  return true;
}

console.log(sameFrequency(23425,54322)) // true

// Frequency Counter
function areThereDuplicates() {
  let collection = {}
  for(let val in arguments){
    collection[arguments[val]] = (collection[arguments[val]] || 0) + 1
  }
  for(let key in collection){
    if(collection[key] > 1) return true
  }
  return false;
}

console.log(areThereDuplicates(1,23,4,2,5,3)) // true

// Multiple Pointers
function areThereDuplicates(...args) {
  // Two pointers
  args.sort((a,b) => a > b);
  let start = 0;
  let next = 1;
  while(next < args.length){
    if(args[start] === args[next]){
        return true
    }
    start++
    next++
  }
  return false
}

// One-liner solution
function areThereDuplicates() {

}