# PYTHON BOOTCAMP NOTES (12 first sections)
```python
  st = "Print only the words that start with s in this sentence"

  for word in st.split(" "):
    if word[0] == 's':
      print(word)

  for num in range(0,11,2):
    print(num)

  print([num for num in range(1,51) if num % 3 == 0])

  st = "Print every word in this sentence that has an even number of letters"

  for word in st.split(" "):
    if len(word) % 2 == 0:
      print(f"This word, {word}, is even!")

  for num in range(1,101):
    if num % 3 == 0 and num % 5 == 0:
      print("FizzBuzz")
    elif num % 3 == 0:
      print("Fizz")
    elif num % 5 == 0:
      print("Buzz")
    else:
      print(num)

  st = "Create a list of the first letters of every word in this string"

  print([word[0] for word in st.split(" ")])

  ###############################################################

  def lesser_of_two_evens(a,b):
    if a % 2 == 0 and b % 2 == 0:
      return min(a,b)
    else:
      return max(a,b)

  lesser_of_two_evens(2,4)
  lesser_of_two_evens(2,5)

  def animal_crackers(st):
    w1, w2 = st.lower().split(" ")
    return w1[0] == w2[0]

  def other_side_of_seven(num):
    diff = abs(7 - num)
    if num > 7:
      return 7 - 2*diff
    elif num < 7:
      return 7 + 2*diff
    return 7

  other_side_of_seven(8)
  other_side_of_seven(12)
  other_side_of_seven(4)

  def has_33(arr):
    for i in range(len(arr)-1):
      if arr[i] == 3 and arr[i+1] == 3:
        return True
    return False

  has_33([3,4,3,5,7,3,3]) # True
  has_33([3,4,3,5,7,3]) # False

  ###############################################################

  def old_macdonald(name):
    name = list(name.capitalize())
    name[3] = name[3].upper()
    return "".join(name)

    # Lecture's solution
    """ 
    return name[:3].capitalize() + name[3:].capitalize()
    """

  old_macdonald('srakatiuska')

  def master_yoda(text):
    text_list = text.split()
    return " ".join(text_list[::-1])

    # Without using slicing
    """ 
    result = []
    text = text.split()
    l = len(text)
    last = l - 1
    for _ in range(l):
      result.append(text[last])
      last -= 1
    return " ".join(result)
    """

    # Using different list methods
    """
    text = text.split()
    text.reverse()
    return " ".join(text)
    """

  def almost_there(num):
    diff_100 = abs(100-num)
    diff_200 = abs(200-num)
    return diff_100 <= 10 or diff_200 <= 10

  def laughter(pattern, text):
    count = 0
    for i in range(len(text)-len(pattern)+1):
      for j, l in enumerate(pattern):
        if text[j+i] != l:
          break
        if j == (len(pattern) - 1):
          count += 1
    return count

  laughter('hah', 'hahahahhaa')

  def paper_doll(text):
    new_text = []
    for ltr in text:
      if ltr == " ":
        new_text.append(ltr)
      else:
        new_text.append(ltr*3)
    return "".join(new_text)

  def blackjack(a,b,c):
    total = sum([a,b,c])
    if total > 21 and 11 in [a,b,c]:
      total_no_11 = total - 10
      if total_no_11 > 21:
        return 'BUST'
      return total_no_11
    elif total > 21:
      return 'BUST'
    else:
      return total
    
    # Lecture's solution
    """
    total = sum([a,b,c])
    if total <= 21:
      return total
    el/if 11 in [a,b,c] and total - 10 <= 21:
      return total - 10
    else:
      return 'BUST'
    """

  blackjack(5,6,7)
  blackjack(9,9,9)
  blackjack(9,9,11)

  def summer_69(arr):
    total = 0
    add = True
    for num in arr:
      if add and num == 6:
        add = False
      elif not add and num == 9:
        add = True
      elif add:
        total += num
    return total

    # Lecture's solution
    """ 
    total = 0
    add = True
    for num in arr:
      # Why to use while loops?
      while add:
        if num == 6:
          add = False
          break
        else:
          total += num
          break
      while not add:
        if num == 9:
          add = True
        else:
          break
    return total
    """

  summer_69([1,3,5])
  summer_69([4,5,6,7,8,9])
  summer_69([2,1,6,9,11])

  ###############################################################

  def spy_game(arr, pattern):
    i = 0
    for num in arr:
      if num == pattern[i]:
        i += 1
      if i == len(pattern):
        return True
    return False

    # lecture's solution
    """
    spy_on = pattern[:]
    for num in arr:
      if num == spy_on[0]:
        spy_on.pop(0)
    return len(spy_on) == 0
    """

  spy_game([1,2,4,0,0,7,5], [0,0,7])
  spy_game([1,0,2,4,0,5,7], [0,0,7])
  spy_game([1,7,2,0,4,5,0], [0,0,7])

  def count_primes(num):
    if num < 2:
      return 0
    # 2 is the only even prime number
    primes = [2]
    x = 3
    while x <= num:
      # the range specified here is going to skip even numbers
      # it could also be wrote as: for y in primes
      for y in primes:
        # Check to see if x is prime
        if x % y == 0:
          x += 2
          break
      # else statement corresponding to the for loop above. This is a unique feature from Python. If the loop runs to completion, we will enter this else clause.
      # Without this for..else loop, if x is divisible by y, meaning x is increased by 2 and the loop broken, the append of x would happened anyway.
      # for..else loops is usually implemented when the loop body has a break statement in it
      else:
        primes.append(x)
        x += 2
    print(primes)
    return len(primes)

  # import math
  def vol(rad):
    return (4/3)*math.pi*rad**3

  vol(1)

  def ran_bool(num,low,high):
    return low <= num <= high

  ran_bool(10,1,10)

  def up_low(str):
    d = {"upper":0, "lower":0}
    for s in str:
      if s.islower():
        d["lower"]+=1
      elif s.isupper():
        d["upper"]+=1
      else:
        pass
    return f"No. of Upper case characters: {d['upper']}\nNo. of Lower case characters: {d['lower']}"

  def unique_list(l):
    new_list = []
    for i in l:
      if i not in new_list:
        new_list.append(i)
    return new_list

  unique_list([1,6,3,2,8,4,1,1,3,4,3,6])

  def multiply(numbers):
    numbers = numbers[:]
    total = numbers.pop()
    for num in numbers:
      total *= num
    return total

  multiply([5,2,3,-4])

  ###############################################################

  def palindrome(s):
    s = list(filter(lambda i: i.isalpha(), s))
    for i in range(int(len(s)/2)):
      if s[i] != s[-1-i]:
        return False
    else:
      return True

  palindrome('helleh')
  palindrome('nurses run')

  # import string
  def ispangram(str1, alphabet=string.ascii_lowercase):
    str1 = str1.lower()
    alpha = alphabet[:]
    for i in range(len(str1)):
      idx = alpha.find(str1[i])
      if idx >= 0:
        alpha = alpha[:idx] + alpha[idx+1:]
    print(alpha)
    return len(alpha) == 0

    # Lecture's solution
    """
    alphabet = set(alphabet)
    return alphabet <= set(str1.lower())
    """

  ispangram('The quick brown fox jumps over the lazy dog')

  #####################
  ####### OOP #########
  #####################

  class A:
    def truth(self):
      return 'All numbers are even'
      
  class B(A):
    def truth(self):
      return 'Many numbers are even'

  class C(A):
    def truth(self):
      return 'Some numbers are even'

  class D(B,C):
    def truth(self,num):
      if num%2 == 0:
        return A.truth(self)
      else:
        return super().truth() 
        # Python obeys the first method in the chain that defines num. The order followed is [D, B, C, A, object] (following MRO, Method Resolution Order) where object is Python's base object class

  d = D()
  d.truth(6) # All numbers are even
  d.truth(5) # Many numbers are even

  """
  Python's built-in super() function provides a shortcut for calling base classes, because it automatically follows Method Resolution Order.

  In its simplest form with single inheritance, super() can be used in place of the base class name. Note that we don't pass self to super().__init__() as super() handles this automatically
  """

  ###############################################################

  class Line:
    def __init__(self,coord1,coord2):
      self.x1, self.y1 = coord1
      self.x2, self.y2 = coord2
    def distance(self):
      return ((self.x2-self.x1)**2+(self.y2-self.y1)**2)**0.5
    def slope(self):
      return (self.y2-self.y1)/(self.x2-self.x1)

  line = Line((3,2),(8,10))

  ###############################################################

  # from math import pi
  class Cylinder:
    def __init__(self,height=1,radius=1):
      self.height = height
      self.radius = radius
    def volume(self):
      return pi*self.radius**2*self.height
    def surface_area(self):
      return 2*pi*self.radius*self.height + 2*pi*self.radius**2

  c = Cylinder(2,3)

  ###############################################################

  class Account:
    def __init__(self,owner,balance):
      self.owner = owner
      self.balance = balance
    
    def __str__(self):
      return f"Account owner: Oscar\n Account balance: ${self.balance}"

    def deposit(self,amount):
      self.balance += amount
      return f"Funds successfully added to {self.owner}'s account. Current balance is ${self.balance}"
    
    def withdraw(self,amount):
      total = self.balance - amount
      if total < 0:
        return f"Not enough funds in {self.owner}'s account. Current balance is ${self.balance}"
      else:
        self.balance = total
        return f"Thanks for preferring us {self.owner}. Your balance now is: ${self.balance}"
    
  acct1 = Account('Oscar', 5000)
  acct1.deposit(4000)
  acct1.withdraw(2500)
  acct1.withdraw(25000)

  #####################
  ##### Errors & ######
  ##### Exception ##### 
  ##### Handling ######
  #####################

  # Handle the exception thrown by the code below by using try and except blocks
  for i in ['a','b',3,4,'c']:
    try:
      print(i**2)
    except TypeError as e:
      print(f"{i} cannot be exponentiated. Error: {e}")

  # Write a function that asks for an integer and prints the square of it. Use a while loop with a try, except, else block to account for incorrect inputs
  def ask():
    while True:
      try:
        integer = int(input("Input an integer: "))
      except:
        print("An error occured! Please try again!\n")
      else:
        print(f"Thank you, your number squared is: {integer**2}")
        break
    
    # Lecture's Solution
    """
    waiting = True
    while waiting:
      try:
        n = int(input("Enter a number: "))
      except:
        print("Please try again!\n")
        continue
      else:
        waiting = False
    print("Your number squared is:")
    print(n**2)
    """

  ask()

  #####################
  #### Decorators #####
  #####################

  def decorator(func_to_decorate,val = 0):
    def decorated_func():
      nonlocal val # The keyword nonlocal allow to write to closure
      val += 1
      print('before function to decorate')
      return func_to_decorate(val)
    return decorated_func

  @decorator
  def my_func(num):
    print(num)
    return 'Hello! I want to be decorated'

  my_func() 
  # prints 'before function to decorate' and returns 'Hello! I want to be decorated'

  #####################
  #### Generators #####
  #####################

  # Create a generator that generates the squares of numbers up to some number N
  def gensquares(N):
    current = 0
    while current < N:
      yield current**2
      current += 1
    """ 
    for i in range(N):
      yield i**2
    """

  # Create a generator that yields "n" random numbers between a low and high number (that are inputs)
  import random
  def rand_num(low,high,n):
    while n > 0:
      yield random.randint(low,high)
      n -= 1
    """
    for i in range(n):
      yield random.randint(low,high)
    """

  # Use the iter() function to convert the string below into an iterator:
  a = 'hello'

  a_iterator = iter(a) # iter function takes an iterable an wraps an iterator around it

  next(a_iterator) # 'h'
  next(a_iterator) # 'e'

  # A memory optimization is automatically achieved when implementing this type of comprehension
  my_list = [1,2,3,5]
  gencomp = (item for item in my_list if item > 2) # gencomp is a generator from the values return from iterating over my_list that fulfill the if statement
```

