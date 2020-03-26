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

Object-Oriented Programming (OOP) is a language model (or *paradigm*) in which properties or behaviors are organized into "objects".

  - An object can be a function, a variable, a property, a class... *everything in Python is an object. We can think of an object as a generic container.
  - Getting familiar with OOP will help us encapsulate our code into objects for better organization and readability, as well as increase efficiency by making our code easily reusable. 

#### Classes

Every thing or object in Python is an instance of a *class*. The number `42` is an instance of the class `int`. The string `Hello, World` is an instance of the `str`(string)  class. these classes in turn are subclasses of the master object class.

*Classes vs Instances*

  - We can think of a class as a 'type' of something, like 'Car'. We can think of an instance as a specific thing, such as 'my Volkswagen', which is a type of 'Car'.
  - Both classes and instances can have variables and methods. Changing a class will change what is returned when we get that variable from an instance, however changing an instance variable only applies to that one instance.

  ```python
    # the number 5 is an instance of the class (type) int
    type(int(5)) # <class 'int'>
    # the class 'int' is a type of class
    type(int) # <class 'type'>
  ```

All instance methods implicitly receive a parameter representing the instance being created from the class, commonly called `self`. When defining a class and the instance methods for it, we have to be aware to declare a parameter for the implicit `self` argument passed to them.

  ```python
    #
    # cars.py
    #
    class Car:
      runs = True

      def starts(self, name):
        self.name = name 
        if self.runs:
          print(f"The {self.name}'s engine is working")
        else:
          print(f"The {self.name}'s engine is not working!")

    my_volkswagen = Car()
    my_volkswagen.starts("Parati")

    type(Car) # <class 'type'>
    type(my_volkswagen) # <class 'cars.Car'>
    isinstance(my_volkswagen, Car) # True
  ```
  - When working from the REPL we can import a library called `importlib`, and use its `reload()` method, which receives a module as argument and keeps the current REPL session updated with the latest change from the module.

  ```python
    # The following code is assumed to be run in the REPL
    import importlib
    import cars
    #
    # Some changes made to cars.py
    #
    import importlib.reload(cars) # changes will be loaded into the REPL
  ```

#### Initializer Method

There are some special methods a class definition can have and which are not meant to be accessed directly neither from the class itself nor and instance.

  - Special methods in Python are represented with a double underscore before and after the name of the method.
  - The __init__ method is meant to be used to specify what should be configured in an instance at the moment of instantiation. This method should receive at least the `self` implicit argument and any additional parameters are passed as arguments on the class.

  ```python
    class Car:
      def __init__(self, name):
        self.name = name
        self.runs = False
        print(f"New Car instantiated, model {self.name}")

    my_volkswagen = Car("Parati")
    # New Car instantiated, model Parati
  ```

#### Class Methods

Class methods are the ones that can be accessed without needing to instatiate the class. These cmethods are declared using the `@classmethod` decorator followed by a standard method definition. Class methods are used for special cases and they are not as common as instance methods.

  - Class methods implicitly receives an arguments that representing the class itself. It is usually called `cls`
  - Instances can access class methods.

  ```python
    class Car:
      num_of_wheels = 4

      # ...
      
      @classmethod
      def get_number_of_wheels(cls):
        return cls.num_of_wheels
    
    print(Car.get_number_of_wheels()) # 4
  ```

#### Types, isinstance & issubclass

Python comes with built-in methods to allow us to inspect objects and determine information about their nature with respect to OOP.

  - `type(obj)` returns the type of the object (or instance)provided.
  - `isinstance(inst, cls)` returns `True` is `inst` is instance of `cls`, otherwise `False`
  - `issubclass(subcls, cls)` returns `True` is `subcls` is subclass of `cls`, otherwise `False`
  
    - A subclass is defined passing a class already defined as argument to the definition of a new class declaration:
    
  ```python
    class Vehicle:
      # ...

    # Defining a subclass of Vehicle
    class Motorcycle(Vehicle):
      # ...   
  ```

#### __str__ & __repr__

