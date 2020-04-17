# Concept/Approaches to Solve problems

- Initialize DS to keep track/memoize partial solutions to problems (remembering subproblem results).
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