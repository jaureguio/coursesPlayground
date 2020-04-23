# Concept/Approaches to Solve problems

- Initialize DS to keep track/memoize partial solutions to problems (remembering subproblem results).

- When looping, base setup (prior to entering the loop) is treated as previous iteration's result when loop gets started first time. Thee loop's body is going to modify the previous iteration's result which is going to be stored in base setup variables; the loop's condition checks to see if base setup variables meet certain criteria, breaking out of the loop if is the case.

- Manipulate the input data of the problem (sort it, etc.) before planning a solution.
  - Sort the DS by some criteria. This will allow approaches using patterns like Binary Search, Multiple Pointers, etc.
  Turn values from the DS into other type (like turning numbers into strings), in order to unlock additional tooling.

- Remember the following approaches:
  - Frequency Counters.
  - Multiple Pointers.
    - Pointers at start and end in an ordered data structure. Pointers location modified by some criteria.
  - Sliding Windows.
  - Divide & Conquer (Binary Search).
    - Avoid nested loops when looking up certain value in a DS by manipulating it first(sorting, etc.) and then performing a BS.

## Approaching Recursion

- Recursion can be thought of as the programming pattern that involves a function invoking itself from within its code body. Also, from a mathematical-ish POV, recursion can be thought of as:

  ```javascript
    fn(n1,n2,...n) = fn(n1,fn(n2,fn(...n))
  ```
  - We could understand better the above explanation by using a specific function as `sum(items)` --> `sum(nElements) = sum(n1 + sum(restOfnElements))`
  - Note that from both previous definition and signature of a recursive functions follows some sort symmetry, helping us define the recursive function itself. Take another example:

  ```javascript
    // Recursive definition: maxEven(n1,n2,n3,...n) --> maxEven(n1, maxEven(n2, maxEven(n3, maxEven(...n))))

    // maxEven(n1, ...restN) is read like: 
    maxEven(n1, maxEven(...restNums))

    // Do you see the similarity? This makes our functions more declarative and ease its implementation at author time 
  ```

  - In order to set a problem solution with a recursive approach, it is important to define a base condition for which the function is going to stop calling itself and return a concrete value. The idea behind recursion is to break the input arguments into pieces which will be managed one at a time within the function's body with each recursive call.
  - We need to ensure that each recursive call to the function handles a smaller/reduced subset of the original arguments. In addition, the reduction should guarantee reaching the base condition at some point.

    - A helpful way to approach recursion is to mentally set the context (arguments managed) of the recursive call to fulfill the base condition and build our way back one recursive call up, considering the context for that function call as well. This is a good way of thinking recursively because it follows the backtracking nature of Recursion.
    - In general, the body of a recursive function is comprised of multiple code guards that checks the condition of the arguments received in order to decide if a recursive call should be perfomed or not.

#### Tips

- A function can be defined in a way it performs a recursive call using a subset of the original arguments passed on the current L.V.E at the very top of the function definition. This implies, for example, that the arguments are going to be fully traversed until reaching the based condition, point after which backtracking will occur.
  - Think of it as a way for us to have a variable attached to each value on the arguments passed to the initial function call; this basically allows us to compare one by one starting by the end, going through each stack frame (each of which holds a argument value). At the end, the whole setup/process is kinda like a looping frame (value returned onto previous stack frame, after each comparison, represents the counter; base condition represents the condition to stop looping and the each local variable assignment is like counter increments).

- A helper function can be used inside a wrapping function. This helper will handle the recursive nature of the function, letting the outer/wrapper set any sort of state variable to track the life of the recursive calls.

- We can delay call stack overflowing by using a `TRAMPOLINE` and refactoring our recursive function to return a wrapper function (with the recursive call to itself) instead of the recursive call directly. The size of the call stack using this approach will never jump over 1.