Python comes with two methods that allow us to get the string (`str(obj)`) representation of an object and the instruction needed to tell Python to create an instance from a given object/class (`repr(obj/cls)`)

 ```python
  import datetime
  now = datetime.datetime.now()
  print(str(now)) # 2020-03-22 23:48:45.770420

  print(repr(now)) # datetime.datetime(2020, 3, 22, 23, 48, 45.770420)
 ```

  - We can define what both these function are going to return we passing a custom class created by us.

  ```python
    #
    # cars.py
    #
    class Car:
      # ...
    
    my_car = Car("Parati")

    print(my_car)) # <cars.Car object at 0x10234c0> - Useless information about our instance

    # How about defining the special __str__ and __repr__ methods on the class?
    class Car:
      # ...
      
      def __str__(self):
        return f"My car the {self.name} currently {self.runs}"
      
      def __repr__(self):
        return f"Car({self.name})"
      
    my_car = Car("Parati")
    str(my_car) # My car the Parati currently True
    repr(my_car) # Car("Parati")
  ```

#### Inheritance

Sometimes we might want to have shared properties amongst classes. Inheritance is a way for us to have classes that share attributes.

  - Sharing properties and methods between classes help us to break up and organize our code in a hierarchy from more generic to more specific. Objects that belong to classes higher up the hierarchy; these are accessible via the more specific subclasses, but not viceversa.

  ```python 
    class Vehicle:
      
      def __init__(self, make, model, fuel="gas"):
        self.make = make
        self.model = model
        self.fuel = fuel
      
      def __str__(self):
        return f"This is a new Vehicle, my {self.model}"

      def is_eco_friendly(self):
        if self.fuel == "gas":
          return False
        else:
          return True

    class Car(Vehicle): # This is how inheritance is implemented

      def __init__(self, make, model, fuel="gas", num_wheels=4):
        # the super() method allow us to reference the class we are inheriting from in this subclass
        # Calling the __init__ method from an inherited class brings all properties AND instance methods from it into the subclass
        super().__init__(make, model, fuel)
        self.num_wheels = num_wheels # Only available on instances of the Car subclass

    four_by_four = Vehicle("Toyota","Tundra", fuel="diesel")
    print(four_by_four) # This is a new Vehicle, my Tundra
    print(four_by_four.is_eco_friendly()) # True
    try:
      four_by_four.num_wheels 
    except AttributeError as error:
      print(error)
    # AttributeError: 'Vehicle' object has no attribute 'num_wheels'

    my_volkswagen = Car("Volkswagen", "Parati")
    print(my_volkswagen) # This is a new Vehicle, my Parati
    print(my_volkswagen.is_eco_friendly()) # False
    print(my_volkswagen.num_wheels) # 4

    print(issubclass(Car, Vehicle)) # True
  ```

  - It is important to point out that a subclass can inherit from multiple classes.

  *When running a Python file from the terminal, we can specify the -i flag before typin the file name in order to open a REPL after executing the contents of the file*

## 04. Exceptions

#### Exception Types

Errors that happen during parsing are called `SyntaxError`'s. These will probably be the most common error we will see, and usually happen because of a mistake in whitespace, a syntax misunderstanding, or a simple typo.

Even if the syntax is correct, errors can still occur when our program is run. We call these `Exceptions`, and there are many different types (the more specific the error description, the better)

  - An unhandled error is fatal: it will print debugging information (called a traceback), stop the interpreter, and exit the program. Handling errors will make our programs more robust in the face of issues.

*Type of Exceptions*

Exception | Cause of Error
---- | ----
`AttributeError` | Raised when attribute assignment or reference fails.
`ImportError` | Raised when the imported module is not found.
`IndexError` | Raised when index of a sequence is out of range.
`KeyError` | Raised when a key is not found in a dictionary.
`KeyboardInterrupt` | Raised when the user hits interrupt key (Ctrl+c or delete)
`NameError` | Raised when a variable is not found in local or global scope.
`SyntaxError` | Raised by parser when syntax error is encountered.
`IndentationError` | Raised when there id incorrect indentation.
`ValueError` | Raised when a function gets argument of correct type but improper value.

\* More types of errors can be found in Python's official docs.

*Exception Hierarchy*

An important thing to know is that exceptions, like everything in Python, are just objects. They follow an inheritance hierarchy, just like classes do. For example, the `ZeroDivisionError` is a subclass of `ArithmeticError`, which is a subclass of `Exception`, itself a subclass of `BaseException`.

If we wanted to catch a divide-by-zero error, we could use except `ZeroDivisionError`. But we could also use `except Exception`, but this is not a good idea, as it will catch almost *every* type of error, even ones we weren't expecting.

