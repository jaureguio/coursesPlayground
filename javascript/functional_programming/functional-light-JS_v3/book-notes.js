/* Regular Expressions examples 

function getTime(str) {
  let time = /(\b\d{1,2}\b)-(\b\d{1,2}\b)-(\b\d{4}\b)/.exec(str)
  console.log(time)
  let [match, day, month, year] = time
  return new Date(year, month-1, day)
}
getTime("this is the date 01-01-30000")

let stock = "1 lemon, 2 cabagges, and 101 eggs"
function minusOne(match, amount, type) {
  amount = Number(amount) - 1
  if(amount === 0) {
    amount = "no"
  } else if(amount === 1) {
    type = type.slice(0,type.length-1)
  };
  return amount + " " + type
}
stock.replace(/(\d+) (\w+)/g, minusOne)

*/

/* 03. MANAGING FUNCTION INPUTS */

function identity(v) {
  return v;
}

function constant(v) {
  return function value() {
    return v;
  };
}

function spreadArgs(fn) {
  return function sparseFn(argsArr) {
    return fn(...argsArr);
  };
}

function gatherArgs(fn) {
  return function gatherFn(...args) {
    return fn(args);
  };
}

// PARTIAL
function partial(fn, ...firstArgs) {
  return function partiallyApplied(...restArgs) {
    return fn(...firstArgs, ...restArgs);
  };
}

// ARROW VERSION
// const partial = (fn, ...presetArgs) => (...restArgs) => fn(...presetArgs, ...restArgs)

// REVERSING ARGUMENTS
function reverseArgs(fn) {
  return function argsReversed(...args) {
    return fn(args.reverse());
  };
}

// PARTIALRIGHT
function partialRight(fn, ...presetArgs) {
  return function partiallyApplied(...restArgs) {
    return fn(...restArgs, ...presetArgs);
  };
}

// CURRY
function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArgs) {
      let args = [...prevArgs, nextArgs];

      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}

// LOOSE CURRY
function looseCurry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(...nextArgs) {
      // Now more than one orgument is accepted in subsequent calls --> curry(sum,3)(1)(2,3)
      let args = [...prevArgs, ...nextArgs];
      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}

// UNCURRY
function uncurry(fn) {
  return function uncurried(...args) {
    let result = fn;
    for (let arg of args) {
      result = result(arg);
    }
    return result;
  };
}

// NAMED ARGUMENTS APPROACH

// PARTIAL PROPS
function partialProps(fn, presetPropsObj) {
  return function partiallyApplied(restPropsObj) {
    return fn(Object.assign({}, presetPropsObj, restPropsObj));
  };
}

// CURRY PROPS
function curryProps(fn, arity = fn.length) {
  return (function nextCurried(prevProps) {
    return function curriedProps(nextProps = {}) {
      // Extracting first key:val only from the nextProp object
      const [key] = Object.keys(nextProps);
      const props = { ...prevProps, [key]: nextProps[key] };

      if (Object.keys(props).length >= arity) {
        return fn(props);
      } else {
        return nextCurried(props);
      }
    };
  })({});
}

// This function would allow to pass objects to a function expecting individual arguments
function spreadArgProps(
  fn,
  propOrder = fn
    .toString()
    .replace(
      /^(?:(?:function.*\(([^]*?)\))|(?:([^\(\)]+?)\s*=>)|(?:\(([^]*?)\)\s*=>))[^]+$/,
      "$1$2$3"
    )
    .split(/\s*,\s*/)
    .map((v) => v.replace(/[=\s].*$/, ""))
) {
  return function spreadFn(argsObj) {
    return fn(...propOrder.map((k) => argsObj[k]));
  };
}

function output(txt) {
  console.log(txt);
}

function printIf(predicate, msg) {
  if (predicate(msg)) {
    output(msg);
  }
}

function isShortEnough(str) {
  return str.length <= 5;
}

function not(predicate) {
  return function negated(...args) {
    return !predicate(...args);
  };
}

const isLongEnough = not(isShortEnough);

function when(predicate, fn) {
  return function conditional(...args) {
    if (predicate(...args)) {
      return fn(...args);
    }
  };
}

