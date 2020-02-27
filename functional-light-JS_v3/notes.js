/*

### 02. Function Purity ###

  *** Function vs Procedures ***

    ->A procedure is a collection of operations/steps that are performed in a program.
      When defining a function, the simple fact that it implements the 'function' keyword doesn't make it
      a function when we refer to it from within the context of functional programming.
*/
        // a collection of steps within a procedure. Nothing gets returned from this 'function'
        function addNumbers(x = 0, y = 0, z = 0, w = 0) {
          var total = x + y + z + w;
          console.log(total);
        }

        // This becomes a procedure although is taking direct inputs and returning something (which happens to be a procedure).
        function extraNumbers(x = 2, ...args) {
          return addNumbers(x, 40, ...args);
        }
/*
    ->Code that is written with functional principles is based upon mathematics.
    
    ->A function could be defined as the semantic relationship between some inputs and an output from the function.
    
        * A function has to take some inputs and return some output.
        * Functions uses direct inputs and direct outputs and it establishes a clear relationship between the two.
        * A function can only call other functions (not a procedure, in this case it becomes also a procedure).
*/
            function tuple(x,y) {
              return [x + 1, y - 1];
            }

            var [a,b] = tuple(...[5,10]);
/*
  *** Function Naming Semantics ***

    ->In order to keep honest with the spirit of funtional programming, a function's name has to make obvios the
      relationship of inputs to the output of it.
*/
        function shippingRate(size, weight, speed) {
          return ((size + 1) * weight) + speed;
        }
/*
  *** Side Effects ***

    ->Functions have to take direct inputs (arguments passed to parameters) and compute and return an output without assigning
      anything outside of itself in the process. It can not access anything outside of itself nor assign anything outside of itself.
*/      
        function shippingRate() {
          rate = ((size + 1) * weight) + speed; // Side effects everywhere
        }

        var rate,
        size = 12,
        weight = 4,
        speed = 5;
        shippingRate();
        rate;
/*
    ->We should avoid side effects, where possible, with the usage of function calls and not procedures.

        * In the case side effects are required to accomplish some task, we need to make them obvious to the reader of the code.

    ->Side effects can be represented as:

        * I/O (console, files, etc)
        * Database Storage
        * Network Calls
        * DOM
        * Timestamps
        * Random Numbers
        * In a theoretical sense, side effects are inevitable. Think of CPU heat produced when a function is executed
          by the cpu. Also, the CPU time delay that it is produce when a function is waiting to another one to finish 
          in order to execute its code.

    ->Suppose that we have a piece of our program that follows functional programming principles and suddenly we encounter a bug on the code base,
      chances are that the bug is allocated in the non-functional piece of our code (generally where the side effects reside).

    ->When dealing with side effects, mentally the reader would have to execute every line of code before a function to understand that line; to
      understand a given line of code the reader would've to know the state of a program was in before we ran it.

  *** Level of Confidence ***
  
    ->Determining function purity is not a matter of saying yes or no in response to it.
      We should instead articulate around the idea of determinig function purity based of if the function
      gives us a high or low level of confidence based on the way it is written.

        * Reducing a surface area means that any input used by function has as few as possible lines of code
          between input/variable declaration and its implementation.

  ***Extracting Impurity ***
    
    ->We need to try to whenever possibl extract the impurity from a function and put it in the 'outer shell'.

        * Make pure functions a have side effects around it:
*/       
            // FUNCTION WITH SIDE EFFECTS (IMPURE)
            function addComment(userID, comment) {
              var record = {
                id: uniqueID(), // Side effect
                userID,
                text: comment
              };
              var elem = buildCommentElement(record);
              commentsList.appendChild(elem); // Side effect
            }

            addComment(42, "This is my first comment!");

            // FUNTION REFORMULATED TO A PURE FUNCTION WITH THE SIDE EFFECTS EXTRACTED FROM IT
            function newComment(userID, commentID, comment) {
              var record = {
                id: commentID,
                userID,
                text: comment
              };
              return buildCommentElement(record);
            }

            // Side effects extracted here
            var commentID = uniqueID(); // commentID is now received as an argument in newComment()
            var elem = newComment(
              42,
              commentID,
              "This is my first comment!"
            );
            commentList.appendChild(elem);
/*
              * Notice that after reformulating the function, the DOM modification is done outside newComment().
                Now newComment just return the comment to be added to the DOM.

  *** Containing Impurity ***

    ->When we can't extract the impurity, we can try containing if inside the function itself. Accomplishing the task
      of structuring things so that the impurity does not affect other parts of our application has a good impact on it.
      Another way of thing about this is as finding a way of reducing the surface area of the impurity.

        * If the side effect polutes the global scope, thats bad. What if the side effect that has to happen can be contained 
          locally to affect only 5 lines of code?
*/
            var SomeAPI = {
              threshold: 13,
              isBelowThreshold(x) {
                return x <= SomeAPI.threshold;
              }
            };

            var numbers = [];

            function insertSortDesc(v) {
              SomeAPI.threshold = v; // *SIDE EFFECT*
              var idx = numbers.findIndex(SomeAPI.isBelowThreshold);
              if (idx == -1) {
                idx = numbers.length;
              }
              numbers.splice(idx, 0, v); // *SIDE EFFECT*
            }
            
            // Both SomeAPI and numbers are modified by calling insertSortDesc
            insertSortDesc(3); 
            insertSortDesc(5);
            insertSortDesc(1);
            insertSortDesc(4);
            insertSortDesc(2);
            numbers; // [ 5, 4, 3, 2, 1 ]
            
            // CONTAINING THE IMPURITY

            function getSortedNums(nums, v) {
              
              // A copy of the outer array passed is made and is actually what will be return from this  function
              var numbers = nums.slice();
              insertSortedDesc(v); // This function now will refer to the newly created numbers array copy
              return numbers;
              
              function insertSortDesc(v) { /* ... */ }
            }
            
            numbers = getSortedNums(numbers, 3);
            numbers = getSortedNums(numbers, 5);
            // ...
            numbers; // [ 5, 4, 3, 2, 1 ]
