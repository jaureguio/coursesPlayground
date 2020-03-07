# JS Algorithms & DS Masterclass

## 02. Big O Notation 

#### Intro to Big O

Big O notations is a way to determine which code solution is more efficient than others. 

  - It's a "dialect" used to generalize and compare performance between pieces of code.
  - With Big O notation we are able to classify our code using labels, which are set based on the way the code is written.

Why this matters?

  - It's important to have a precise vocabulary to talk about how our code performs.
  - Useful for discussing trade-offs between different approaches.
  - Although someone might argue that the best solution to a problem is the one that solves it ("the best solution is the one we can get to work"), when working with a huge data set we end up facing performance drawbacks, some of which we can minimize writing performant code.
  
    - When our code slows down or crashes, identifying inefficient parts on it can help us find "pain points" in our applications.

The word "better", when measuring code performance, could refer to faster code, less memory-intensive or more readable. In overall, the first two mentioned are the ones that matter the most. Don't miss the fact that readable code lowers mental overhead on readers of our code, helping to understand more easier.

- How to determine which code is faster?:

  ```javascript
    function addUpTo_1(n) {
      let total = 0;
      for (let i=1; i<=n; i++) {
        total += i;
      }
      return total;
    }

    function addUpTo_2(n) {
      return n * (n+1) / 2;
    }
  ```

#### Timing Code

We could add timers before and after the we want to measure:
  
  ```javascript
    var t1 = performance.now();
    addUpTo_1(10000000);
    var t2 = performance.now();
    console.log(`Time Elapsed: ${(t2-t1)/1000} seconds.`)
  ```
After using this approach, there would be no doubt addUpTo_2(n) return results faster than addUpTo_1(n), HOWEVER: 

  - **The problem with time*:**

    - Different machines will record different times.
    - The *same* machine will record different times!
    - For fast algorithms, speed measurements may not be precise enough.


#### Counting Operations

