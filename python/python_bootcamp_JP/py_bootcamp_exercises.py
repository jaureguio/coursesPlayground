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

def decorator(func_to_decorate):
  def decorated_func():
    print('before function to decorate')
    return func_to_decorate()
  return decorated_func

@decorator
def my_func():
  return 'Hello! I want to be decorated'

my_func() 
# prints 'before function to decorate' and returns 'Hello! I want to be decorated'