/*           
  *** Adapter Functions ***
  
    ->When we cannot wrapped a function to contain the impurity from inside of it, like in 
      the case of 'SomeAPI.threshold = v' (line 152) (SomeAPI represents a third-party provided thing
      allocated on another module, thus unavailable for us to be wrapped around), we can opt to perform
      another approach where we create an adapter function that will sit beside the impure function.

        * The purpose of the adapter function is to hold/capture on the (to be) changed state of the app and after the side
          effects have taken place (modifying state outside the function they are in), original state is 
          restored. We can summarized this approach with the following steps:
          
            1. Capture the current state that will be modified by means of side effects.
            2. Initialize the value with a copy of the state, in order to reduce the surface area of it.
            3. Call the function that produces the change in state impurely.
            4. Capture the return value from the impure function call.
            5. Restore the state of the app to its original values.
            6. Return the captured result state from the impure function call.

        * We end up containing the observabililty of the side-effect to just the adapteer function call
*/
          // var SomeAPI = ...

          var numbers = [];

          function insertSortedDesc(v) { /* ... */ }
          
          function getSortedNums(nums, v) {
            
            // Original values of the to-be changed state are captured
            var [origNumbers, origThreshold] = [numbers, SomeAPI.threshold];

            numbers = nums.slice();
            insertSortedDesc(v);
            nums = numbers;
            
            // Original values of state are restored
            [numbers, SomeAPI.threshold] = [origNumbers, origThreshold];
            
            return nums;
          }

          numbers = getSortedNums(numbers, 3);
          numbers = getSortedNums(numbers, 5);
          //...
          numbers; // [ 5, 4, 3, 2, 1 ]
/*
            * We now has achieved that getSortedNums() function call behaves as a pure function call. It 
              satisfy the conditions we require to make a pure function call:

                <> Take direct inputs.
                <> It gives us direct outputs.
                <> It doesn't rely upon any state of the program before been called.
                <> Does not change anything about the state of the program afterwrds

  *** Recap of ways of dealing with side effects ***

    * So far we have seen 5 ways of avoid or handle side effects:

      <> Writting functions as pure ones from the beginning (pure function).
      <> Refactoring a function to make it pure.
      <> Extract the impurities so we end up having a pure function (getting surrounded 
         by the side effects contained inside of it previously).
      <> Make a wrapper function around the impure function.
      <> Write an adapter function side by side with the impure function.

    * In the case that we get stucked with a side effect even after implementing all of those approaches,
      we should ensure to make the side effect as obvious as possible, maybe containing the impure part of
      the code isolated, in other for other readers of the code to know where to go in cases of bugs.

### 03. Argument Adapters ###

  *** Function Arguments ***

    ->Arguments are the values that are passed to a function when this is called. Arguments get assigned to 
      parameters (the name of the placeholders we define when authoring the function).

    ->The quantity and the kind of the values passed to a function determines its input
      signature's shape. Talking about shape is a more informal way of referring to the type of a function.
      
        * We say that a function is unary when it gets passed only one argument. Functional programmers prefer
          this type of functions because they are the easiest to combine with other functions.

        * A binary function receives 2 arguments and represents the second favorite way of writing functions
          in functional programming.

        * Multi-arguments or miscellaneous functions are quite uncommon and it is because the more arguments a function
          receives, the more difficult it is to combine with other functions.
*/
          // Unary
          function increment(x) {
            return sum(x,1);
          }

          // Binary
          function sum(x,y) {
            return x + y;
          }
/*
  *** Arguments Shape Adapters ***

    ->We can also adapt the shape of functions by means of the usage of Higher Order Functions (HOF).

        * A Higher Order Function is a type of function that receives one or more function as direct inputs
          and/or returns one or more functions.
    
    ->By means of a HOF we can take one or more function as arguments to the HOF, perform some adaptions inside of it
      and return something that interacts with the passed functions in ways that previously weren't possible.
*/      
        function unary(fn) {
          return function one(arg) {
            return fn(arg);
          };
        }

        function binary(fn) {
          return function two(arg1, arg2) {
            return fn(arg1, arg2);
          };
        }

        // n-nary function
        function f(...args) {
          return args;
        }

        var g = unary(f);
        var h = binary(f);

        g(1,2,3,4); // [1]
        h(1,2,3,4); // [1,2]
/*
  *** Flip & Reverse Adapter ***        
        
    ->We often find the necessity of transposing two or more arguments that a function receives, with adaptaions commonly
      named flip and reverse:
      
        * Flip manipulates the first 2 arguments and transposes them flipping their position in the underlaying adapted function
*/        
            function flip(fn) {
              return function flipped(arg1, arg  ,...args) {
                return fn(arg2, arg1, ...args);
              }
            }
        
            function f(...args) {
              return args;
            }

            var g = flip(f);

            g(1,2,3,4); // [2,1,3,4]
/*      
      ->In the same manner, we also have reverse adapter which is less commonly implemented and its job is to flip the order
        of every argument that is intended to be passed to a certain function.
*/
          function reverseArgs(fn) {
            return function reversed(...args) {
              return fn(...args.reverse());
            };
          }
        
          var g = reverseArgs(f);

          g(1,2,3,4); // [4,3,2,1]
