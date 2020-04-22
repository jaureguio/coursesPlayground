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
