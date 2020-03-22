# Intermediate Python

## 01 Introduction

#### Python Philosophy

The Zen of Python is included as an easter egg in the Python REPL. We can read it by typing `import this` iin the REPL, to lear more about the principles and philosophy behind Python.

  ```python
    >>> import this
    The Zen of Python, by Tim Peters

    Beautiful is better than ugly.
    Explicit is better than implicit.
    Simple is better than complex.
    Complex is better than complicated.
    Flat is better than nested.
    Sparse is better than dense.
    Readability counts.
    Special cases aren't special enough to break the rules.
    Although practicality beats purity.
    Errors should never pass silently.
    Unless explicitly silenced.
    In the face of ambiguity, refuse the temptation to guess.
    There should be one-- and preferably only one --obvious way to do it.
    Although that way may not be obvious at first unless you're Dutch.
    Now is better than never.
    Although never is often better than *right* now.
    If the implementation is hard to explain, it's a bad idea.
    If the implementation is easy to explain, it may be a good idea.
    Namespaces are one honking great idea -- let's do more of those!
  ```

  - Simpler is better than complex:

    - Generally, Python programmers prefer to be explicit and write simple, understandable and maintainable code instead of ego flexing and writing unnecessarily complex code.

#### Converting Between Types

Easily converting between different datatypes is one of Python's "superpowers". 

  - String operations:

    - Strings have two functions for splitting and joining (`split()` and `join()`). Calling `split()` on a string will convert it into a list containing each letter in the string as an item (this function receives a delimiter to divide the string). The `join()` function is used on lists to convert them into strings; this function is called on the delimiter string and receives the list to join as argument. *Both of these functions returns a copy of the string/list*
    

  ```python
    student = "Oscar,20,Math"
    student.split(",") # ["Oscar", "20", "Math"]

    ", ".join(student) # "Oscar, 20, Math"
    
  ```

We can convert between types very easily using the built-in objects to create types in Python:

  ```python
    csv_row = "the,quick,brown,fox,quick,the"
    cvs_as_list = csv_row.split(",") # ["the", "quick", "brown", "fox", "quick", "the"]
    set(cvs_as_list) # {"the", "quick", "brown", "fox"}
    sorted(set(cvs_as_list)) # ["brown","fox", "quick", "the"] the set is converted automatically to a list in order to be sorted by the sorted() function
  ```

## 02. Comprehensions

Comprehensions allow us to write for loops and create lists in Python in a condensed and more readable way.

#### List Comprehensions

List comprehension consists of brackets containing and expression followed by a `for` clause, the zero or more `for` or `if` clauses. The expressions can be any kind of Python object. List comprehensions will commonly take the form of `[<value> for <vars> in <iter>]`

  - A simple case: say we want to turn a list of strings into a list of string lengths:

  ```python
    names = ["Oscar", "Esteban", "Jauregui", "Agostini"]
    my_list = [] # empty list

    # regular for loop
    for name in names: 
      my_list.append(len(name))

    print(my_list) # [5, 7, 8, 8]

    # list comprehension
    #
    # in this case the retunr value of this list comprehension is a list of None's because the append() function over a list does return anything. However, my_list will be filled with the length of each word on names.
    [my_list.append(len(name)) for name in names] 
    
    print(my_list) # [5, 7, 8, 8]
  ```

  - The *first part* on a list comprehension is the action to perform over each item in the list, the *second part* is the definition of the loop (as commonly applied so far in Python) and for the *third part* we can specify conditional statements to be checked on the value from the current iteration.

    ```python
      names = ['Oscar', 'Esteban', 'Katiuska', 'Beatriz']

      ", ".join([f"Name is {name}" for name in names])
      # returns 'Name is Oscar, Name is Esteban, Name is Katiuska, Name is Beatriz'
    ```

  - Example using conditional statements in a list comprehension:

    ```python

      # range(6) returns a list of number from 0 to 5
      # even_squares = [0, 4, 16]
      even_squares = [num * num for num in range(6) if num % 2 == 0] 

      ", ".join([str(even_square) for even_square in even_squares])
      # returns '0, 4, 16'
    ```