/*        
  *** Spread Adapter ***      
*/        
    function spreadArgs(fn) {
      return function spread(args) {
        return fn(...args);
      };
    }    
        
    function f(x,y,z,w) {
      return x + y + z + w;
    }
        
    var g = spreadArgs(f);
    
    g([1,2,3,4]); // 10

/*    
### 04. Point-Free ###
        
  *** Equational Reasoning ***        
        
    ->It is a style of writing functions without writting any of it. We create functions based on other functions.    
      Mathematically speaking, it refers to the way of writing a function fixing certain input values.  
    
    ->We have to be aware of possible situations where to 'fix' input values by performing
      what it's called Equational Reasoning. This means that if we have lets say a callback function that is been 
      passed to another function as input, and this callback wraps and return another function with the same shape 
      (it takes the same amount of arguments as parametres from the callback), we can simply pass the wrapped/return
      function to the outer on. We have to detect interchangebly functions in order to perform this step 
    
    ->Equational Reasoning allows us to specify that some function is equationally similar to another one in terms
      of the shape of them.
*/
      getPerson(function onPerson(person) { // Notice the parameter person been passed as argument to renderPerson
        return renderPerson(person);
      });
        
      // Applying Equational Reasoning  
      getPerson(renderPerson); // Here we can notice that the 'person' parameter is completely ommited (point-free)

/*        
*** Point Free Refactor Example ***
*/

  function isOdd(v) {
    return v % 2 == 1;
  }        
         
  function isEven(v) { // Be aware, look at 'v'!
    return !isOdd(v);
  }      
        
  isEven(4); // True
/*        
    * After refactoring
        
      function not(fn) { // This functions is commonly called 'complement' or 'negate' in some functional programming libraries
        return function negated(...args) {
          return !fn(...args);
        };
      }  
*/        
      function isOdd(v) { /* ... */ }  
        
      var isEven = not(isOdd);
      isEven(4); // True
/*        
      * We can achieve a more declarative coding style with this approach because at the end of the day we are 
        omitting what can be considered innecessary details about the code we write.
        
      * Additionally, we can see that the relation between a function gets even more clearer with this approach.  
*/        
          function isShortEnough(str) {
            return str.length <= 5;
          }
          
          // Instead of writing this way
          // function isLongEnough(str) {
          //  return !isShortEnough(str);
          // }
        
          var isLongEnough = not(isShortEnough);
/*        
  *** Advanced Point-Free ***
        
    ->Composition pattern is the idea of taking the output of a function and directly as the input of another function.
*/    
        function mod(y) {
          return function forX(x) {
            return x % y;
          }
        }
        
        function eq(y) {
          return function forX(x) {
            return x === y;
          };
        }
        
        var mod2 = mod(2);
        var eq1 = eq(1);
        
        // Instead of taking a least readably approach like this
        // function isOdd(x) {
        //  return eq1( mod2( x ) )
        // }

        function compose(fn2, fn1) {
          return function composed(v) {
            return fn2( fn1() );
          }
        }
        
        var isOdd = compose(eq1, mod2);
/*        
### 05. Closure ###

  *** Closure ***
        
    ->An specific definition of Closure could be that it is when a function "remembers" the variables around it even when that function is executed elsewhere.
      Closure refers to the ability of a function to access and manipulate members of the scope´s variable environment where the function is declared into.
*/      
        function makeCounter() {
          var counter = 0;
          return function increment() {
            return ++counter;
          };
        }

        var c = makeCounter();

        c(); // 1
        c(); // 2
        c(); // 3
/*
          * In the above example we can see that c() function (previously known as incremet()) is been closed over the counter variable, which is been mutated with 
            every single call to c(). This is a clearly indication that closure is not necessarily functionaly pure, however it can be used in a functionaly pure way:
*/
              // addTwo() is been closing over to the z  parameter with is declared in an outer scope and it is not changing at all. Also, both inner and outer functions
              //  are taking and returning some values (an implicit undefined arguments, that is, no arguments passed to a function, is perfectly consistent with functional
              //  programming).

              function addAnother(z) {
                return function addTwo(x,y) {
                  return x + y + z;
                }
              }
/*

  *** Exercise on Closure ***
        
    ->We are going to build a string builder function that accepts a string as input and returns a function that continues taking string and concatenating to the previous one.
      The function is going to return the built string when no string argument is provided to the inner function call.

        * We may make use of recursion to solve this problem in a functionally pure way. Be wised about how to implement recursion and closure, functional concepts must be 
          followed when building the solution.
*/

            // WRONG SOLUTION. It does not follow pure functional concepts.
            // The inner function next is closing over the str argument variable, whilst it is adding (mutating an outer variable) its passed v value to it.
            "use strict";
                        
            function strBuilder(str) {
              return function next(v) {
                if (typeof v == "string") {
                  str += v;
                  return next;
                }
                return str;
              };
            }

            // FUNCTIONALLY PURE SOLUTION.
            // Check how recursion is implemented with respect the outer strBuilder() function.
              
            function strBuilderPure(str) {
              return function next(v) {
                if (typeof v == "string") {
                  return strBuilderPure(str + v);
                }
                return str;
              };
            }

            var hello = strBuilderPure("Hello, ");
            var kyle = hello("kyle");
            var susan = hello("susan");
            var question = kyle("?")();
            var greeting = susan("!")();

            console.log(strBuilderPure("Hello, ")("")("Kyle")(".")("")() === "Hello, Kyle.")
            console.log(hello() === "Hello, ");
            console.log(kyle() === "Hello, Kyle");
            console.log(susan() === "Hello, Susan");
            console.log(question === "Hello, Hyle?");
