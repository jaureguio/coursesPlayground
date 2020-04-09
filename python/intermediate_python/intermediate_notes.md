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

Python comes with two "magic" methods that allow us to get the string (`str(obj)`) representation of an object and the instruction needed to tell Python to create an instance from a given object/class (`repr(obj/cls)`)

  - These methods have to be defined immediatelly after the constructor for the class, or before any custom method defined by us.

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

The Python language was designed to be "batteries included" - it has arich and versatile standard library which is immediately available, without making the user download separate packages. This has given the Python language a head start in many projects. 

  *The Standard Library*

    - There are some great libraries included with Python that we'll probably end up seeing or using frequently. `sys` provides system-specific parameters and functions, such as `exit()`. `os` has miscellaneous operating system interfaces, and provides the excellent `os.path` submodule for handling file paths on any operating system. `math` gives us all the advanced math function. `json` is an easy-to-use json parser and encoder. Python even gives us built-i libraries for database access, logging, internet protocols, multimedia, debugging, and even libraries for extending Python itself. The full list of standard libraries can be found in the Python documentation.

    - A quick example using the datetime library:

  ```python
    import datetime
    right_now = datetime.datetime.now()
    print(right_now)
    # 2020-03-26 13:44:59.063527
    repr(right_now)
    # "datetime.datetime(2020, 3, 26, 13, 44, 590635)'
  ```

#### Module & Imports

Python has a simple packgae structure. Any directory with a file named `__init__.py` can be considered a Python module.

  > a __init__.py file is no longer required for Python 3 modules, but it's still supported and can be useful.

  ```python
    #
    # my_math_functions.py
    #
    def add_numbers(x, y):
      return x + y
    
    #
    # another_file.py in the same folder 
    #
    import my_math_functions
    my_math_functions.add_numbers(1, 2)
    # 3
  ```
#### Best Practices

There are few different ways to import modules or even specific objects from modules. We can import *everything* from a module into the local namespace using `*`:

  ```python
    from my_math_functions import *
    add_numbers(1, 2)
    # 3
  ```
  
  - This isn't a good practice, because it's hard to tell where a specific function is coming from without the namespace context. Also, function names can conflict, and this can make thigs very difficult to debug.

Better is to import functions specifically:

  ```python
    from my_math_functions import add_numbers
    add_numbers(1, 2)
    # 3
  ```

  - This make things a little clearer, as we can look at the top and see where the `add_number()` function came from. 

However, an even better way is to just import the module and use it in calls to maintain the namespace context:

  ```python
    import my_math_functions
    my_math_functions.add_numbers(1, 2)
    # 3
  ```

  - This can be slightly more verbose, but unless it makes our function calls ridicuously long, it generally makes things much easier to debug.
  - We can use the `as` keyword to make things a little easier on ourselves:

  ```python
    import my_math_functions as mmf
    mmf.add_numbers(1, 2)
    # 3
  ```

*PYTHONPATH*

