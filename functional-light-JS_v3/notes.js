/*

### 02. Function Purity ###

  *** Function vs Procedures ***

    ->A procedure is a collection of operations/steps that are performed in a program.
      When defining a function, the simple fact that it implements the 'function' keyword doesn't make it
      a function when we refer to it from within the context of functional programming.

        // a collection of steps within a procedure. Nothing gets returned from this 'function'
        function addNumbers(x = 0, y = 0, z = 0, w = 0) {
          var total = x + y + z + w;
          console.log(total);
        }

        // This becomes a procedure although is taking direct inputs and returning something (which happens to be a procedure).
        function extraNumbers(x = 2, ...args) {
          return addNumbers(x, 40, ...args);
        }

    ->Code that is written with functional principles is based upon mathematics.

    ->A function could be defined as the semantic relationship between some inputs and an output from the function.

        * A function has to take some inputs and return some output.
        * Functions uses direct inputs and direct outputs and it establishes a clear relationship between the two.
        * A function can only call other functions (not a procedure, in this case it becomes also a procedure).

            function tuple(x,y) {
              return [x + 1, y - 1];
            }

            var [a,b] = tuple(...[5,10]);

  *** Function Naming Semantics ***

    ->In order to keep honest with the spirit of funtional programming, a function's name has to make obvios the
      relationship of inputs to the output of it.

        function shippingRate(size, weight, speed) {
          return ((size + 1) * weight) + speed;
        }

  *** Side Effects ***

    ->Functions have to take direct inputs (arguments passed to parameters) and compute and return an output without assigning
      anything outside of itself in the process. It can not access anything outside of itself nor assign anything outside of itself.
      
        function shippingRate() {
          rate = ((size + 1) * weight) + speed; // Side effects everywhere
        }

        var rate,
        size = 12,
        weight = 4,
        speed = 5;
        shippingRate();
        rate;

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

              * Notice that after reformulating the function, the DOM modification is done outside newComment().
                Now newComment just return the comment to be added to the DOM.

  *** Containing Impurity ***

    ->When we can't extract the impurity, we can try containing if inside the function itself. Accomplishing the task
      of structuring things so that the impurity does not affect other parts of our application has a good impact on it.
      Another way of thing about this is as finding a way of reducing the surface area of the impurity.

        * If the side effect polutes the global scope, thats bad. What if the side effect that has to happen can be contained 
          locally to affect only 5 lines of code?

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
              
              function insertSortDesc(v) { ... }
            }
            
            numbers = getSortedNums(numbers, 3);
            numbers = getSortedNums(numbers, 5);
            ...
            numbers; // [ 5, 4, 3, 2, 1 ]
            
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

          var SomeAPI = ...;

          var numbers = [];

          function insertSortedDesc(v) { ... }
          
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
          ...
          numbers; // [ 5, 4, 3, 2, 1 ]

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

          // Unary
          function increment(x) {
            return sum(x,1);
          }

          // Binary
          function sum(x,y) {
            return x + y;
          }

  *** Arguments Shape Adapters ***

    ->We can also adapt the shape of functions by means of the usage of Higher Order Functions (HOF).

        * A Higher Order Function is a type of function that receives one or more function as direct inputs
          and/or returns one or more functions.
    
    ->By means of a HOF we can take one or more function as arguments to the HOF, perform some adaptions inside of it
      and return something that interacts with the passed functions in ways that previously weren't possible.
      
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

  *** Flip & Reverse Adapter ***        
        
    ->We often find the necessity of transposing two or more arguments that a function receives, with adaptaions commonly
      named flip and reverse:
      
        * Flip manipulates the first 2 arguments and transposes them flipping their position in the underlaying adapted function
        
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
      
      ->In the same manner, we also have reverse adapter which is less commonly implemented and its job is to flip the order
        of every argument that is intended to be passed to a certain function.

          function reverseArgs(fn) {
            return function reversed(...args) {
              return fn(...args.reverse());
            };
          }
        
          var g = reverseArgs(f);

          g(1,2,3,4); // [4,3,2,1]
        
  *** Spread Adapter ***      
        
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

      getPerson(function onPerson(person) { // Notice the parameter person been passed as argument to renderPerson
        return renderPerson(person);
      });
        
      // Applying Equational Reasoning  
      getPerson(renderPerson); // Here we can notice that the 'person' parameter is completely ommited (point-free)
        
*** Point Free Refactor Example ***

  function isOdd(v) {
    return v % 2 == 1;
  }        
         
  function isEven(v) { // Be aware, look at 'v'!
    return !isOdd(v);
  }      
        
  isEven(4); // True
        
    * After refactoring
        
      function not(fn) { // This functions is commonly called 'complement' or 'negate' in some functional programming libraries
        return function negated(...args) {
          return !fn(...args);
        };
      }  
        
      function isOdd(v) { ... }  
        
      var isEven = not(isOdd);
      isEven(4); // True
        
      * We can achieve a more declarative coding style with this approach because at the end of the day we are 
        omitting what can be considered innecessary details about the code we write.
        
      * Additionally, we can see that the relation between a function gets even more clearer with this approach.  
        
          function isShortEnough(str) {
            return str.length <= 5;
          }
          
          // Instead of writing this way
          // function isLongEnough(str) {
          //  return !isShortEnough(str);
          // }
        
          var isLongEnough = not(isShortEnough);
        
  *** Advanced Point-Free ***
        
    ->Composition pattern is the idea of taking the output of a function and directly as the input of another function.
    
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
        
### 05. Closure ###

  *** Closure ***
        
    ->
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
*/