/*
        * If the first strBuilder function was to be used, we would found out that only the first check would be correct.
          Subsequent checks would reveal that because str value is been mutated with every call of strBuiler() (which
          becomes hello(), then kyle(), then susan() and so on), affecting the str valued used by all function calls.
        
  *** Lazy vs Eager ***
        
    ->Functons can be written in a lazy or eager way by means of closure. Closure let us decide if the work is to be executed 
      eagerly now or lazily later.
    
        * The first approach allows us to defer the work execution until the return function is called. This allows us to 
          avoid computing work that may not be actually executed (for example, in code branching/conditional execution). 
          A drawback of this approach is that now the work is going to be executed with every single function call we 
          make (expensive computations for example).
*/        
            function lazyRepeater(count) {
              return function allTheAs() {
                return "".padStart(count, "A");
              }
            }

            var A = lazyRepeater(10);

            A(); // "AAAAAAAAAA" Work will be perfomred in every function call 
            A(); // "AAAAAAAAAA"
/*
        * The eager approach makes the work happen at the very "instantiation" of the inner function, meaning that the work
          is performed up front, but we can take advantage of this by returning the results of the work previously made with
          every single function instance (inner/return function) call. A downside of this is that the function might not be called
          at all, thus making unnecessary (and possible expensive) computations in our programs that aren't needed.
*/
            function eagerRepeater(count) {
              str = "".padStart(count, "A");
              return function allTheAs() {
                return str; // Now Closure is performed over the str variable declaration
              };
            }

            var A = eagerRepeater(10); // Work is been perfomred just here.

            A(); // "AAAAAAAAAA" 
            A(); // "AAAAAAAAAA"
            /*
        
  *** Memoization ***            

    ->What if we would want to take advantage of both lazy and eager approaches of writing a function? Memoization allows us to
      do so by executing the work lazily but just once also, enhancing performance. This is achieved by expanding the variable 
      environment been closed over.
*/
        function performantRepeater(count) {
          var str;
          return function allTheAs() {
            if (str == undefined) {
              str = "".padStart(count, "A");
            }
            return str;
          };
        }
        
        var A = performantRepeater(10); 

        A(); // "AAAAAAAAAA" Work is been perfomred only in this function call
        A(); // "AAAAAAAAAA"
/*

          * Notice that this implementation of the repeater function, whereas it is providing the best performance possible in relation 
            with the previous, defeats one of the pillar requirements in functional programming with relates to closing over mutating 
            values. However, we might argue that even when the str variable is been mutated in the first call on an performantRepeater
            "instance", the return value of subsequent calls is not changing by any means.

          * We could use a function to take away all implementation(imperative) details from our function definition, and every popular 
            functional programming library provides us with a useful utility function that takes care of "caching" return values in cases 
            where inputs are the same in multiple calls to the same function. This utility is commonly called memoize():
*/
              function memoizedRepeater(count) {
                return memoize(function allTheAs() {
                  return "".padStart(count,"A");
                });
              }

              var A = memoizedRepeater(10);

              A(); // "AAAAAAAAAA" Work is been perfomred only in this function call
              A(); // "AAAAAAAAAA"

/*
                * With this implementation we have save the reader of the code the overhead of needing to realize what and how closure is 
                  implemented, specifically that certain closed over variables are been mutated during the function execution (at least at
                  some point in the code)
                * Now the function is showing us closure over a variable (count) that is not mutated. Moreover, we see the memoizedRepeater 
                  taking a constant input (for what we are limited to see in the code snipped at least) and returning a value that is kept 
                  constant with subsequent calls to the inner function (referential transparency, which refers to the ability to swap a 
                  function call with its return result on subsequent function calls).

  *** Referential Transparency ***
        
    ->A review of all of the partial definitions for a pure function we have stated so far is shown as follows:
      A pure function has to/should:
      
        * take some inputs and return an output.
        * create a clear/obvious relationship between the inputs and the output.
        * take DIRECT inputs (extrictly passed as arguments to it) and return DIRECT outputs (only affect the line after it).
        * take inputs that doesn't change (meaning that it can take INDIRECT inputs as long as they are immutable).
        * take the same inputs and return the same output.
    
    ->The full/cannonical definition of what does a function takes to be considered a pure function (pure function call specifically), is that 
      it should allows us to used its return value to replace any further call to the function without affecting other parts of our program.

        * There is a term to refer to this and it is called "Referential Transparency". A function call is pure if it has referential transparency. 
          Referential Transparency means that a function call can be replace with its return value anywhere in the code without affecting any other 
          part of the same.
        
    ->A functional programming language like Haskell, which only allows the writting of pure functions, take advantage of this built-in feature
      through its compiler, in that it gets optimized by swapping further pure function calls with the return values of each.

    ->"In a bigger sense, the real benefit of 'Referential Transparency' is actually to the reader of our code (which can be ourselves inclusive); 
       anywhere else where they see the same function call with the same inputs, they are going to swap a previously defined value from this function
       in the place where the pure function call is been made (freeing 'Brain Power' from their heads to focus on more important parts of our programs).""

         ** "Code should be writting in a way that readers can know what a line of it is going to perform easily" **
         ** "The best code is the one that didn't have to be read in the first place (we should see it and say 'Oh, i have already done that'" **
        
  *** Generalized to Specialized ***      
        
    ->Code that executes certain functionality usually could get complex enough, and this is intimately related with a function with a high degree of
      generalization. We must focus our code writing to ease the reader's understading of it by providing its purpose in the most clear way we can;
      intermediary steps into a more specialized function definition is the way to achieve this.

        * Specialization of a function refers to the decoration of it by passing required inputs that may not change in some implementations
          of it. A generalized function has to be defined in such a way that its more generalized input parameters are expected first in the function
          call (the parameters more likely to be fixed in some usage of the code).

            Generalized ---> Specific
*/
              function ajax(url, data, cb) { /* ... */ }
        
              ajax(CUSTOMER_API, {id:42}, renderCustomer);

              function getCustomer(data, cb) {
                return ajax(CUSTOMER_API, data, cb);
              }
        
              getCustomer({id:42}, renderCustomer);

              function getCurrentUser(cb) {
                // return ajax(CUSTOMER_API, {id:42}, renderCustomer);
                return getCustomer({id:42}, cb); // defining getCurrentUser in terms of getCustomer provides a stronger relationship bet the function name
                                                 // and its purpose.
              }

              // This specialization can be used when we are dealing with a currently logged in/ authenticated user for example.
              // At this point, the reader shouldn't be concerned with the fact that the function is been internally using the CUSTOMER_API url and 
              // the id of it to communicate purpose in the current context of the program (both variables are going to mostly remaing immutable at this point)
              getCurrentUser(rederCustomer); 