## 13. Advanced Python Modules

### Collections Module

The collections module is a built-in module that implements specialized container data types providing alternatives to Python general purpose built-in containers. 

#### Counter Dict

Counter is a dict subclass which helps count hashable objects. Inside of it, elements are stored as dictionary keys and count of the objects are stored as values.

  - Sometimes called a 'bag' or multiset.

  ```python
    from collections import Counter

    lst = [1,2,3,4,1,1,1,2,2,4,3,1,2,3,4]
    Counter(lst) # Counter({1:5, 2:4, ...})
  ```

*Common Patterns when using the Counter() object*

  ```python
    # c represents some counter object previously created
    sum(c.values())               # total of all counts
    c.clear()                     # reset all counts
    list(c)                       # list unique elements
    set(c)                        # convert to a set
    dict(c)                       # convert to a regular dictionary
    c.items()                     # convert to a list of (elem,cnt) pairs
    Counter(dict(list_of_pairs))  # convert from a list of (elem,cnt) pairs
    c.most_common()[:-n-1:-1]     # n least common elements
    c += Counter()                # remove zero and negative counts
    d = Counter([1,2,3,2])
    c.update(d)                   # now the counter d is add to c counter
  ```

#### defaultdict

defaultdict is a dictionary-like object which provides all methods provided by a dictionary but takes the first argument (default_factory) as a default data type for the dictionary. Using defaultdict is faster than doing the same using dict.set_default method.

  - A defaultdict will never raise a KeyError. Any key that does not exist gets the value returned by the default factory.

  ```python
    from collections import defaultdict
    d = {}
    d['one'] # KeyError: 'one'

    d = defaultdict(object)
    d['one'] # <object at 0x1792df202e0>

    for item in d:
      print(item)
    # one

    # can also initialize with default values
    d = defaultdict(lambda: 0)
    d['one'] # 0
  ```

