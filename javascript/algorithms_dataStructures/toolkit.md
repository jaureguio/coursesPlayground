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