/*
    ->Function specialization can be achieve by two techniques which are: partial application & currying

  *** Partial Application & Currying ***
        
    ->Partial Application is generally allow by means of some utility, provided with most of the popular functional libraries, usually called "partial".

        * Partially apply some of the inputs now, receive the rest of the inputs later.
        * It is probably using Function.bind() under the hood.
*/        
        function ajax(url, data, cb) {/*  */}

        var getCustomer = partial(ajax, CUSTOMER_API);

        var getCurrentUser = partial(getCustomer, {id:42});

        getCustomer({id:42}, renderCustomer);

        getCurrentUser(renderCustomer);
/*

    ->Currying is a much more common form of specialization. Intermediate steps on function calls provide us with a more specialized version of the curried function.
      This technique comes from the Haskell programming language, its name is related to the creator of the language Haskell Curry. In Haskell functions are of unary
      type, hence currying is the way used to call a function with multiple inputs.
      
        * Just like with Partial Application, functional libraries provide an utility to implement currying automatically:
*/
          // var ajax = url => data => cb => { /*  */ }; // Functional programmers  tend to prefers this way of currying due to similarity with Haskel notation for currying
          // var ajax = url => (data => (cb => { /*  */ })); // Represents a slighty more readable way of nesting arrow functions.
          var ajax = curry(
            3,
            function ajax(url,data,cb) {/*  */}
          );
          // curry() automaticallly adapts the function passed to unroll and receive it parameters from different function calls
          var getCustomer = ajax(CUSTOMER_API);
          var getCurrentUser = getCustomer({id:42});
/*

    ->Partial Application vs Currying:
        
        * Both are specialization techniques.
        * Partial Application presets some arguments now, receives the reset on the next call.
        * Currying doesn't preset any arguments, receives each argument one at a time.
        
    ->Specialization adapts Shape:
*/
        function add(x,y) { return x + y; }

        [0,2,4,6,8].map(function addOne(v) {
          return add(1,v);
        });
        // [1,3,5,7,9]

        // using curry()
        add = curry(add);

        [0,2,4,6,8].map(add(1));
        // [1,3,5,7,9]
/*

### 06. Composition ###

  *** Composition Illustration ***

    ->Composition allows us to abstract functionality used in a common operation execution. With abstraction we are trying to achieve separation from different things and understand each
      of them individually without having to think in relation to the other one. Separation makes more easy the understanding of something

        * Composition in essence makes the output of a function, the input of another one:
*/
            function minus2(x) { return x - 2; }
            function triple(x) { return x * 3; }
            function increment(x) { return x + 1; }

            // Add shipping rate composed
            totalCost = basePrice + minus2(triple(increment(4)));
/*
              * Execution of functions are from left (innermost) to right (outermost). This due to the fact that outer functions receive functions as arguments and in other for the latter to complete 
                their execution, parameters have to be computed first.

        * Adding abstraction would make the code much more readable and easier to reason about:
*/

            function shippingRate(x) {
              return minus2(triple(increment(x)));
            }

            totalCost = basePrice + shippingRate(4);
/*

  *** Declarative Data Flow ***

    ->We have seen the way data flows when implementing composition; represents the flow of data through a series of operation defined declarative rather than imperative.
      "A program doesn't mean anything without a declarative flow of data; the whole goal of a program is to have input data comming in, do stuffs and going back out"
*/        
      
        function composeThree(fn3, fn2, fn1) {
          return function composed(v) {
            return fn3(fn2(fn1(v)));
          };
        }
        
        // Another layer of abstraction added
        var shippingRate = composeThree(minus2, triple, increment);
/*

 *** Piping & Composition Exercise ***
*/

    function compose(...fns) {
      return pipe(...fns.reverse());
    }
    
    function pipe(...fns) {
      return function piped(v) {
        for (let fn of fns) {
          v = fn(v);
        }
        return v;
      };
    }

    var f1 = compose(increment, decrement);
    var f2 = pipe(decrement, increment);
/*
      * Piping follows a left-to-right flow of data in contrast to composing.

  *** Associativity ***
      
    ->Composition is a mathematical concept that implies that wherever order that we group a set of operations in, the end result is going to be the same.
      This concept is referred as to Associativity.
*/

      function composeTwo(fn2,fn1) {
        return function composed(v) {
          return fn2(fn1(v));
        };
      }

      var f = composeTwo( composeTwo(minus2,triple), increment);
      var p = composeTwo(minus2, composeTwo(triple, increment));

      f(4); // 13
      p(4); // 13
      // code executon from both composed functions is different, however the output is the same.