#### OrderedDict

An orderedDict is a dictionary subclass that remembers the order in which its contents are added.

  ```python
    # Ordered dictionary
    from collections import OrderedDict
    d = OrderedDict()
    d['a'] = 'A'
    d['b'] = 'B'
    d['c'] = 'C'
    d['e'] = 'E'
    d['d'] = 'D'

    for k, v in d.items():
      print(k,v)
    # a A  
    # b B
    # c C 
    # e E
    # d D 
  ```

*Equality with an Ordered Dictionary*

  - A regular dict looks at its contents when testing for equality. An OrderedDict also consideres the order the items were added.

  ```python
    d1 = OrderedDict()
    d1['a'] = 'A'
    d1['b'] = 'B'
    
    d2 = OrderedDict()
    d2['b'] = 'B'
    d2['a'] = 'A'

    print(d1==d2) # False
  ```

#### namedtuple

The standard tuple uses numerical idexes to access its members. For simple use cases, this is usually enough. On the other hand, remembering which index should be used for each value lead to errors, especially if the tuple has a lot of fields and is constructed far from where it is used. A namedtupe assings names, as well as the numerical index, to each number.

Each kind of namedtuple is represented by its own class, created by using the `namedtuple()` factory function. The arguments are the name of the new class and a string containing the names of the elements.