It is a list of paths on our system where Python will look for packages. Python will always look first in the working directory (the folder we're in when we start the REPL or run our program), so if our module folder is there, we can import it. We can also install our modules just like any other external modules, using a `setup.py` file. It's also possible to change or add paths to our `PYTHONPATH` list if we need to store modules elsewhere, but this isn't a very portable solution.

#### PYPI

PyPI (the Python Package Index) is an awesome service that helps us find and install software developed and shared by the Python community. Almost every user-contributed Python package has been published to PyPI. We can browse the site at pypi.org but most of the time we will probably interact with it through Python's `pip` tool.

*Basic Usage*

We can use the `pip` tool to install the latest version of a module and its dependencies from the Python Package Index:

  ```powershell
    (env) > python -m pip install SomePackage
  ```

#### Practice - Standard Library

  ```python
    import os

    my_folder = os.getcwd()
    print(f"Here are the files in {my_folder}:")

    with os.scandir(my_folder) as folder:
      for entry in folder:
        print(f" - {entry.name}")
    
    """ 
    Here are the files in
    C:\Users\pc\Documents\Programacion\coursesPlayground\
    python\pyworkshop\day_two_final:

    - app.py
    - repos
    - requirements.txt
    - static
    - templates
    - test.py
    - __pycache__
    """
  ```

`sys` is another commomly useful library, giving us access to some variables and functions used or maintained by the Python interpreter. Let's try using `sys` to get the arguments passed into our program from the command line, and to figure out what kind of computer we're using:

  ```python
    #
    # sys_library.py
    #
    import sys
    arguments = sys.argv
    print(f"we received the following arguments:")

    for arg in arguments:
      print(f" - {arg}")

    print(f"We are running on a '{sys.platform}' machine")    
  ```

  ```powershell
    (env) > python sys_library.py argument1 hello world "this is one argument"

    We received the following arguments:
    - sys_library.py
    - argument1
    - hello
    - world
    - this is one argument
    We are running on a 'win32' machine
  ```

Pypi (the Python Package Index) is an awesome service that helps us find and install almost any 3rd party Python package. We can browse the site at PyPI.org but most of the time we will probably interact with it through Python's `pip` command line tool.

For example, earlier we may have installed the `requests` module. If we search `pip` for `requests`, we'll see every package in the index containing the word requests:

  ```powershell
    (env) > python -m pip search requests
      requests-hawk (1.0.1)
      - requests-hawk
      requests-auth (5.1.0)
      - Authentication for Requests
      requests-dump (0.1.3)
      - `requests-dump` provides hook functions for requests.
      ...
  ```

  - After determining the library we need, we can install it as follows:

  ```powershell
    (env) > python -m pip install requests
  ```

## 06. Command Line Tools

#### Advanced f-strings

- Decimal Formatting

  We can pass in two fields, `width` and `precision`. The format is `{value:width.precision}`. Let's format pi (3.1415926) to two decimal places - we'll set the width to 1 because we don't need padding, adn the precision to 3, giving us the one number to the left of the decimal and the two numbers to the right:

  ```python
    print(f"Pi to two decimals places is {3.1415926:1.3}")
    # Pi to two decimal places is 3.14

    # let's change the width to 10
    value = 3.1415926
    width = 10
    precision = 3
    print(f"Pi to two decimal places is: {value:{width}.{precision}}")
    # Pi to two decimal places is:       3.14
  ```
  - Note how the second one is padded with extra spaces - the number is four characters long (including the period), so the formatter added six extra spaces to equal the total width of 10.

#### Multiline Strings

Sometimes it's easier to break up large statements into multiple lines. Just prepend every line with `f`:

  ```repl
    message = (
      f"Hello, my name is {name}. "
      f"I can calculate pi to two places: {pi:4.3}. "
      f"But I would rather be eating {food}."
    )
    print(message)

    # Hello, my name is Oscar. I can calculate pi to two places: 3.14. But I would rather be eating pie.
  ```

#### Trimming a string

Python have some very useful functions for trimming whitespace. `strip()` returns a new string after removing any leading and trailing whitespace. `rstrip()` and does the same but only removes trailing whitespace, and `lstrip()` only trims leading whitespace. We'll print our string inside `><` characters to make it clear:

  ```python
    my_string = "    Hello World!   "

    print(f">{my_string.lstrip()}<")
    # >Hello World!    <
    
    print(f">{my_string.rstrip()}<")
    # >     Hello World!<

    print(f">{my_string.strip()}<")
    # >Hello World!<  
  ```

Note the different spaces inside of the brackets. These functions also accept an optional argument of characters to remove:

  ```python 
    my_string = "Hello World!,,,"
    print(my_string.strip(","))
    # Hello World!
  ```

#### Replacing Characters

Strings have a useful function for replacing characters - just call `replace()` on any string and pass in what we want replaced, and what we want to replace it with:

  ```python 
    my_string = "Hello, world!"
    my_string.replace("world", "Oscar")    
    # 'Hello, Oscar!'
  ```

#### str.format() and % formatting

Python has two older methods of string formatting that we'll probably come across at some point. `str.format()` is the more verbose older cousin to f-strings - variables appear in brackets in the string but must be passed in to the `format()` call. For example:

   ```python 
    name = "Oscar"
    print("Hello, my name is {name}".format(name=name))
    # Hello, my name is Oscar
  ```

Note that a variable name inside the string is local to the string - it must be assigned to an outside variable inside the `format()` call, hence `.format(name=name)`.

  - %-formatting is a much older method of string interpolating and isn't used much anymore. It's very similar to the methods used in C/C++. Here. we'll use `%s` as our placeholder for a string, and pass the `name` variable in to the formatter by placing it after the `%` symbol.

  ```python
    name = "Oscar"
    print("Hello, my name is %s" % name)
    # Hello my name is Oscar
  ```

#### Accepting User Input

To Accept basic arguments from the command line, we can use `sys.argv`. `argv` is a list that gets passedd in to our program that contains whatever arguments our program was started with. Start a new Python file called `cli_exercise.py` and enter the following:

  ```python
    #
    # user_input.py
    #
    import sys
    args = sys.argv
    print(args)
  ```

  ```powershell
    (env) > python user_input.py
    ['user_input.py']

    (env) > python user_input.py argument1 argument2 "hello world"
    ['user_input.py', 'argument1', 'argument2', 'hello world']
  ```

  - `sys.argv` is never empty - the first element in the list will always be the name of the Python file we're running. Note that the name of the file we're running is rarely useful, so it's common to see this omitted with using slices: `sys.argv[1:]`

  - We can also accept user data inside a running program by using `input`.

  ```python
    name = input("Hello, what is your name? ")

    birthday_string = input(f"Hello {name}. Please enter your birthday in MM/DD/YYY format: ")
    
    print(f"Hello {name}. Your birthday is on {birthday_string}.")
  ```

## 07. Testing

Thankfully, because of Python's "batteries included" philosophy, all the tools we need for unit testing are included in the standard library. 

Unit testing is a software testing method by which individual functions are tested in an automated fashion to determine if they are fit for use. Automated unit testing not only helps you discover and fix bugs quicker and easier than if we weren't testing, but by writing them alongside or even before our functionsk, they can help us write cleaner and more bug-free code from the very start.

#### Types of Tests

There are several different kinds of automated tests that can be performed at different abstraction levels:

  - **Unit tests** operate on the smallest tesetable unit of code, usually a function that performs a single action or operation.
  - Integration tests check to see if different units or modules of code work together as a group.
  - Functiona tests operate on units of functionality, to make sure a specific function of the software is working, which may involve several units of software or whole systems working together.

> Many companies that invest in software development maintain a CI/CD (continuos Integration or Continuos Deployment) pipeline. This usually involves extensive unit tests, integration tests and maybe even functional tests, which are set up to run automatically after (and sometimes even before) code is committed. If the tests fail, deployment can be stopped and the developers notified before broken code ever makes it to production servers. This can be complicated to set up properly, but saves an enormous amount of time in the long run, and helps to keep bugs from ever reaching our users.

#### Assertions

Python comes with an `assert` keyword that we can use for simplr sanity checks. An assertion is simply a boolean expression that checks if its conditions return true or not. If the assertion is true, the program continues, otherwise, it throws an `AssertionError` and the program stops.

  ```python
    input_value = 25
    assert input_value < 0

    # Traceback (most recent call last):
    #   File "<stdin>", line 1, in <module>
    # AssertionError
  ```

  *`assert` is for sanity checks, not for production*

  - Assertions can be disabled at run time, by starting the program with `python -o`, so we shouldn't rely on assertions to run in production code. Don't use them for validation!

#### Writing Tests

There are a few different frameworks for writing unit tests in Python, but they're all very similar. We'll focus on the built-in `unittest` library. `unittest` is both a framework for writing tests, as well as a test runner, meaning it can execute our tests and return the results. In order to write `unittest` tests, we must:

  - Write our tests as methods within classes.
  - Use a series of built-in assetion methods.

*Test Class*

We'll create a `TestMultiply` class that derives from `unittest.TestCase`, with a method inside that does the actual testing. Lastly, we'll call `unittest.main()` to tell `unittest` to find and run out `TestCase`. We'll put all this in a file called `test_multiply.py` and run it from the command line:

  ```python
    #
    # test_multiply.py
    #
    import unittest

    def multiply(x, y):
      return x * y

    class TestMultiply(unittest.TestCase):

      def test_multiply(self):
        test_x = 5
        test_y = 10
        self.assertEqual(multiply(test_x, test_y), 50, "Should be 50")
    
    if __name__ == "__main__":
      unittest.main()
  ```

  ```powershell
    (env) > python test_multiply.py

    ----------------------------
    ----------------------------
    Ran 1 test in 0.000s

    OK
  ```

*IMPORTANT CONCEPTS*

  - `TestCase` class must subclass `unittest.TestCase`
  - Names of test functions MUST begin with `test__`, otherwise they won't be run as tests.
  - Import the code to be tested.
  - Our `TestCase` class can be calle whatever we want, always subclassing from `unittest.TestCase`
  - Test code is often placed in a `test.py` file alongside the one to be tested, in smaller projects. For larger ones, we usually want to have mulitple test files inside a test folder. In this case, we'll need to make sure the code to be tested is available on our `PYTHONPATH`

#### Running Tests

We can run test in a file by calling `unittest.main()`:

  ```python
    # ...
    if __name__ == "__main__":
      unittest.main()
  ```

We can also skip this bit, and call `unittest` directly fron the command line:

  ```powershell
    (env) > python -m unittest test_module
  ```

  - Use the `-v` (or `--verbose`) flag, with it we will obtain more information about which test were run.

#### TestCase Assertions

Subclassing the TestCase class gives us a bunch of useful assertions that we can use to check the validity of our code.

Method | Checks that
---- | ----
assertEqual(a,b) | a == b
assertNotEqual(a,b) | a != b
assertTrue(x) | bool(x) is True
assertFalse(x) | bool(x) is False
assertIs(a,b) | a is b
assertIsNot(a,b) | a is not b
assertIsNone(x) | x is None
assertIsNotNone(x) | x is not None
assertIn(a,b) | a in b
assertNotIn(a,b) | a not in b
assertIsInstance(a,b) | isinstance(a,b)
assertNotIsInstance(a,b) | not isinstance(a,b)

#### Growing Our Tests

Standard `unittest` tests are fine for most projects. As our programs grow and organization becomes more complex, we might want to consider an alternative testing framework or test runner. the 3rd party `nose2` and `pytest` modules are compatible with `unittest` but do things slightly differently.

## 08. Web Frameworks

#### Basic Flask

*Types of Web Frameworks in Python*

  - Django

Django is a full-featured, high-level framework for building web apps. Django focuses on automating as much as possible, an many large-scale sites run on Django.

  - Flask

Flask is a "microframework" for Python, allowing users to make basic backend APIs and webapps with a minimum of code. Flask is easy for beginners and not opinionated.

  - Pyramid

Pyramid is a fast, yet advanced framework, and a successor to the older Pylons framework. Pyramid is open-source and actively developed.

\* There are many more different frameworks for Python.

#### Routing

Flask uses the `route()` decorator to declare routes. For Example, the above code uses `app.route("/")` to declare a route for "/" that resolves to `hello()`, but we can use any path, or even accept variables in our routes:

  - To install Flask:

  ```powershell
    python -m pip install flask
  ```

  ```python
    from flask import Flask
    app = Flask(__name__)

    @app.route("/my/secret/page")
    def secret():
      return "Shh!"

    # <SomeParameter> is the syntax used to handle parameters with Flask
    # The parameter is passed to the function called visiting this route
    @app.route("/user/<username>")
    def user_page(username):
      return f"Welcome, {username}!"

    @app.route("/blog/post/<int:post_id>")
    def show_post(post_id):
      return f"This is the page for post #{post_id}"
  ```


#### Returning Data: Templates & Other Resources

The simplest way to return data is to return a string with `return` at the end of our function. This pushes the string back to the user, who sees it as plain text in thei browser. We'll probably want to make use of HTML in our webapps though, so we'll want to look at template rendering.

  - A template is just an HTML file that lives in a folder called `templates` next to our Flask app Python file. To return an HTML file instead of plain text, Flask provides something called "Templating", through the usage of a function called `render_template()`, which allows us to quickly and easily return a template file and also access variables in it without having to access JS or anything more complex.

    - This function takes the name of the template file to be rendered and any additional (and optional) parameters as arguments. Parameters are what we want to be available in our template to make the content in it dynamic.

  ```python
    from flask import render_template

    @app.route('/')
    def index():
      return render_template('index.html')
  ```

Flask also supports a template language called `Jinja` that allows us to populate our HTML files with data from our Flask app at render time. A very simple HTML template might look like this:

  ```html
    <!doctype html>
    {% if name %}
      <h1>Hello {{ name }}!</h1>
    {% else %}
      <h1>Hello, World!<h1>
    {% endif %}
  ```

  - Note the special code in `{% brackets %}, this acts as a very simple programming language. Let's add a matching Flask function:

  ```python
    from flask import render_template

    @app.route('/hello/')
    @app.route('/hello/<name>')
    def hello(name=None):
      return render_template('hello.html', name=name)
  ```

*Static files*

  - Serving static files alongside our dynamic Flask code is easy - just create a folder called `static` next to our Flask code, and any files we put in there will be available at `/static/<filename>` 

#### Runnig an Application

In order to run our Python webapp using a Flaks server, we have to set variable environments and run the flask library:

  ```powershell
  (env) > $env:FLASK_APP = 'my_application'
  (env) > $env:FLASK_ENV = 'development'
  (env) > flask run
  ```
  - When using bash:
  
  ```shell
  $ export FLASK_APP = my_application
  $ export FLASK_ENV = development
  $ flask run
  ```
  - the `FLASK_ENV` variable, when set to 'development', allows the usage of the built-in debugger on Flask, which makes very easy to update the webapp when making changes to the code and to see what went wrong when we have an error in our application.

#### Using a Database & Deploying your Web App

Flask provides a useful mechanism for accessing database objects. This makes it easy to use databases to store data for your dynamic webapp. More information is available in the Flask documentation.

Is your app ready for the big time? There are many different options for deploying your Flask app to a real webserver - you can read about some of your options in the Flask documentation.

#### Flask GitHub App

*Installing Requirements*

Our web application has two required external libraries, flask, and requests. As our list of dependencies becomes more complicated, we want to list them in a file called requirements.txt and include it with our project. That way, our code can be reused by others.

Open and look at the requirements.txt file. The name of each dependency is on a new line.

To install all the dependencies from our requirements file, pass the `-r` flag to pip, and the name of the file (in this case, it’s requirements.txt):

  ```powershell
  (env) > python -m pip install -r requirements.txt
  ```
*Folder Structure*

We will start by creating a folder called `day_two_final`, which should have the following structure:

  ```text
    day_two_final
    ├── app.py
    ├── repos
    │   ├── exceptions.py
    │   ├── models.py
    │   └── api.py
    ├── static
    │   ├── favicon.png
    │   └── style.css
    └── templates
        ├── error.html
        └── index.html
  ```

- exceptions.py
    
Let’s start with building a custom exception to handle API errors. Remember that if `response.status_code` is anything but `200`, you can consider that an error. Create a `GitHubApiException` class that subclasses `Exception`:
  
  ```python
    #
    # exceptions.py
    #
    class GitHubApiException(Exception):

    def __init__(self,status_code):
      if status_code == 403:
        message = "Rate limit reached. Please wait a minute and try again."
      else:
        message = f"HTTP status code was: {status_code}."

      super().__init__(f"A GitHub API error occurred: {message}")
  ```

- models.py

Next, let’s build our “model”, the `GitHubRepo` class. For this, we want to accept three arguments (`name`, `language`, and `num_stars`) and store them as instance variables (using `self`). Include both a `__str__()` and a `__repr__()` method:

  ```python
    #
    # models.py
    #
    class GitHubRepo(): 

      def __init__(self, name, language, num_stars):
        self.name = name
        self.language = language
        self.num_stars = num_stars

      def __str__(self):
        return f"-> {self.name} is a {self.language} repo with {self.num_stars} stars."

      def __repr__(self):
        return f"GitHubRepo(name={self.name}, language={self.language}, num_stars={self.num_stars}"
  ```

  - api.py

  ```python
    #
    # api.py
    #
    import requests
    from repos.exceptions import GitHubApiException
    from repos.models import GitHubRepo

    def create_query(languages, min_stars=50000):
      query = f"stars:>{min_stars} "
      # Notice we are calling .strip() on each language, to clear it of leading
      # and trailing whitespace
      query += " ".join(f"language:{lang.strip()}" for lang in languages)
      return query

    def repos_with_most_stars(languages, min_stars=40000, sort="stars", order="desc"):
      gh_api_repo_search_url = "https://api.github.com/search/repositories"
      query = create_query(languages, min_stars)

      parameters = {"q": query, "sort": sort, "order": order}

      response = requests.get(gh_api_repo_search_url, params = parameters)
      status_code = response.status_code
      
      if status_code != 200:
        raise GitHubApiException(status_code)

      response_json = response.json()
      items = response_json["items"]
      return [GitHubRepo(item["name"], item["language"], item["stargazers_count"]) for item in items]

    if __name__ == "__main__":
      languages = ["python", "javascript", "ruby"]

      results = repos_with_most_stars(languages)

      for result in results:
        print(result)
  ```
  - app.py

1. Finally, let’s tie it all together with our app.py file. We’ll start off with some boilerplate - we’ll need to import a few things from flask, as well as our `GitHubApiException` and our `repos_with_most_stars()` function.

2. Next, we’ll create the flask `app` object. We’ll also create a list of all the available languages that the user of our web app can choose from. It will help us keep track of if they’re selected or not.

3. Next, we’ll need a function that gets called when the root url for our website, or `/` is requested by the user. We’ll start with the `@app.route()` decorator -this signals to Flask that this `index()` function should be called to handle any `GET` or `POST` requests to the URL `/`.

4. We need to figure out which languages we have selected to determine which repos to display.

  - We’ll check the request.method variable to determine what kind of request it was - if it was a `GET` request, we’ll just display whichever repos were selected last (or all of them if this is the first request). If it’s a `POST`, we’ll grab the `languages` variable from the request form and use it to populate our `selected_languages` list.

5. Now, we just need to get our `results` and render our website. Call the `repos_with_most_stars()` function in api.py and pass it our `selected_languages`. Then, we’ll return our flask `render_template()` function and pass it our list of `selected_languages`, `available_languages`, and our `results`.

6. Finally, we’ll add a custom error handler that renders a special website (`error.html`) if we receive a `GitHubApiException`.

  ```python
    #
    # app.py
    #
    from flask import Flask, render_template, request

    from repos.api import repos_with_most_stars
    from repos.exceptions import GitHubApiException

    app = Flask(__name__)

    available_languages = ["Python", "JavaScript", "Ruby", "Java"]

    @app.route("/", methods=["POST", "GET"])
    def index():
      if request.method == "GET":
        # Use the list of all languages
        selected_languages = available_languages
      elif request.method == "POST":
        # Use the languages selected in the request form
        selected_languages = request.form.getlist("languages")

      results = repos_with_most_stars(selected_languages)

      return render_template("index.html", 
        selected_languages=selected_languages,
        available_languages=available_languages,
        results=results)

    @app.errorhandler(GitHubApiException)
    def handle_api_error(error):
      return render_template("error.html", message=error)
  ```

7. At last, we need to run our app. To do this we need to make sure to be in the root folder `day_two_final` and start the webapp with debug mode.

  ```powershell
  (env) > $env:FLASK_APP = 'app.py'
  (env) > $env:FLASK_ENV = 'development'
  (env) > flask run
  ```
#### Bonus: Unit Tests

We need to create a file called `test.py` in the root directory and write some test cases to assert the return query text from the `create_query()` function. Also, we are going to assert the contents of the `GitHubApiException` custom exception class.

  ```python
    #
    # test.py
    #
    from unittest import TestCase, main
    from repos.api import create_query
    from repos.exceptions import GitHubApiException

    class TestCreateQuery(TestCase):

      def test_create_query(self):
        test_languages = ["R", "C++", "Go"]
        test_min_stars = 20000
        expected = "stars:>20000 language:R language:C++ language:Go"
        result = create_query(test_languages, test_min_stars)
        self.assertEqual(result, expected, f"Should be {result}")

    class TestGitHubException403(TestCase):

      def test_GitHubApiException(self):
        test_status_code = 403
        exception = GitHubApiException(test_status_code)
        test_existance = "Rate limit" in str(exception)
        self.assertTrue(test_existance)
      
    class TestGitHubApiException500(TestCase):

      def test_GitHubApiException(self):
        test_status_code = 500
        exception = GitHubApiException(test_status_code)
        test_existance = "500" in str(exception)
        self.assertTrue(test_existance)

    if __name__ == "__main__":
      main()
  ```