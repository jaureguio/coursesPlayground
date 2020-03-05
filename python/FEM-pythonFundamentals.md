# Python Fundamentals

[Checkout the course's additional material in its website](https://www.learnpython.dev/)

## 01. Introduction

**Creating a virtual environment**

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

**Using the Python REPL**

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

**Why Python**

- PEP8 is a Python coding standard, that sets guidelines for how our Python code should look like.

  [Check out "Pep8": the style guide for Python](https://pep8.org/)

**Code Sample**

- To create comments:

  - Use # for line comments.
  - Use """ (open and closing pairs) to create multiple line comments.
  
## 02. Data Types