We can basically think of namedtuples as a very quick way of creating a new object/class type with some fields.

  - The namedtuple is constructed by first passing the object type name and then passing a string with the variety of fields as a string with spaces between the field names. We can then call on the various attributes:

  ```python
    from collections import namedtuple

    Dog = namedtuple('Dog', 'age breed name')
    sam = Dog(age=2, breed='Lab', name='Sammy')
    frank = Dog(age=2, breed='Shepard', name='Frankie')

    sam # Dog(age=2, breed='Lab', name='Sammy')
    sam.age # 2
  ```

### datetime 

Python has the datetime module to help deal with timestamps in our code. Time values are represented with the time class. Times have attributes for hour, minute, second, and microsecond. They can also include time zone information. the arguments to initialize a time instance are optional but the default of 0 is unlikely to be what we want

#### time

We can create a timestamp by specifying `datetime.time(hour,minute,second,microsecond)`

  ```python
    import datetime
    t = datetime.time(4,20,1)

    print(t)                             # 04:20:01
    print('hour  :', t.hour)
    print('minute:', t.minute)
    print('second:', t.second)
    print('microsecond:', t.microsecond) # microsecond: 0
    print('tzinfo:', t.tzinfo)           # tzinfo: None
  ```

  - Note that a time instance only holds values of time, and not a date associated with the time. 

We can also check the min and max values a time of day can have in the module:
  ```python
    print(datetime.time.min)        # 00:00:00
    print(datetime.time.max)        # 23:59:59.999999
    print(datetime.time.resolution) # 0:00:00.000001
  ```

#### Dates

datetime also allows us to work with date timestamps. Calendar date values are represented with the date class. Instaces have attributes for year, month, and day. It is easy tocreate a date representing today's date using today() class method.

  ```python
    today = datetime.date.today()

    print (today) # 2018-02-05
    print ('ctime', today.ctime()) # ctime: Mon Feb  5 00:00:00 2018
    print ('tuple', today.timetuple()) # tuple: time.struct_time(tm_year=2018, tm_mon=2, tm_mday=5, tm_hour=0, tm_min=0, tm_sec=0, # tm_wday=0, tm_yday=36, tm_isdst=-1)
    print ('ordinal:', today.ordinal()) # ordinal: 736730
    print ('Year:', today.year) # Year : 2018
    print ('Month:', today.month) # Month: 2
    print ('Day:', today.day) # Day  : 5
  ```

  - As with time, the range and resolution of date values supported can be determined using the `min`, `max` and `resolution` attributes.

Another way to create new date instances uses the replace() method of an existing date. For example, we can change the year, leaving the day and month alone:

  ```python
    d1 = datetime.date(2015, 3, 11)
    d2 = d1.replace(year=1990)
    print('d1': d1) # d1: 2015-03-11
    print('d2': d2) # d2: 1990-03-11
  ```

#### Arithmetic

We can perform arithmetic on date objects to check for time differences:

  ```python
    d1-d2 # datetime.timedelta(9131)
  ```

This give us the difference in days between the two dates. We can use the timedelta method to specify various units of times (days, minutes, hours, etc.)


### Python Debugger