#### try except

Many languages have the concept of the "Try-Catch" block. Python uses four keywords: `try`, `except`, `else` and `finally`. Code that can possibly throw an exception goes in the `try` block. `except` gets the cod that runs if an exception is raised in the `try` block, and `finally` is an optional block of code that will run last, regardless of if an exception was raised.

  ```python
    try
      x = int(input("Enter a number: "))
    except ValueError:
      print("That number was invalid")
  ```

  - The `except` clause may have multiple exceptions, given as a parenthesized tuple:

  ```python
    try:
      # code to try
    except (RuntimeError, TypeError, NameError):
      # Code to run if one of these exceptions is hit/raised
  ```

  - A `try` statement can also have more than one `except` clause:

  ```python
    try:
      # Code to try
    except RuntimeError:
      # Code to run if there's a RuntimeError
    except TypeError:
      # Code to run if there's a TypeError
    except NameError:
      # Code to run if there's a NameError
  ```

  - A good use for `finally` is for doing any cleanup that we want to happen, whether or not an exception is thrown:

  ```python
    try:
      raise KeyboardInterrupt
    finally:
      print("Goodbye!)
    # Goodbye!
    # Traceback (most recent call last):
    #   File "<stdin>", line 2, in <module>
    # KeyboardInterrupt
  ```

#### Best Practices

*Catch More Specific Exceptions First*

  - Remember, our `except` handlres are evaluated in order, so be sure to put more specific exception first.

  ```python
    try:
      my_value = 3.14 / 0
    except ArithmeticError:
      print("We had a general math error")
    except ZeroDivisionError:
      print("We had a divide-by-zero error")
    
    # We had a general math error
  ```

  - When we tried to divide by zero, we inadvertently raised a `ZeroDivisionError`. However, because `ZeroDivisionError` is a subclass of `ArithmeticError`, and `except ArithmeticError` came first, the information about our specific error was swallowed by the `except ArithmeticError` handler, and we lost more detailed information about our error.

*Don't Catch `Exception`*

  - It's a bad form to catch the general `Exception` class. This will catch every type of exception that subclasses the `Exception` class, which is almost all of them. We may have errors that we don't care about and don't affect the operation of our program, or maybe we are dealing with a flaky API and want to swallow errors and retry. By catching `Exception`, we run the risk of hitting an unexpected exception our program actually can't recover from, or worse, swallowing an important exception without properly logging it - a huge headache when trying to debug programs that are failing in weird ways.

*Definitely don't catch `BaseException`*

  - Catching `BaseException` is a really bad idea, because we'll swallow every type of Exception, including `KeyboardInterrupt`, the exception that causes our program to exit when we send a SIGINT (Ctrl-C). Don’t do it.

#### Custom Exceptions

Exceptions are just regular classes that inherit from `Exception` class. This makes it super easy to create our own custom exceptions, which can make our programs easier to follow and more readable. An exception doesn't need to be complicated:

  ```python
    class MyCustomException(Exception):
      pass

    raise MyCustomException()

    # Traceback (most recent call last):
    #   File "<stdin>", line 1, in <module>
    # __main__.MyCustomException
  ```

It's ok to have a custom `Exception` subclass that only `pass`-es - our exceptions doesn't need to do anything fancy to be useful. Having custom exceptions - tailored to our specific use cases and that we can raise and catch in specific circumstances - can make our code much more readable and robust, and reduce the amount of code we write later to try and figure out what exactly went wrong.

  - We can send additional information, like messages, to our exceptions:

  ```python
    class IncorrectValueError(Exception):
      def __init__(self, value):
        message = f"Got an incorrect value of {value}"
        super().__init__(message)
    
    my_value = 9999
    if my_value > 100:
      raise IncorrectValueError(my_value)

    # Traceback (most recen call last):
    #   File "<stdin>", line 2, in <module>
    # __main__.IncorrectValueError: Got an incorrect value of 9999
  ```

*A Custom Exception for our GitHub API app*

  ```python
    class GitHubApiException(Exception):

      def __init__(self,status_code):
        if status_code == 403:
          message = "Rate limit reached. Please wait a minute and try again."
        else:
          message = f"HTTP status code was: {status_code}."

        super().__init__(f"A GitHub API error occurred: {message}")
  ```

## 05. Libraries & Modules

#### Libraries & Modules

