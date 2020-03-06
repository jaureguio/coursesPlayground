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

- It is important to point out that in a tuple, the usage of "," is more determining with regard to its creation than the usage of (). For example:

  ```python
    my_typle = 1,2,3 
    type(my_tuple) # <class tuple>

    not_tuple = (1)
    type(not_tuple) # <class int>

    mono_tuple = (1,)  
  ```
## 06. Sets

#### 