// refactoring printIf with a point-free style using FP utilities
const printIfFP = uncurry(partialRight(when, output));

/* 04. COMPOSING FUNCTIONS */

// ... Continue here

// Composition Lecture example: point-Free refactoring

// HELPERS

function ajaxOrder(url, data, cb) {
  return cb(order);
}
function ajaxPerson(url, data, cb) {
  return cb(person);
}
var order = { personId: 1234 };
var person = { name: "Oscar Jauregui" };

var getPerson = partial(ajaxPerson, "http://some.api/person");
var getLastOrder = partial(ajaxOrder, "http://some.api/order", { id: -1 });

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
function prop(key, obj) {
  return obj[key];
}

// Extracting the 'name' property from a given obj
var extractName = partial(prop, "name");
// outputting the property to be extracted
var outputPersonName = compose(output, extractName);
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

function setProp(key, val) {
  return { [key]: val };
}

var setPersonId = partial(setProp, "id");
var extractPersonId = partial(prop, "personId");
var personData = compose(setPersonId, extractPersonId);
var lookupPerson = compose(processPerson, personData);

/*
Point-Free refactoring completed!
*/
getLastOrder(lookupPerson);

/* 08. RECURSION */

function isPrime(num, divisor = 2) {
  // Base condition: 0 and 1 are not primes by convention. 2 is the only even prime number, that's why it is excluded from the condition checking
  if (num < 2 || (num > 2 && num % divisor == 0)) {
    return false;
  }
  // We are saving work here. The idea is to mod-check num with every possible divisor, in a efficent way (is not necessary to check for divisor greater than the root of the number checked)
  if (divisor <= Math.sqrt(num)) {
    return isPrime(num, divisor + 1);
  }
  return true;
}

/* Mutual recursion */

function isOdd(v) {
  if (v === 0) return false;
  return isEven(Math.abs(v) - 1);
}
function isEven(v) {
  if (v === 0) return true;
  return isOdd(Math.abs(v) - 1);
}

// Mutually recursive fib sequence: WHAT?????????????????????
function fib_(n) {
  if (n == 1) return 1;
  else return fib(n - 2);
}
function fib(n) {
  if (n == 0) return 0;
  else return fib(n - 1) + fib_(n);
}

/* ... */
// Imperative approach (looping)
function sumIterative(total = 0, ...nums) {
  // let total = 0;

  for (let num of nums) {
    total += num;
  }
  return total;
}
// Declarative/Recursive approach
function sumRecursive(num1, ...nums) {
  if (!nums.length) return num1;
  return num1 + sumRecursive(...nums);
}

function maxEvenIterative(...nums) {
  let maxEven = -Infinity;
  for (let num of nums) {
    if (num % 2 == 0 && num > maxEven) maxEven = num;
  }
  return maxEven == -infinity ? undefined : maxEven;
}
function maxEvenRecursive(num, ...nums) {
  const maxRest = nums.length ? maxEven(...nums) : null;
  if (num % 2 == 0 && num > maxRest) return num;
  else return maxRest;
}

// PTC (Proper Tail Calls): implies that previous stack frame can be complety disgarded after dispatching the next recursive call, freeing up the call stack memory and avoiding call stack errors

// #########
// PROPER TAIL CALLS ONLY WORKS WITH "use strict" MODE!
// #########

("use strict");
function sumPTC(total, num1, ...nums) {
  total += num1;
  if (!nums.length) return total;
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
    while (typeof result == "function") {
      result = result();
    }
    return result;
  };
}

function sumWrapped(num1, num2, ...nums) {
  num1 += num2;
  if (!nums.length) return num1;
  return function wrapper() {
    // THE TRICK HAPPENS HERE! WE RETURN A FUNCTION DEF WRAPPING THE RECURSIVE CALL TO THE OUTER FUNCTION
    return sumWrapped(num1, ...nums);
  };
}
arr = [];
for (let i = 0; i < 20000; i++) {
  arr.push(i);
}

sum = trampoline(sumWrapped);
console.log(sum(...arr)); // 199990000
console.log(sumPTC(...arr)); // Thrown: RangeError: Maximun call stack size exceeded
