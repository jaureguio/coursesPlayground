/* 05. COMPOSITION */

/* FP utility functions */

// Test Functions
function output(val) {
  console.log('Output val:', val)
}

function sum(x,y) { return x + y };
function substract(x,y) { return x - y };
function divide(x,y) { return x/y };
function multiply(x,y) { return x*y };

var sum5 = partial(sum,5);
var divideBy5 = partialRight(divide,5);


// COMPOSE

function compose(...fns) {
  return function composed(result) {
    // copying the fns array is necessary in order to make composed() reusable in further invocations
    fns = [...fns];
    while(fns.length) {
      result = fns.pop()(result);
    }
    return result;
  }
}

// Eager implementation with reduce
function compose(...fns) {
  console.log(fns)
  return function composed(...values) {
    return fns.reverse().reduce(function composeReduce(fn1,fn2) {
      console.log(fn2,fn1)
      return fn2(fn1(...values));
    })
  }
}

// Lazy implementation with reduce
function compose(...fns) {
  return fns.reverse().reduce(function composeReduce(fn1,fn2) {
    return function wrapperFn(...values) {
      return fn2(fn1(...values));
    }
  })
}

// PARTIAL
function partial(fn, ...firstArgs) {
  return function partialFn(...restArgs) {
    return fn(...firstArgs,...restArgs);
  }
}

function partialRight(fn,...firstArgs) {
  return function partialFn(...restArgs) {
    firstArgs = [...firstArgs].reverse();
    restArgs = [...restArgs].reverse();
    return fn(...restArgs,...firstArgs);
  }
}


/*
####################### 
  Composition Lecture
####################### 
*/

/* Point-Free refactoring */

// HELPERS

function ajaxOrder(url,data,cb) {
  return cb(order);
}
function ajaxPerson(url,data,cb) {
  return cb(person);
}
var order = { personId: 1234 };
var person = { name: "Oscar Jauregui" };

var getPerson = partial( ajaxPerson, "http://some.api/person" );
var getLastOrder = partial( ajaxOrder, "http://some.api/order", { id: -1 } );

/* 
- 'order' and 'person' parameter references is what we would like to remove.

getLastOrder( function orderFound(order){
  getPerson( { id: order.personId }, function personFound(person){
    output( person.name );
  } );
} ) 
*/

/* 
Abstracting 'person' point reference:
*/

// Making a function to extract a property from an object
function prop(key,obj) {
  return obj[key];
}

// Extracting the 'name' property from a given obj
var extractName = partial(prop,'name');
// outputting the property to be extracted
var outputPersonName = compose(output,extractName);
// partially applying outputPersonName argument to getPerson
var processPerson = partialRight(getPerson, outputPersonName);

/*
- getLastOrder with the 'person'point extracted:
getLastOrder( function orderFound(order){
  processPerson( { id: order.personId })
} )
*/

/*
Abstracting 'order' point reference:
*/

function setProp(key,val) {
  return { [key]: val };
}

var setPersonId = partial(setProp, 'id');
var extractPersonId = partial(prop, 'personId');
var personData = compose(setPersonId, extractPersonId);
var lookupPerson = compose(processPerson, personData);

/*
Point-Free refactoring completed!
*/
getLastOrder(lookupPerson);

/* 08. RECURSION */

function isPrime(num, divisor = 2) {
  // Base condition: 0 and 1 are not primes by convention. 2 is the only even prime number, that's why it is excluded from the condition checking
  if(num < 2 || (num > 2 && num % divisor == 0)) {
    return false;
  }
  // We are saving work here. The idea is to mod-check num with every possible divisor, in a efficent way (is not necessary to check for divisor greater than the root of the number checked)
  if(divisor <= Math.sqrt(num)) {
    return isPrime(num, divisor+1)
  }
  return true;
}

/* Mutual recursion */

function isOdd(v) {
  if(v === 0) return false;
  return isEven(Math.abs(v)-1);
}
function isEven(v) {
  if(v === 0) return true;
  return isOdd(Math.abs(v)-1);
}

// Mutually recursive fib sequence: WHAT?????????????????????
function fib_(n) {
  if(n == 1) return 1;
  else return fib(n-2);
}
function fib(n) {
  if(n == 0) return 0;
  else return fib(n-1) + fib_(n)
}

/* ... */
// Imperative approach (looping)
function sumIterative(total = 0,...nums) {
  // let total = 0;

  for(let num of nums) {
    total += num;
  }
  return total
}
// Declarative/Recursive approach
function sumRecursive(num1,...nums) {
  if(!nums.length) return num1;
  return num1 + sumRecursive(...nums)
}

function maxEvenIterative(...nums) {
  let maxEven = -Infinity;
  for(let num of nums) {
    if(num%2==0 && num > maxEven) maxEven = num;
  }
  return maxEven == -infinity ? undefined : maxEven;
}
function maxEvenRecursive(num, ...nums) {
  const maxRest = nums.length ? maxEven(...nums) : null
  if(num % 2 == 0 && num > maxRest) return num;
  else return maxRest;
}

// PTC (Proper Tail Calls): implies that previous stack frame can be complety disgarded after dispatching the next recursive call, freeing up the call stack memory and avoiding call stack errors

// #########
// PROPER TAIL CALLS ONLY WORKS WITH "use strict" MODE!
// #########

"use strict"
function sumPTC(total,num1, ...nums) {
  total += num1;
  if(!nums.length) return total;
  return sumPTC(total, ...nums);
}

/* 
function sumPTC(num1,num2,...nums) {
  num1 += num2;
  if(!nums.length) return num1;
  return sumPTC(num1, ...nums);
} 
 */

//  TRAMPOLINES

function trampoline(fn) {
  return function trampolined(...args) {
    var result = fn(...args);
    while(typeof result == 'function') {
      result = result();
    }
    return result
  }
}

function sumWrapped(num1, num2, ...nums) {
  num1 += num2
  if(!nums.length) return num1;
  return function wrapper() { // THE TRICK HAPPENS HERE! WE RETURN A FUNCTION DEF WRAPPING THE RECURSIVE CALL TO THE OUTER FUNCTION
    return sumWrapped(num1, ...nums)
  }
}
arr = []
for(let i = 0; i<20000; i++) {
  arr.push(i)
}

sum = trampoline(sumWrapped)
console.log(sum(...arr)) // 199990000
console.log(sumPTC(...arr)) // Thrown: RangeError: Maximun call stack size exceeded