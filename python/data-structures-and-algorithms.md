## Functional Programming Helpers

```python
def reduce(reducer_fn, arr, init_val = None):
  if init_val or init_val in [[],{},0]:
    start = 0
    acc = init_val
  else:
    print('else statement')
    start = 1
    acc = arr[0]
  for i, val in enumerate(arr, start):
    print(val)
    acc = reducer_fn(acc,val)
  return acc

def compose(*fns):
  def composed(result):
    fns = reversed(fns.copy())
    for fn in fns:
      result = fn(result)
    return result
  return composed

def partial(fn, *args):
  def wrapper(*rest):
    return fn(*args, *rest)
  return wrapper

def frequency_counter(iterable):
  frequency_dict = {}
  for key in iterable:
    if key in frequency_dict:
      frequency_dict[key] += 1
    else:
      frequency_dict[key] = 1
  return frequency_dict

```
## 12. Array Sequences

### Anagram Check

```python
def anagram(s1,s2):
  letters_only = partial(filter, str.isalpha)
  s1_freq = frequency_counter(letters_only(s1))
  s2_freq = frequency_counter(letters_only(s2))
  for letter in letters_only(s1):
    if s1_freq[letter] is not s2_freq[letter]:
      return False
  return True

anagram('public relations', 'crap built on lies') # True
```

### Array Pair Sum

```python
def pair_sum(arr, k):
  arr = arr.copy()
  arr.sort()
  pairs = []
  left = 0
  right = len(arr) - 1
  while left <= right:
    left_val = arr[left]
    right_val = arr[right]
    sum = left_val + right_val
    if sum == k:
      pairs.append((left_val,right_val))
      left += 1
      right -= 1
    elif sum < k:
      left += 1
    elif sum > k:
      right -= 1
  print(pairs)
  return len(pairs)


pair_sum([1,3,2,2], 4) # outputs 2 and prints ((1,3), (2,2))
```

### Find Missing Element

```python
def finder(arr1, arr2):
  arr1_freq = frequency_counter(arr1)
  for val in arr2:
    arr1_freq[val] -= 1
  values = arr1_freq.items()
  if not values:
    print('no missing elements')
  else:
    missing_elements = []
    for val, freq in values:
      for _ in range(freq):
        missing_elements.append(val)
    connector = 'is'
    if len(missing_elements) > 1:
      connector = 'are'
    print(f"{', '.join(map(str,missing_elements))} {connector} missing")


finder([1,2,3,5,3,22,4,5,6,7], [4,3,2,6,1,7]) # 3, 5, 5, 22 are missing
```

### Largest Continuous Sum

```python
def large_cont_sum(arr):
  if len(arr) == 0:
    return 0
  max_sum = current = 0
  for val in arr:
    if current < 0:
      current = 0
    current += val
    max_sum = max(current,max_sum)
  return max_sum


large_cont_sum([1,2,-1,3,4,10,10,-10,-1]) # 29
```

### Sentence Reversal

```python
def rev_words(s):
  words_list = s.strip().split(' ')
  result = []
  for i in range(len(words_list)-1,-1,-1):
    result.append(words_list[i])
  print(" ".join(result))


rev_words('This is the best') # 'best the is This'
rev_words('  space here   ') # 'here space'
```

### String Compression

```python
def compress(s):
  l = len(s)
  if l == 0:
    return ""
  if l == 1:
    return f"{s}1"
  compressed = ""
  count = 1
  idx = 1
  while idx < l:
    if s[idx-1] == s[idx]:
      count += 1
    else:
      compressed += f"{s[idx-1]}{count}"
      count = 1
    idx += 1
  compressed += f"{s[idx-1]}{count}" 
  print(compressed)  
  return compressed  


compress('AABBBCCCCDa') # 'A2B3C4D1a1'
```

### Unique Characters

```python 
def uni_char(s):
  dict_acc = {}
  for item in s:
    if item in dict_acc:
      return False
    dict_acc[item] = 1
  return True
  """
  Using sets:
    return len(set(s)) == len(s)
  """


uni_char('abcde') # True
```

## 12 Stack, Queues and Deques

### Implement a Stack