Rather than counting seconds, which are so variable, we could count the number of operations the computer has to perform.

  - addUpTo_2(n) has to perform 3 simple operations ("3 things that take time") independently of n (1 multiplication, 1 addition and 1 division). In contrast, addUpTo_1(n) would have to 5n + 2 operations: 

    - 2 x assignments independent of n ("total" and "i" outside the loop).
    - 2 x n additions and assignments due to "total" reassignments inside the loop.
    - 2 x n additions and assignments when incrementing "i" inside the loop.
    - n comparisons between n and i (loop's predicate checking).

    - Depending on what we count (counting is hard), the number of operations can be as low as 2n or as high as 5n + 2. Regardless the exact number, the important take away is that operations grow roughly proportionally with n. 

    > if n doubles, the number of operations will also double (approximately)

If we were to compare the two trends obtained in a "time elapsed vs n" graph, we would end up noticing that time consumed to execute by addUpTo_1 is proportional to the size of n, whereas for addUpTo_2, time elapsed is practically constant (diffences in time would be insignificance compared to the difference between both function's executions).

```
Time elapsed (ms)
        ^
        |
        |
        |   addUpTo_1(n)
        |     /
        |    /
        |   /
        |  /
        | /
        |/ _ _ _ _ _ _   addUpTo_2(n)  
        '------------------------------> n
```

#### Official Definition to Big O

Big O Notation is a way to formalize "fuzzy" (which means "difficult to explain clearly") counting. It allows us to talk formally about how the runtime of an algorithm grows as the inputs grow. The only important detail is the trend.

*Big O Definition:*

>We say that an algorithm isO(f(n)) if the number of simple operations the compouter has to do is eventually less than a constant times f(n), as n increases.

  - f(n) could be linead (f(n) = n)
  - f(n) could be quadratic (f(n) = n<sup>2</sup>)
  - f(n) could be constant (f(n) = 1)
  - f(n) could be something entirely different (log, etc.)
  
    \* right-hand side represents the runtime grow due to the algorithm's input grow.

    - for example:

      ```javascript
        addUpTo_1(n) // Number of operations is eventually a multiple of n (we say its Big O is O(n) after simplying the notation)
        addUpTo_2(n) // Always 3 operations (we say its Big O is O(1))

        function printAllPairs(n) {
          for (var i = 0; i < n; i++) {
            for(var j = 0; j < n; j++) {
              console.log(i,j);
            }
          }
        }
        // O(n) operation inside of an O(n) operation. Denoted as O(n * n) === O(n^2)
      ```

#### Simplying Big O Expressions

When determining time complexity (Big O focused on time an algorithm takes to execute), there are some helpful rule of thumbs for Big O expressions:

<table>
  <thead>
    <tr>
      <th colspan=2>Rules of Thumb</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan=3>Constants doesn't matter</td>
      <td>O(2n) ---> O(n)</td>
    </tr>
    <tr>
      <td>O(500) ---> O(1)</td>
    </tr>
    <tr>
      <td>O(13n<sup>2</sup>) ---> O(n<sup>2</sup>)</td>
    </tr>
    <tr>
      <th rowspan=3>Smaller terms don't matter</td>
      <td>O(n+10) ---> O(n)</td>
    </tr>
    <tr>
      <td>O(1000n+50) ---> O(n)</td>
    </tr>
    <tr>
      <td>O(n<sup>2</sup>+5n+8) ---> O(n<sup>2</sup>)</td>
    </tr>
  </tbody>
</table>

**Big O Shorthands**

  1. Arithmetic operations are constant.
  2. Variable assignment is constant.
  3. Accessing elements in an array (by index) or object (by key) is constant.
  4. In a loop, the complexity is the length of the loop times the complexity of whatever happens inside the loop.
  
  - *These not always apply, but is a good starting point*

    ```javascript
      function logAtLeast5(n) { // O(n), the function will always make 5 or more simple operations
        for (var i = 1; i <= Math.max(5,n); i++) {
          console.log(i);
        }
      }

      function logAtMost5(n) { // O(1), the function will always make up to 5 simple operations when n > 5
        for (var i = 1; i <= Math.min(5,n); i++) {
          console.log(i);
        }
      }
    ```

#### Space Complexity

We can also use Big O Notation to analyze space complexity: how much additional memory do we need to allocate in order to run the code in our algorithm.

  - Auxiliary Space Complexity: refer to the space required by th algorithm, not including the space taken up by the inputs.

*Rules of thumb:*
  - Most primitives (booleans, numbers, undefined, null) are constant space.
  - String require O(n) space (where n is the string length).
  - Reference types are generally O(n), where n is the length (for arrays) or the number of keys (for objects).

#### Logarithm Complexity

Sometimes Big O expressions involve more complex mathematical expressions, such as logarithms.

> The logarithm of a number roughly measures the number of times we can reduce that number by 2 (in case of a log<sub>2</sub>) before we get a value that's less than or equal to one.

```
  log(8) = 3 (implicitly base 2)
  log(25)  = 4.64 
```

Logarithmic time complexity O(log(n)) is great; it comes right next to O(1):

  - Certain searching algorithms have time complexity.
  - Efficient sorting algorithms involve logarithms.
  - Recursion sometimes involves logarithmic space complexity.

#### Recap

 - To analyze the performance of an algorithm, we use Big O Notation.
 - Big O Notation can give us a high level understanding of the time or space complexity of an algorithm.
 - Big O Notation doesn't care about precision, only about general trends (linear? quadratic? constant?)
 - The time or space complexity (as measured by Big O) depends only on the algorithm, not the hardware used to run the algorithm.

## 03. Analyzing Performance of Arrays And Objects

#### The Big O of Objects

Objects are unordered, key-value pairs. They work very nice when we don't need order or when we fast access / insertion and removal.

  <table>
    <tr><th colspan=2>Big O of Objects</th></tr>
    <tr><td>Insertion</td><td>O(1)</td></tr>
    <tr><td>Removal</td><td>O(1)</td></tr>
    <tr><td>Searching</td><td>O(n)</td></tr>
    <tr><td>Access</td><td>O(1)</td></tr>
  </table>
  
  \* Handling a certain property inside objects is really fast because items in it don't rely on ordered indexing, but on unique keys (commonly associated with the value it holds) to be identified.

  <table>
    <tr><th colspan=2>Big O of Object Methods</th></tr>
    <tr><td>Object.keys</td><td>O(n)</td></tr>
    <tr><td>Object.values</td><td>O(n)</td></tr>
    <tr><td>Object.entries</td><td>O(n)</td></tr>
    <tr><td>hasOwnProperty</td><td>O(1)</td></tr>
  </table>
  
  \* Where we get a O(n) is because it involves looping or checking each item in the object (to retrieve keys, values or entries). 

#### The Big O of Arrays

Arrays are ordered data structures. We use them when we need ordered storage of items and fast access / insertion and removal (this does not apply when manipulating the front of the arrays).

  <table>
    <tr><th colspan=2>Big O of Arrays</th></tr>
    <tr><td>Insertion</td><td>O(n) on front, 0(1) on back</td></tr>
    <tr><td>Removal</td><td>O(n) on front, 0(1) on back</td></tr>
    <tr><td>Searching</td><td>O(n)</td></tr>
    <tr><td>Access</td><td>O(1)</td></tr>
  </table>

  \* Insertion and removal from the back of the array (.pop(), .push()) is faster than doing the same in front of it (.shift(), unshift()) because in the latter we end up needing to reorder all the items in the array.

  <table>
    <tr><th colspan=2>Big O of Array Methods</th></tr>
    <tr><td>push</td><td>O(1)</td></tr>
    <tr><td>pop</td><td>O(1)</td></tr>
    <tr><td>shift</td><td>O(n)</td></tr>
    <tr><td>unshift</td><td>O(n)</td></tr>
    <tr><td>concat</td><td>O(n)</td></tr>
    <tr><td>slice</td><td>O(n)</td></tr>
    <tr><td>splice</td><td>O(n)</td></tr>
    <tr><td>sort</td><td>O(n*log(n))</td></tr>
    <tr><td>forEach/map/filter/reduce/etc.</td><td>O(n)</td></tr>
  </table>

  \* Methods that involve reordering (all but push() and pop() in the table above), means manipulation of potentially all items in the array.

## 04. Problem Solving Approach

#### Problem Solving

In order to success our problem solvings capabilities, we need to have good foundations on algorithms. This is because almost everything we do in programming involves some kind of algorithm.

  >An algorithm is a process or set of steps to accomplish a certain task.
How we can improve?

  1. Devise a plan for solving problems.
  2. Master common problem solving patterns.

We could approach future problems with the following strategy / steps:

  1. Understand the problem:

    - Try to restate the problem with other (own) words.
    - Identify inputs of the problem.
    - Identify the outputs that should come from the problem solution.
    - Can the outputs be determined from the inputs? In other words, there's enough information to solve the problem?
    - Labeling function, inputs and output with appropiate names.

  2. Explore concrete examples:

    - Coming up with examples can help us understand the problem better.
    - Examples also provide sanity checks that the eventual solution works how it should (this can be user stories, unit tests, etc.)
    - Explore examples:
      - start with simple examples.
      - Progress to more complex examples.
      - Explore examples with empty inputs.
      - Explore examples with invalid inputs.

  3. Break it down:

    - Explicitly write out the steps we need to take.
    - This force us to think about the code we'll write before we write it, and helps catch any constant/persisting conceptual issues or misunderstanding before we dive in and have to worry about details (e.g. language syntax).

  4. Solve/Simplify:

    - Find the core difficulty in the current task.
    - Temporarily ignore the difficulty.
    - Write a simplified solution.
    - Then Incorporate that difficulty back in.

  5. Look back and refactor:

    - Refactoring questions: 
      - Can we check the result?
      - Can we derive the result differently?
      - Can we understand it at a glance?
      - Can we use the result or method to solve other problem? (reusability)
      - Can we improve the performance of the solution?
      - Can we think of other ways to refactor?
      - How have other people solve this problem?

## 05. Problem Solving Patterns

After devising a common plan to follow when facing a problem, we know should focus on the specifics of problem solving patterns. Some patterns can be summarized as follows:

  - Frequency Counter (author's own term)
  - Multiple Pointers (author's own term)
  - Sliding Window
  - Divide and Conquer
  - Dynamic Programming
  - Greedy Algorithms
  - Backtracking
  - ...Many more.

#### Frequency Counter Pattern

This pattern uses objects or sets to collect values/frequencies of values. This can often avoid the need for nested loops or O(n<sup>2</sup>) operations with arrays / strings.

  ```javascript
  /* Frequency Counter Pattern */

  // Anagrams: is valid anagram?

  function frequencyCounter(str) {
    var objCounter = {};
    for (let char of str) {
      objCounter[char] = (objCounter[char] || 0) + 1;
    }
    return objCounter;
  }

  function validAnagram(str1, str2) {
    if (str1.length !== str2.length) return false;

    var str1Frequency = frequencyCounter(str1) // objects with shapes like, for example: { h: 1, e: 1, l: 2, o: 1}
    var str2Frequency = frequencyCounter(str2)

    for (let key in str1Frequency) {
      if (!(key in str2Frequency)) return false;
      if (str1Frequency[key] !== str2Frequency[key]) return false;
    }
    return true;
  }
  ```
  - This approach might seen more complicated or complex than implementing a nested loop (one loop holding values in an item, a nested loop holding values in the other item), however, from Big O lens it is more efficient even thoug it is applying multiple separte loops. In the long run, with bigger items, we end up seen benefits of this approach.
  - The idea behind this pattern is that it constructs a profile, usually using an object, breaking down the contents of an array or string (generally, a linear structure), allowing quick comparison with another object profile constructed from another linear structure.

#### Multiple Pointers

This patterns is based on the creation of pointers or values that correspond to an index or position in a linear structure (like arrays or strings) and move towards the beginning, end or middle based on a certain condition.

  - Very efficient for solving problems with minimal space complexity as well.
  - In order for it to work as expected, the structure should be sort in a particular way (an array of numbers with ascendant sorting for example).

Take the following example:

  - Write a function called sumZero which accepts a sorted array of integers. The function should find the first pair of numbers where the sum is 0 and return an array that includes both values that sum to zero or undefined if a pair does not exist:

  ```javascript
    // Naive implementation, where time complexity is O(n^2) and space complexity is O(1)
    function sumZero(arr) {
      for (let i = 0; i < arr.length; i++) {
        for(let j = i+1; j < arr.length; j++) {
          if (arr[i] + arr[j] === 0) {
            return [arr[i], arr[j]];
          }
        }
      }
    }

    // Refactoring applying Multiple Pointers, where time complexity is O(n) and space complexity is O(1)
    function sumZeroMP(arr) {
      var left = 0;
      var right = arr.length - 1;
      while(left < right) {
        let sum = arr[left] + arr[right];
        if (sum === 0) {
          return [arr[left], arr[right]];
        } else if(sum > 0) {
          right--;
        } else {
          left++
        }
      }
    }
  ```
  - The refactor using multiple pointers make use of the fact that the position of both smallest and largest number are known (front and back of array respectively). Knowing the required condition to solve the problem, we determine how we should move the pointer positions.

  - Note that the initial position of the pointers can vary based on the problem (both at the same index, one after the other, located opposite one another, etc)

  ```javascript
    // an example where pointers are initially located one after the other:
    function countUniqueValues(arr) {
      if (!arr.length) return 0;
      var i = 0;
      for (let j = 1; j < arr.length; j++) {
        if (arr[i] !== arr[j]) {
          i++;
          arr[i] = arr[j]
        }
      }
      return i + 1;
    }
  ```
#### Sliding Window

This pattern involves creating a window which can either be an array or number from one position to another. Depending on a certain condition, the window either increases or closes (and a new window is created). Very useful for keeping track of a subset of data in an array/string, etc.

  - It can be thought of this pattern as if it creates different subset of data from a linear structure in an iterative way, which allows to determine information between these different subsets.

Take the following example:

  - Write a function that determines the maximum value from adding n consecutive numbers inside an array of numbers.

    ```javascript
      // Naive implementation traversing the array with nested loops:
      function maxSubArraySum(arr, num) {
        if (num > arr.length) return null;
        var max = -Infinity;
        for (let i = 0; i < arr.length - num + 1; i++) { // the condition makes the loop iterate until ther is num values left in the array
          temp = 0;
          for (let j = 0; j < num; j++) { // condition that performs num iterations starting from i index
            temp += arr[i+j]
          }
          if (temp > max) {
            max = temp;
          }
        }
        return max;
      }

      // Refactoring applying Sliding Window pattern:
      function maxSubArraySum(arr, num) {
        var maxSum = 0;
        var tempSum = 0;
        if (arr.length < num) return null;
        for (let i = 0; i < num; i++) {
          maxSum += arr[i];
        }
        tempSum = maxSum;
        for (let i = num; i < arr.length; i++) {
          tempSum = tempSum - arr[i - num] + arr[i];
          maxSum = Math.max(maxSum, tempSum);
        }
        return maxSum;
      }
    ```

    - The idea when implementing the Sliding Window approach is to loop the array to perform the first subset addition and then, another loop to add and substract the right and left values around the sliding window (which is represented by the first subset of elements we added together in the initial loop). This last step creates a new window (subset of values), which we can think of as moving towards the back of the array with each iteration of the second loop.

#### Divide and Conquer

This pattern involves dividing a (larger) set of data (usually an array, string or even a linked list or tree) into smaller chunks and then repeating the process with a subset of data. This pattern can tremendously decrease time complexity.

  - Once again, this pattern relies on the structure on which it's going to be used been sorted on some way. 

Take the following example:

  - Given a sorted array of integers, write a function called "search", that accepts a value and returns the index where the value passed to the function is located. If the value is not found, return -1.

    ```javascript
      // Naive implementation where the array is potentially traversed entirely.
      function search(arr, val) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === val) {
            return i;
          }
        }
        return -1;
      }

      // Refactoring applying Divide and Conquer pattern:
      function search(arr, val) {
        var min = 0;
        var max = arr.length -1;
        while (min <= max) {
          let middle = Math.floor((min + max) / 2);
          let currentElement = arr[middle];

          if (currentElement < val) {
            min = middle + 1;
          }
          else if (currentElement > val) {
            max = middle - 1;
          }
          else {
            return middle;
          }
        }
        return -1;
      }

      search([2,3,5,7,7,9,14,15,16,17,18,21,22,23,25,29,32,33,34,35], 18) // 10
      search([2,3,5,7,7,9,14,15,16,17,18,21,22,23,25,29,32,33,34,35], 19) // -1
    ```
    - The refactored solution, implementing Divide and Conquer, takes both front and back values of the array initially, combines them and checks if a given condition is fulfilled. If the latter is not fulfilled, depending on the result, a subset of the array is discarded and the the process is repeated on the subset of the array kept until there are no more values to check. 