/*
### 07. Immutability ###

  *** Immutability ***

    ->Immutability implies that something is not going to change. However, it can also be defined to express something is not going to change UNEXPECTEDLY.

        * There's a lot of state change in our programs, being that the whole point of them, to allow controlled changes to state. So we have to think
          of immutability as something that refers to changes but made intentionaly, changes made with us being aware of them.

        * Immutability can be related to the concept of how do we control mutation/change.

    ->There are two different kinds of immutabiility that we want to pay attention to:

      * Assignment Immutability.

        - Relates to the idea that a variable cannot be reassigned to a different value after its declaration/initialization.
*/
          var basePrice = 89.99;
          const shippingCost = 6.50;

          // other code here

          basePrice += 5.00;    // Allowed, however, we are not mutating the inital basePrice value, which is a primitive (a number).
                                // primitives cannot be mutated. Instead what is really happening here is an assigment mutation.

          shippingCost += 1.04; // not allowed! assignment mutations cannot be performed to a const-declared variable.
/*          

        - Functional programmers received very well the incorporation of the const keyword into the JS language due to the fact that it 
          prohibits variable reassignments. As a matter of fact, a functional programmer tend to avoid assignments at all cost, thats why
          we can see long-sized composition operations between a lot of functions within functional programming (one function's output is 
          passed directly as argument/input of another function - referential transparency - instead of assigning intermediate values
          between function calls).

        - In functional programming, functions are actually the means by which some state changes are achieved. Base state values are passed 
          as inputs and a new value is computed and return from within the funcion.
*/

            function increasePrice(price) {
              return price + 5.00;
            } 

            increasePrice(basePrice); // 94.99

            function increaseShipping(shipping) {
              return shipping + 1.04;
            }

            increasingShipping(shippingCost); // 6.76
/*
      * Value Immutability.

        - One thing that a functional programmer does is to try to predict where bugs are going to be and avoid them before they occur by using 
          patterns where they can't happen. 

        - Passing a value by reference to a function whose implementation is not known by us, creates a potential source for bugs if no appropiate
          preventions were to be taken.
*/
            const orderDetails = { // this object could be easily mutated in the future by other parts of our code or even third-party's  code.
              orderId: 42,
              total: (basePrice + shipping)
            };

            if (orderedItems.length > 0) {
              orderDetails.items = orderedItems;              
            }

            processOrder(orderDetails); // If processOrder implementations details with regard to its argument's manipulation were not known, 
                                        // orderDetails (value passed by reference) could be modified inside the function and alter other parts
                                        // of our code that depends on this object
/*
  *** Rethinking const Immutability ***
    
    ->We need to be aware of the fact the "const" keyword is intended to avoid reasignment of values to an already declared variable. Notice that
      refer to the declared values as variables even though we are using the const keyword to do so.
    
    ->The usage of the const keyword could potentially be a source of cunfusion when new unexperienced readers of our code are trying to understand
      what is the purpose of it. 

        * All declared objects (objects, array, functions) can be mutated even when declaring them with the const keyword.

  *** Object.freeze ***
  
    ->The language has a built-in way to create read-only data structures (never need to be mutated) from native JS objects. Object.freeze prevents 
      mutation to the internal properties from a declared object value.
        
        * Object.freeze only modifies the properties for the first layer them. Nested objects has to be individually frozen. 
        
        * The important take away of using this method is that we ensure to communicate to the reader of the code that the value is not going to be
          nor should be modified.
*/
      // ...
      processOrder(Object.freeze(orderDetails));
/* 

  *** Don't Mutate, Copy ***

    ->We should always assume that an object cannot be mutable and even more when is passed b reference.

        * When we write functions that receive data structures, we should treat them as if they were readonly, hence the correct approach to execute 
          functionality based of the contents of the data structure is to create a copy of it and apply changes needed to this local copy. 
*/

            function processOrder(order) {
              var processedOrder = { ...order };
              if (!("status" in order)) {
                processedOrder.status = "complete";
              }

              saveToDatabase(processedOrder);
            }
/*

  *** Immutable Data Structures ***

    ->An immutable data structure is one that allows not no mutation but rather structure-controlled intentional mutation (when the required mode is 
      enabled for it).

        * They are representations of the data structures we are used to deal with no access to the underlying DS, what we only have is an API to access it.
          The API creates underlying control to prevent the DS to be changed unexpectedly. 

        * A Immutable Data Structure basically says we cannot make changes to it but rather create a new one based off of it with the required changes applied
          in it (similar to the concept used in the previous code snippet).

        * API from these immutable data structures will return to us new DS with specified changes applied on it, without afecting the DS the newly created one is
          based from. This prevents modification of the original DS that other parts of our code can be relaying upon.

        * Immutable Data Structures provide performance optimization regarding the process of creating copies everytime a change need to be done to a DS (this
          is a performance issue in terms of garbage collection and cpu cost due to potentially creation of several copies from an object per second in larger apps).

            - The way Immutable DS are design is to intentionally mitigate this performance issue; DS internally creates a new DS with the addtional changes on it
              and a pointer that points back to the previous version of the DS (similar to Git approach of creating unique objects chained back to its parent).

  *** Immutable.js Overview ***
*/
    var items = immutable.List.of(
      textbook,
      supplies
    );

    var updatedItems = items.push(calculator);

    items === updatedItems; // false

    items.size;             // 2
    updatedItems.size;      // 3