#### List Operations

Python comes with various built-in list operations represented as functions like `sum(my_list)`, `max(my_list)`, `min(my_list)`, `sorted(my_list, reverse=True)`, amongst other

  ```python
    lottery_numbers_string = "4, 5, 134, 10"
    lottery_nums = lottery_numbers_string

    lottery_nums.split(", ")
    # ['4', '5', '134', '10']

    max([int(num) for num in lottery_nums.split(", ")])
    # 134
  ```


#### Sets & Dictionaries

Comprehensions can also be implemented based upon other data structures like dictionaries and sets.

  ```python

    #
    # SET comprehension
    #
    
    {num*num for num in range(11)}
    # {0, 1, 64, 4, 36, 100, 9, 16, 49, 81, 25} no sorting due to the nature of sets

    dups_names = ['Oscar', 'Esteban', 'Oscar']
    set(dups_names) # {'Esteban', 'Oscar'}

    set([len(name) for name in dups_names]) # {3, 4} 

    #
    # DICTIONARY comprehension
    #
    {num: num*num for num in range(11)}
    # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25, 6: 36, 7: 49, 8: 64, 9: 81, 10: 100} 
  ```

#### Generator Expressions

Also referred to as Generator Comprehension, allow to improve memory usage and performance in general, specially when dealing with large data structures, because these objects generate values when looping over them.

  - Generator expressions lazily produce values. They cannot be subscriptable, i.e. they cannot be accessed by specifying an index. 
  - These objects are exhausted once iterated over, meaning that we can only accessed all its values once.

  ```python
    (num * num for num in range(6))
    # <generator object <>genexpr> at 0x107abb6d8>
    my_gen = (num * num for num in range(6))
    my_gen[0]
    # TypeError: 'generator' object is not subscriptable

    # values from a generator can only be extracted from looping (for loops or list comprehensions)
    for num in my_gen:
      print(num)
    # 0 1 4 9 16 25
  ```

  - Because generator structures are not actually in memory, generators don't necessarily have to have an end.
  - Generators only *know* where they are in the present and what its next value is. Nothing besides this is known by a generator (nor past values nor future ones pass the next value)

#### Slicing Lists

We can generate copies of a list using list slicing as with the following syntax:

  ```python
    names = ['Oscar', 'Max', 'Rose', 'Jimmy']
    names[0] # Oscar
    names[-1] # Jimmy
    names[0:3] # ['Oscar', 'Max', 'Rose']
    names[:2] # ['Oscar', 'Max']
    names[:] # ['Oscar', 'Max', 'Rose', 'Jimmy']

    my_string = "Hello, World!"
    my_string[-1] # '!'  
    my_string[-10:-4] # 'lo, Wo'

    my_list = list(range(10))
    my_list # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    my_list[::2] # [0, 2, 4, 6, 8] The third parameter represents the step used to traverse the list/string
    my_list[::-1] # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    my_list # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] original list remain unchanged
    my_list[1:7:2] # [1, 3, 5]
  ```

#### zip Function

Takes values from different arrays, and one by one it puts them inside a tuple. It returns a generator object.

  ```python
    players = ['Oscar', 'Esteben', 'Jauregui']
    scores = [100, 5, 97]

    zip(players, scores) # <zip object at 0x107abeac8>
    for item in zip(players, scores):
      print(item)

    # ('Oscar', 100)
    # ('Esteban', 5)
    # ('Jauregui', 97)

    for name, score in zip(players, scores):
      print(f"Name: {name} had a score of {score}")

    # Name: Oscar had a score of 100
    # Name: Esteban had a score of 5
    # Name: Jauregui had a score of 97

    # using lists
    my_lists1 = [1,2,3]
    my_lists2 = ['a','b']
    zip(my_lists1, my_lists2) # [(1, 'a'), (2, 'b')]

    # We can obtain a dictionary out of manipulating a generator object and zip as well
    dict(zip(players, scores))
    # {'Oscar': 100, 'Esteban': 5, 'Jauregui': 97}
  ```

## 03. OOP

#### Object Oriented Programing