This module allows us to set debugger checkpoints in our code to inspect/track the current state of th program at that given point. This let us pause our program execution step-by-step.

  ```python 
    import pdb

    x = [1,3,4]
    y = 2
    z = 3

    result = y + z
    print(result)

    # Set a trace using Python Debugger
    pdb.set_trace()

    result2 = y+x # Will throw a TypeError: unsupported operand type(s) for +: 'int' and 'list'
    print(result2)
  ```

  - We can use 'q' to quit the debugger.

## 15. Advanced OOP

### Inheritance Revisted

Recall that with inheritance, one or more derived classes can inherit attributes and methods from a base class. This reduces duplication, and means that any changes made to the base class will automatically translate to derived classes.

  - A derived class does not have to include their own `__init__` (constructor) method because the base class `__init__` gets called automatically. However, if we do define an `__init__` method in the derived class, it will override the base one inherited.
  - When a derived class defines it own `__init__` method, inside of it we can (and should) call the constructor from each inherited classes (in the case of multiple inheritance)

  ```python
    class Car:
      def __init__(self, wheels = 4):
        self.wheels = wheels
    
    class Gasoline(Car):
      def __init__(self, engine = 'Gasoline', tank_cap = 20):
        Car.__init__(self)
        self.engine = engine
        self.tank_cap = tank_cap
        self.tank = 0
      
      def refuel(self):
        self.tank = self.tank_cap

    class Electric(Car):
      def __init__(self, engine = 'Electric', kWh_cap = 60):
        Car.__init__(self)
        self.engine = engine
        self.kWh_cap = kwh_cap
        self.kWh = 0

      def recharge(self):
        self.kWh = self.kwh_cap

    class Hybrid(Gasoline, Electric):
      def __init__(self, engine = 'Hybrid', tank_cap = 11, kWh_cap = 5):
        Gasoline.__init__(self,engine,tank_cap)
        Electric.__init__(self,engine,kWh_cap)

      prius = Hybrid()
      print(prius.tank) # 0
      print(prius.kWh)  # 0

      prius.recharge()
      print(prius.kWh)  # 5
  ```

### Why do we use `self`?

Python uses `self` to find the right set of attributes and methods to apply to an object.

  - When we type: `prius.recharge()`, what really happens is that Python first looks up the class belonging to `prius` (Hybrid in this case), and then passes `prius` to the `Hybrid.recharge()` method. It is the same as running: `Hybrid.recharge(prius)`.

### Method Resolution Order (MRO)

To resolve multiple inheritance conflicts when inherited classes shares same methods, Python employs MRO, which is a formal plan that is follow when running object methods.Take the following example:

  ```python
    class A:
      num = 4

    class B(A):
      pass
    
    class C(A):
      num = 5

    class D(B,C):
      pass
  ```
        A
      num=4
     /     \
    /       \
   B         C
  pass     num=5
   \         /
    \       /
        D
       pass

  - Here `num` is a class attribute belonging to all four classes. When called, `D.num` holds the value of 5. **Python obeys the first method in the chain that *defines* `num`**. The order followed is [D,B,C,A,object] where *object* is Python's base object class. In the example above, the first class to define and/or orverride a previously defined `num` property is `C`.

### super()

Python's built-in `super()` function provides a shortcut for calling base classes, because it automatically follows MRO.

  - In its simples form with single inheritance:

  ```python
    class BaseClass:
      def __init__(self, x, y):
        self.x = x
        self.y = y

    class DerivedClass(BaseClass):
      def __init__(self, x, y, z):
        super().__init__(x, y) # super() handles the passing of self to base class's __init__
        self.z = z
  ```

  - In a more dynamic form, with multiple inheritance like the one shown previously, `super()` can be use to properly manage method definitions:

  ```python
    class A:
      def truth(self):
        return 'All numbers are even!'

    class B(A):
      pass

    class C(A):
      def truth(self):
        return 'Some numbers are even'

    class D(B,C):
      def truth(self, num):
        if num % 2 == 0:
          return A.truth(self)
        return super().truth()  

    d = D()
    d.truth(6) # All numbers are even!      
    d.truth(5) # Some numbers are even!     
  ```

## 16. Introduction to GUIs

We need to install Jupyter Notebooks in order to have an environment where the widgets can be loaded and manipulated. To to this:

  - Create a virtual environment in the desired project (recommend to isolate all installations to be perfomed from other previously done).
  
  ```powershell
    py -m venv env
    env\Scripts\activate
  ```

  - Install Jupyter Notebooks: `pip install notebook`

  - Run a Jupyter Notebook sever: `jupyter notebook [,notebook] [,--no-browser]`
  
### interact