/*

  *** Immutable, Functionaly Pure Lucky Lottery Numbers Exercise ***
*/
    "use strict";

    function lotteryNum() {
      return (Math.round(Math.random() * 100) % 58) + 1;
    }

    // Sorting impurity is contained inside the function itself, this step 
    // doesn't affect any other parts of the program.
    function recordNumber(num, numbers) { 
      if (!numbers.includes(num)) {
        numbers = [ ...numbers, num ];
        numbers.sort(function asc(x,y) {
          return x - y;
        });
      }
      return numbers;
    }
    
    var luckyLotteryNumbers = [];
    const NUM_COUNT = 6;

    while (luckyLotteryNumbers.length < NUM_COUNT) {
      luckyLotteryNumbers = recordNumber(
        lotteryNum(), // Impurity from this function executed is not triggered inside the recordNumber() call
        Object.freeze(luckyLotteryNumbers)
      );
    }

    console.log(luckyLotteryNumbers);
/*

### 08. Recursion ###

  *** Recursion ***

    ->Recursion can be defined as a pattern of writing a programming function that gets invoked from within itself until a base condition / code branch is accomplished. 
      A variaty of algorithmic patterns/strategies (recursion happens to fit very well into the major of them) can be followed in order to define a recursive function. 
      

      * When these patterns are well understood and cases where they can be used to solve some kind of problems are easily identified makes of recursion a valuable 
        functional programming tool to face problem solving.
      
      * Common approaches to design recursive functions are:
        - Solve sub-problems: 
          
          <> do something and reduce the problem set into a smaller one and keep reducing repeating the pattern.
          <> reduce/break a problem into smaller pieces, easier to understand, that can be iteratively resolved, each of which continuously adds to the whole solution.
        
        - Divide and Conquer:

          <> Assertions to eliminate half of a problem are performed, repeating the process dividing the resulting problem into its half again.

      * Every single one recursive solution is going to ahve, at a minimum, a base condition. The base condition is what let us know when to stop.

    ->Recursion is designed/conceived to be a declarative approach (not concerned on how something happens but rather what is the outcome of it).
*/     
        function countVowels(str) {
          if (str.length === 0) return 0;
          var first = (isVowel(str[0]) ? 1 : 0);
          return first + countVowels( str.slice(1) );        
        }

        countVowels(
          "The quick brown fox jumps over the lazy dog"
        );
        // 11
/*
  *** Base Condition Location ***

    ->Sometimes better optimizations for performance can be achieved based on where to locate the base condition of the recursive function. The following change aims to 
      avoid the last call to the function where the 0 is return:
*/
      function countVowels(str) {
        var first = (isVowel(str[0]) ? 1 : 0);
        if (str.length <= 1) return first;
        return first + countVowels( str.slice(1) );
      }

      // ...
/*

  *** Palindrome Exercise ***
*/
    function isPalindrome(str) {
      var last = str[str.length - 1]
      if ( str.length <= 1 ) return true;
      if ( str[0] !== last ) {
        return isPalindrome(str.slice(1, last))
      }
        return false;
    }
/*

  *** Stack Frames & Memory Limits ***

    ->The major problem that has been some way excluding recursion from been a required programming technique to learn in depthh is the limitation in the stack frames of mamory (memory limits).

        * When a function calls out another function (not in a recursive way necessarily speaking), at this moment, everything that was currently happening in the calling function needs to get saved
          somehow so that all the stuff that happens in the called function doesn't mess up with what was happening in the first one.

          - Everytime a function is executed, an area of memory is reserved to store all the environment variables to be defined in it (amongst others). In Computer Science this is called Stack Frame.
            It is also commonly called memory frame.
          
          - When we have several functions that call each other, what we have is a stack of function calls. The stack data structure idea is used because when the top-most function finish its execution,
            it gets pop off the stack back to the previous one (picking where it left off), returning any computed value it perfomed, getting rid of the memory utilized to track its process execution.
            When a function resume its execution after another function is pop off the stack, the former can call again other functions, increasing the stack size once again.
            
        * A stack frame stores all the environment variables declared within the function call, the program counter that keeps track of the line of code executed and additional low level things computers
          need to track to determine whats happening inside a function. 

  *** Optimization - Tail Calls ***

    ->The idea behind Tail Calls refers to if a function call happens in the tail (very end) of the execution logic of the calling function, the stack frame of the latter can be discarded representing a 
      memory optimization on recursie patterns.

    ->Tail Calls represent a memory optimization that prevents unnecessary runaway memory usage. Multiple stack frames arent needed anymore because of the way this function call pattern works; run functions
      in an essentially fixed memory space (O(1) memory usage insted of O(n)) when implementing recursion.

    ->It is important to understand that Tail Calls are an additional feature that our compiler/runtime has to support.

  *** Proper Tail Calls ***

    ->The refer to the idea that proper tail calls get memory optimized (only used O(1) memory usage).

      * PTC was standarized on JS and to leverage it, code must follow the next aspects:

        - Strict mode has to be enabled (not in sloppy mode)
       
        - Function calls have to be on a Proper Tail position; nothing has to happen after a function call finishes except for its value to be return.
       
        - Requires a return keyword, a single function call and nothing else in the expresion should be computed afterwards.
       
           <> If there is a ternary expression is present in the return statement and the function call is in one of the branches, it qualifies as a PTC (nothing else is going to happen besides the computation of
              one of the branches, one of which may end up been PTC).

      * The JS spec states that the JS engine has to make sure no matter how deep that chain of function calls gets, we should not get a range error (run the system out of memory).
*/
          "use strict";

          function decrement(x) {
            return sub(x,1); // Proper tail call
          }

          function sub(x,y) {
            return x - y;
          }

          decrement(43); // 42
