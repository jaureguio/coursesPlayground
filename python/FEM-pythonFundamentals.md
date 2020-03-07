# Python Fundamentals

[Checkout the course's additional material in its website](https://www.learnpython.dev/)

## 01. Introduction

#### Creating a virtual environment

> A virtual environment in Python is a self-contained  directory containing a Python installation for a particular version of Python.
> It's a very useful way to make sure that we're using the right Python version when we are working on a particular project.

```powershell
  mkdir pyworshop
  cd pyworkshop
  py -3 -m venv env
  env\scripts\activate
```
*`env\scripts\activate` is how we activate our virtual environment in Windows. We'll want to do that each time we enter this Python project directly from a new shell*

[Follow the complete set of installation and configuration steps here](https://www.learnpython.dev/01-introduction)

#### Using the Python REPL

- REPL stands for Read, Eval, Print, Loop.

- 3 particular REPL commands are of great help when running code in Python REPL:

    - The type() built-in method returns the type of the passed variable.

      ```python
      type(variable)
      ```

    - dir() takes a variable and based on its type, returns the available methods we could used on it.
    
      ```python
      dir(variable)
      ```

    - help() built-in method provides detailed help about a given type / type's method
    
      ```python
      help(str.upper)
      ```

#### Why Python

- PEP8 is a Python coding standard, that sets guidelines for how our Python code should look like.

  [Check out "Pep8": the style guide for Python](https://pep8.org/)

#### Code Sample

- To create comments:

  - Use # for line comments.
  - Use """ (open and closing pairs) to create multiple line comments.
  
## 02. Data Types

#### Variables

- Python is a dynamic typed language just like JS.
- Variables are defined using "=", where the left handside specifies the name ans the right handside the value of the variable.
- To specify what in JS is a null value type, we use the None keyword in Python:
  ```x = None``` (equal to var x = null in JS)
- Following Pep8 guidances, variable names should be all lowercase, with an underscore "_" when multiple words needed.

#### Strings

- There several ways of string formatting in Python. The most recently implementend in the language is the "F string" formatting, which allows string interpolation just as template literals in JS.

  - The syntax used is as follows:

    ```python 
    name = oscar
    my_name = f"My name is {name}"
    ```

#### Built-in Methods

- Python offers built-in methods to work with numbers such as int() and float().
  
  - We can pass a string of a number to these methods and they will automatically convert it to the type they represent:

    ```python
    type(int("12")) # will print <class int>
    type(float("0.5")) # prints <class float>
    ```

## 03. Functions

#### Functions and Arguments

- Functions are defined using the "def" keyword. The way Python identifies the scope of a function (its body) is with indentation (in contrast to JS which uses curly brackets {} to denote scope).
- Functions return values using the "return" keyword. If no return statement is specified, the function implicitly returns None.
- Functions can have parameters defined, which can be optional as well. Default parameters are also available in Python just like in JS.

  ```python
    def add_numbers(x, y):
      return x + y
  
    def say_greeting(name, greeting="Hello"):
      print(f"{greeting}, {name}!")

    def create_query(language="JavaScript", num_stars=50, sort="desc"):
      return f"language: {language}, {num_stars} {sort}"
  
    create_query(sort="asc", num_stars=add_numbers(32,3), language="Python") # language: Python, 35 asc
  ```
    - Notice that argument position can be altered if the arguments passed are labeled.

- Functions cannot overwrite variables outside its scope:

  ```python
    x = 1
    y = 2
    def numbers():
      x = 0
      y = -1
      return f"inside the function: x = {x}, y = {y}"

    print(numbers()) # inside the function: x = 0, y = -1

    print(f"outside the function: x = {x}, y = {y}") 
    # outside the function: x = 1, y = 2
  ```

#### Empty Default Lists

- We have to be cautious when defining default parameter values in our functions. Python will share default values across multiple function invocations, meaning that if a mutable value is used as default parameter, this could be potentially mutated across function calls.

  ```python
    def foo(a, b=[]):
      b.append(a)
      print("B is: ", b)

    foo(5) # B is: [5]
    foo(6) # B is: [5,6] DEFAULT VALUE MUTATED  
  ```
- We could alternatively write the function as follows:

  ```python
    def foo(a, b=None):
      if b is None:
        b = []
      b.append(a)
      print(b)
      
    foo(5) # B is: [5]
    foo(6) # B is: [6]
  ```

#### Equality checking

- "==" is used to compare two variables defined by us.
- the "is" binary operator is used to usually check variables against primitive ones like True, False and None (check the function foo() defined in the previous code snippet).

## 04. Lists

#### Lists

- Lists can be created using literal notation with [], or with the built-in method list().

- Values inside a list can be override using regular variable assignment syntax, provided the index of the value to override.

  ```python
    my_list = [0,1,2,3]
    my_other_list = list({"a":1, "b": "hello"})

    my_list[1] = 23 # [0, 23, 2, 3]
    
    print(my_list + my_other_list) # List can be concatenated with + operator
    # [0, 23, 2, 3, 'a', 'b']
  ```

- Because checking the length in various data structures in Python is a common task, the language provides us with a len() built-in method to retrieve this information about a structure.

- **_List Cheat Sheet_**

TYPE | List
:-----:|-----
**use**                | used for storing similar items, and in cases where items need to be added or removed
**creation**           | [] or list() for empty list, or [1,2,3] for list with items
**search methods**     | my_list.index(item) or item in my_list
**common methods**     | len(my_list).append(item) to add, insert(index, item) to insert in the middle, pop() to remove.
**in-place sortable?** | Yes. my_list.sort() or my_list.reverse() will sort the list in-place

  - Other built-in methods like sorted() and reverse() will return copies of the given list passed, keeping the original unchanged.

## Adding Items to a List

Method | Result
:-----:|-----
my_list.**append(item)** | adds an item at the end of a list
my_list.**insert(pos, item)** | adds an item at the specified index position
my_list.**extend(item)** | extends a list with another item (commonly another list).

## List Lookups

- We can search for items in a list using various approaches. Keep in mind looking up an item in a large list ends up been a slow operation because every item has to be checked iteratively until requested item is found.

  ```python
    names = ["Oscar", "Esteban", "Jauregui", "Agostini", "Oscar"]
    "Oscar" in names # true

    names.index("Jauregui") # 2
    names.index("Oscar") # 0, returns the first item that matches

    names.count("Oscar") # 2, instances of the given item
    
    names[0] = "Carmen"
    names # ["Carmen", "Esteban", ...

    pos = names.index("Jauregui")
    names[pos] = "Paez"
    names # ["Carmen", "Esteban", "Paez" ...
    len(names) # 5

    names[5] = "Fiona" # IndexError: list assignment index out of range
  ```
- We can also access more than one item at a time in a list, as follows:

  ```python
    my_list = ["h", "e", "l", "l", "o"]
    
    my_list[0:3] # ['h','e','l'] the end index is not inclusive
    my_list[:3] # ['h','e','l'] if no initial index provided, 0 is used by default
    my_list[-1] # ['o'] negative values traverse the list in reverse order
  ```

### Removing Items from a List

  - Removing an item from a list can be done with one of the following methods:

    ```python 
    my_list.remove(item) # removes the first instance found after looping the list

    removedItem = my_list.pop() # removes and returns the last item from the list
    removedItem # item removed in the previous command

    my_list.pop(index) # removes the item at the given index and returns it as well
    ```

## 05. Tuples

#### Tuples

>Tuples are light-weight collections used to keep track of related,but different items. They are immutable, meaning that once a tuple has been created, the items in it can't change. They can't be continually changed, added or removed from like we could with a list.

>A good use of a tuple might be for storing the information for a row in a spreadsheet. That data is read-only. We don't necessarily care about updating or manipulating the data, we just want a read-only snapshot.

- Tuples can be looked up just like in lists, specifying the index for the value we want to look up:

  ```python
    student = ("Oscar", 8, "Math", 3.5)
    student[0] # "Oscar"
  ```
- Another good use-case example of a tuple is when we want to unpack values from a list; tuples ensures unaltered values from further unpacking:

  ```python
    name, age, subject, gpa = student
    name # "Oscar"
    subject # "Math"

    # We cannot retrieve less items that the cointained in a the tuple. We can ignore undesired values using _ (underscore) as the identifier when unpacking

    name, age, subject, _ = student

    def http_status_code():
      return 200, "OK"

    http_status_code() # (200, "OK") <--- a tuple

    code, name = http_status_code()
    code # 200
    name # "OK"
  ```

- **_Tuple Cheat Sheet_**

TYPE | Tuple
:-----:|-----
**use**                | Used for storing a snapshot of related items when we don't plan on modifying, adding or removing data.
**creation**           | () or tuple() for empty tuple. (1,) for one item tuple, or (1,2,3) for a tuple with items.
**search methods**     | my_tuple.index(item) or item in my_tuple
**common methods**     | Can't add or remove from tuples.
**in-place sortable?** | No

- It is important to point out that in a tuple, the usage of "," is more crucial with regard to its creation than the usage of (). For example:

  ```python
    my_typle = 1,2,3 
    type(my_tuple) # <class tuple>

    not_tuple = (1)
    type(not_tuple) # <class int>

    mono_tuple = (1,)  
  ```
## 06. Sets

Sets are datatype that allows us to store other immutable types in an unsorted way. An item can only be contained in a set once, no duplicates allowed.

  - Very fast membershiop testing along with being able to use powerful ser operations, like union, difference and intersection.
  - Sets are identified by curly brackets {}. An empty set can only be created with the set() method ({} represents an empty dict). Sets containing data can be created with curly brackets.
  - Set values are stored by hash indices (Python has a built-in hash() method to obtain the hash value of an item), thats why they cannot be duplicated in the same set. Additionally, sets cannot contain mutable data like lists for example (hashing will be different if the list is modified)

**set cheat sheet**

type | set
:-----:|-----
**use**                | used for storing immutable data types uniquely. easy to compare the items in sets
**creation**           | set() for an empty set ({} makes an empty dict) and {1,2,3} for a set with items in it
**search methods**     | item in my_set
**search speed**     | searching for an item in alrge set is very fast.
**common methods**     | my_set.add(item), my_set.discard(item) to remove the item if it's present, my_set.update(other_set)
**mutable?** | yes. can add to or remove from sets.
**in-place sortable?** | no, because items aren't ordered.

#### Adding, Removing & Updating

  - The .add(item) method on sets is used to add data to a given set.
  - Sets have 2 methods to delete data from them. .remove(item) will delete a given item from a set, throwing an error if the value is not found. On the other hand, we can use .discard(item) on a set to accomplish the same but without an error in case the item is not found.
  - We can combine a set with a data sequence (like another set or a string) using the .update(item) method on sets.

#### Combining, Comparing and Contrasting 

Method Operation | Symbol Operation | Result
:-----:|:-----:|-----
s.union(t) | s \| t | Creates a new set with all the items from both s and t.
s.intersection(t) | s & t | Creates a new set containing only items that are both in s and in t
s. difference(t) | s ^ t | Creates a new set with items in s but not in t

## 07. Dictionaries

Dictionaries are useful types that allow us to store our data in key, value pairs. They themselves are mutable, but dictionary keys can only be mutable types (apply the same criteria as with sets and the hashing of its values).

  - We use them when we want to be able to quickly access additional data associated with a particular key. A great practical application for dictionaries is memoization (storing results from an expensive computation)
  - Looking for a key in a large dict is extremely fast. Unlike list, we don't have to check every item for a match.
  - We can create a dictionary using the built-in method dict() or using {} containing key value pairs.
  - We can use the .get(item, defaultValue) method on dicts to retrieve a value by key in it. If the value is not found, nothing is going to be return (no error either). The optional defaultValue is used to return it in case the key is not found.

**dict cheat sheet**

type | dict
:-----:|-----
**use** | used for storing data in key, value pairs. Keys used must be immutable data types.
**creation** | {} or dict() for an empty dict. {1: "one", 2: "two", "three": 3} for a dict with items.
**search methods** | key in my_dict
**search speed** | searching for an key in large dict is fast.
**common methods** | my_dict.[key] to get the value by key (throw error if not found). my_dict.get(item) is also used to retrieve value by key (this method wont error out if key not found). my_dict.items() for all key, value pairs. my_dict.keys() for all keys, my_dict.values() for all values.
**mutable?** | Yes. Can add to or remove from dicts.
**order preserved** | Sort of. As of Python 3.6 a dict is sorted by insertion order. Items can't be accessed by index, only by key.

#### Adding, Removing & Accessing Keys or Values

  - We can add/overwrite values in a dict providing a key in square brackets and the value after the equal sign:

    ```python
      nums = {"one": 1, "two": 2, "three": 3}
      nums["four"] = 4 # {"one": 1, "two": 2, "three": 3, "four": 4}
    ``` 
  - The `in` keyword can be use to assess if a key is in a dict.
  - Two dicts can be combined with `my_dict.update(another_dict)`

#### Mutability Review

*Simple Types*

  type | use | mutable?
  :---:|---|:---:
  int, float, decimal | store numbers | no
  str | store strings | no
  bool | store True or False | no


*Container Types*  container type | use | mutable?
  :---:|---|:---:

  set | unordered group of mutable items. Useful for set operations (membership, intersection, difference, etc.) | yes
  list | ordered groups of items, accessible by position | yes
  tuple | contain ordered groups of items in an immutable collection | no
  dict | contains key value pairs | yes

## 08. Boolean Logic

Evaluating expression to be True or False will help us control the flow of our program.

  **Boolean cheat sheet**

  type | truthiness
  :-----:|-----
  int | 0 is False, all other numbers are True (including negative)
  containers - *list, tuple, set, dict* | empty container evaluates to False, container with items evaluates to True
  None | False

  - We can use the built-in method bool(item) to check the truthiness of an item:

    ```python
      type(True) # <class 'bool'>
      bool(True) # True
      bool(0) # False
      bool([]) # False
      bool([1,2]) # True
      bool(set()) # False
      bool({1,2}) # True
    ```

#### Comparisons

>It does not make sense to compare items of different types in Python. We could define our own objects, specifying how we can compare them with each other, but comparing built-in types does not make sense to compare them.

  ```python
    3 < 5 # True
    "T" < "t" # True uppercase letters are lower-valued in ASCII
    "a" < "b" # True
    "bat" < "cat" # True
    [1,2,3] == [1,2,3] # True

    a = [1,2,3]
    b = [1,2,3]
    a != b # False

    # To assess equality, use == or !=
    # To assess identity use "is" keyword

    x = None
    x is None # True

    a is b # False variables don't point to the same place in memory
    a == b # True

    a = None
    a is None # True
    a is not None # False
  ```

#### and, or & not

How can we compare different values with each other?

  *and, or, not Cheat Sheet*

  Operator | Result
  :-----:|-----
   a or b | if a is False, then b, else a
  a and b | if a is False, the a, else b
  not a | if a is False, the True, else False

    ```python
      [1] and [2] # [2]
      [] and [2] # []

      [] or [2] # [2]
      [5] or [2] # [5]

      a = False
      b = True
      a and b # False

      [] and {} # []
      [] and {1} # []

      0 or 1 # 1

      "Hello" and None # nothing (None) return
    ```