/*

  *** Refactoring to PTC From ***

    ->In our previous countVowels() example we dont met the requiements to a PTC because we have an assigment operation that needs to be computed after the recursive execution of countVowels(). This means that we will
      have stack frames to keep around.

        * Many forms of recursion (not all) can be reoriented to take advantage of tail calls.
        
        * When we have a fork (binary or n-nary) form of recursion we cannot do tail calls because one of the calls is not going to be in a tail position (we can have one call but not many in tail position).

    ->Instead of keep track/preserve a variable in the current stack frame of a calling function, finish all the required computation and pass it to the next stack frame, repeating this approach with each function call. 
     This is achieved by reserving one of the argument position to pass the result of some computation needed to the next recursive call:
*/
  
      "use strict"

      function countVowels(count, str) {
        count += (isVowel(str[0]) ? 1 : 0);
        if(str.length <= 1) return count;
        return countVowels( count, str.slice(1) );
      }

      countVowels(
        0,
        "The quick brown fox jumps over the lazy dog"
      );
      // 11
/*  
    
    ->We could create an interface function that have a nice clean signature, hidding away the recursive function with the non-clean signature as the one above:
*/  
      "use strict"

      var countVowels = curry(2, function countVowels(count, str) {
        count += (isVowel(str[0]) ? 1 : 0);
        if (str.length <= 1) return count;
        return countVowels( count, str.slice(1) );
      })(0);

      countVowels(
        "The quick brown fox jumps over the lazy dog"
      )
      // 11
/*

  *** Continuation-Passing Style ***  

    ->PTC is something that we actually cannot be relying upon with all browser's JS engines. We have to consider additional strategies for writting recursive algorithms without having to rely on the optimization provided
      by PTC. This strategy, not intended to be used in JS, uses the term continuation-passing to refer to that a callback function is been passed.
        
        * It is important to state that we end up with CPS after a process of code conversion, meaning that is not commonly to see developers writing CPS manually. CPS has a confusing look because it is in fact write by a 
          machine.

        * A function that just take and return the argument passed to it, it's called identity function.
*/
            function countVowels(str, cont = (v)=>v) {
              var first = (isVowel(str[0]) ? 1 : 0);
              if (str.length <= 1) return cont(first);
              return countVowels(str.slice(1), function f(v) {
                return cont(first + v);
              });
            }

            contuntVowels(/* ... */)
/*
              - The countVowels() function creates new f() callbacks with every recursive call, named "cont". Each new f() definition wraps (defers) the execution of the previous f() passed into. 
                The last recursive execution invokes the f() callback (if statement branch), which in turn execute all the previous f() ever defined.

              - What is actually happening is the deferring of the cont() execution by creating a bigger function with each recursive call. The last countVowels() invocation  is what executes the 
                count() which end up triggering the invocation of all previous cont() functions.

              - This is not actually solving the memory problem. With every new f() (or cont()) function we are actually reserving an space in memory not from the call stack but from the heap instead.
                  
                  * The heap is a dynamic area of memory that allocates variables been create during our program execution.   

    ->This strategy is actually implemented in languages used in C compilers where they do not deal with closure like we do in JS (which is what causes the memory Heap problem in thsi strategy).

        * Closure represents allocation of memory off of the heap.

  *** Trampolines ***

    ->We should keep in mind the idea from the previous CPS strategy of deferring some work via wrapping within a callback that's executed later. This is a key concept in the usage of another strategy
      called trampolines. A trampoline represents the idea that we want something bouncing back and forwards.

        * Instead of having a function calling another function. which calls another function and so on, this strategy implies a function calling another function which return a function (not the execution).
          In this strategy, the stack layers never goes beyond 1. Instead of making a recursive call, we return a function that will make the next call.
*/
            // A basic implementation of a trampoline can be as follows:
            function trampoline(fn) { // Any popular functional library should provide a more sophisticated trampoline utility
              return function trampolined(...args) {
                var result = fn(...args);

                while (typeof result == "function") {
                  result = result();
                }

                return result;
              }; 
            }
/*
    ->In order to implement this trampoline strategy is that we have to take any function call that would've been recursive and wrap it in a function and then return it:
*/
        var countVowels = trampoline(function countVowels(count, str) {
          count += (isVowel(str[0]) ? 1 : 0);
          if (str.length <= 1) return count;
          return function f() { // Here is the wrapping function required to implement Trampolines strategy
            return countVowels(count, str.slice(1));
          };
        });

        countVowels(0, /* some string */)

        // Optionally
        countVowels = curry(2, countVowels)(0);
        countVowels(/* some string */)
/*
          * "The way the wrapping function f() works is because it has closure over all the things it needed; it temporarily holds on to those values so that they can be return back to the trampolined utility,
            popping the call stack and immediately invokes that, starting back over".

          * "We are taking advantage of the place where we are storing the information is the return value of our stack frame, which then pops the stack frame off".

    ->"The reason for this form of recursion is that it will be very easy to convert to real tail call form at some later time if we get to the point tail calls are reliable in cross JS".
      
        * All we (or some convertion tool) would need to know is that a trampoline is implemented and remove the wrapping f() function in favor to the direct return of the recursive call of countVowels() in this 
          particular exercise case.

    ->Even when this code is quite more complex with respect to the place where we started, it is significantly more declarative than an iteratively for-loop version of countVowels().

    ->"Trampolines is the preferred way of doing recursion when we can take advantage of tail calls".
      
        * "The difference between a trampoline call and regular recursion is that in the latter, we literally stack all the work done ('you do some work, then you do so work, then you do some work...'), which provoques
          increase on memory size used. In a trampoline we never stack up the work, instead we do some work which at the end return a function to the trampolined utility that would execute additional work when the 
          trampolined utility decides to. We are bouncing up and down between a stack depth of 0 and a stack depth of 1 over and over again. This allows us to avoid the range error from a regular recursive call"  

### 09. List Operations ###

  *** Map - Transformation ***
  
    ->
*/

/*

*/

/*

*/

/*

*/
