# TYPESCRIPT FUNDAMENTALS, V1 #

## 1.2. Types ##

### Why to add types?

- Sometimes JS does unintuitive things to convert primitive types.
- It will move runtime errors into compile time errors.
- Modern JS runtimes are written using typed languages.
- Great documentation for future developers managing/interacting with our code.
    
### Implicit Typing 

- The Typescript compiler can make good guesses at types, just through assignments. After assigning a value to a variable, you're allowed to change the type.
- JS however let us do this, but it's common cause of *de-optimization* in modern runtimes.

### Explicit Typimg

- Type annotation: rather that letting Typescript make a guess about a type, we can provide a type at variable declaration, which is called a type annotation. It can be used anywhere a variable is declared (and other places).

```typescript
let teacherAge: number = 34;
```

- Casting: sometimes we need to cast a type to a particular value with the "as" keyword.

```typescript
let input = document.querySelector('input#name_field') as HTMLInputElement;

// An alternative way to do this (less popular after the popularization of React/JSX):

let input = <HTMLInputElement>document.querySelector('input#name_field');
```

- Fuction parameters and return types:
  
  1. Function declaration:

```typescript   
function login(username: string, password: string): User {
  // Do something
};
```
  2. Arrow functions:

```typescript 
const login = (username: string, password: string): User => {
  // Do something
};
```

### Object Shapes

When we talk about SHAPES, we are referring to the name of its properties and their values' types:

```typescript
let myCar: { make: string; model: string; year: number};
myCar = { make: "abc", model: "abcd", year: 234};
```
  - If properties are missing or of the wrong type, the compiler will complain at us.

### Challenge 1: Color Functions
```typescript
export function hexToRgb(hex: string): {r: number; g: number; b: number;} {
  if (hex.length === 3) {
    let hr = hex[0];
    let hg = hex[1];
    let hb = hex[2];
    return hexToRgb(`${hr}${hr}${hg}${hg}${hb}${hb}`);
  }
  let [r, b, g] = [0, 2, 4]
    .map(offset => hex.substring(offset, offset + 2)) // ['ff', '00', '00']
    .map(hexCh => parseInt(hexCh, 16)); // [255, 0, 0]
  return {r, g, b};
}

hexToRgb('ffbbcc')

export function rgbToHex(r: number, g: number, b:number): string {
  let rgb = [r,g,b];
  return rgb
  .map((rgbCh) => Math.max(0, Math.min(rgbCh, 255)).toString(16))
  .map((hexCh) => hexCh.length < 2 ? `0${hexCh}` : hexCh)
  .join(``);
}
rgbToHex(12,34,212)
```

### Interfaces and Excess Property Checking

- Excess Property Checking: when working with object literals, shape is checked more strictly. Excess properties in this situations are regarded as posible bugs: object  literals may only specify known properties.

```typescript
let myCar: { make: string; model: string; year: number };
myCar = {
  make: 'Honda',
  model: 'Accord',
  year: 1992,
  color: {r: 255, g: 0, b: 0} // ERROR due to the presence of the undeclared color property!
}
// An easy way (not the recommended in this particular case in modern Typescript) to deal with this is explicitly casting the type of the object to the appropiate type.
```

- Interfaces: allow us to declare a structure and refer to it by name.

```typescript
interface Car {
  make: string;
  model: string;
  year: number;
}

let myCar: Car {
  make: 'Honda',
  model: 'Accord',
  year: 1992
}

function carCageMatch (car1: Car, car2: Car) {
  //Do Something
}
```

  - Interfaces only describe structure, they have no implementation.
  - They don't compile to any JS code.
  - DRY type definitions allows easy refactoring later.
  - Interfaces are "open" and can be extended later:

```typescript
interface Car {
  color: string
}

let lisasCar: Car {
  make: 'Honda',
  model: 'Accord',
  year: 1992,
  color: "#fff" // GOOD
}
```
  - Interfaces can be think of as functions in the sense that they are hosted and
  exported/imported from modules as such.
  - They also can extend shapes from previously defined interfaces (and classes?) making use of the
  'extends' keyword.

### any & never Types

The any type allows for a value of any kind (back to regular JS's way of treating mutable types)

```typescript
let age = 34;
let myAge = age as any;
myAge = '35';
```
  - Useful as we migrate code from JS to TS.
  - Start with making all anys explicit, and then squash as many as possible.
  - There's also a "never" type, which is compatible with nothing!

### Challenge 2 - Account Manager

```typescript  
interface User {
  email: string;
  password: string;
}

interface ConfirmedUser extends User {
  isActive: true; // This is called a 'literal type'. Boolean could've be used as well if false was also allowed
}

interface Admin extends ConfirmedUser {
  adminSince: Date; // Any constructor can be used as type in addition to the primitive types.
}
```

## 1.3. Classes

### JS Class Refresher

JS classes allow us to define instance and public (static) fields; the former is equivalent to put a property in a class instance (inside the class constructor); the latter is equivalent to define properties directly into the class:

```typescript
class Person {
  static _counter = 0; // shared across all instances of the Person class/constructor
  planet = 'Earth'; // equivalent to adding "this.planet = 'Earth'" inside the constructor

  constructor( name ) {
    this.name = name;
    this.id = Person._counter++;
  }
}
```

  - Inheritance: subclasses can be created by using the 'extends' keyword. The 'super' keyword can be used to call methods on the parent class.

```typescript
class Person {
  constructor( name ) {
    this.name = name;
  }

  toJSON() {
    return {
      name: this.name
    }
  }
}

class Employee extends Person {
  constructor(id, name) {
    super(name) // from parent constructor
    this._employeeId = id
  }
  
  toJSON() {
    return {
      ...super.toJSON(), // parent prototype method
      id: this._employeeId
    }
  };
}

let me = new Employee('123', 'Oscar'); // { name: 'Oscar', id: '123'}
```

  - Species:  there's a special property on classes called Symbol.species that's used when building 'derived objects':

```typescript
class MyArray extends Array {
  toString() {
    return '[PRIVATE]';
  }
}

let a = new MyArray(1,2,3);
let filtered = a.filter((y) => y <= 2)

console.log(`${a}`) // '[PRIVATE]'
console.log(`${filtered}`) // '[PRIVATE]'

// Using Symbol.species:

class MyArray extends Array {
  toString() {
    return '[PRIVATE]';
  }
  static get [Symbol.species]() {
    return Array;
  }
}
console.log(`${a}`) // '[PRIVATE]'
console.log(`${filtered}`) // '1,2'
```

  * Symbol.species represent a Symbol called species. We can treat it (Symbols in general) as a different type of string. After assigning the method to [Symbol.species] we could assign a new different method under the name species without worrying about property names colliding each other.

  - Mixins: they are abstract classses or 'template for classes' (a pattern to define reusable class logic):

```typescript
const AsJSON = type => class extends type {
  asJSON() {
    return JSON.stringify(this)
  }
};
class Person extends AsJSON(Object) {
  constructor(name) {
    super();
    this.name = name;
  }
}
let me = new Person('Oscar'); // {"name": "Oscar"}
```

### Typescript Classes

- Shape defined up front, like interfaces.

```typescript
class Car {
  // types of the properties for the object constructed
  make: string
  model: string
  year: number

  constructor(
    makeArg: string,
    modelArg: string,
    yearArg: number
  ) {
    this.make: makeArg;
    this.model: modelArg;
    this.year: yearArg;
  }

  startEngine() {
    return 'VROOOOM'
  }
}

let myCar = new Car('Honda', 'Accord', 2020)
```

### Enums

- Used to define a type consisting of ordered members.
- Each value is bound to a context (the enum provides the context)

```typescript
enum AcctType {
  Checking,
  Savings,
  MoneyMarket
};

type Acct = [number, AcctType]; // type alias Acct

let account: Acct = [9142.14, AccType.Checking];
```

- Each has a name and a value.
- Often we don't care about the value beyond an equality check.

```typescript
enum Suit {
  Club,
  Diamond,
  Heart,
  Spade
}

// JS representation of this enum:
var Suit;

(function (Suit) {
  Suit['Club'] = 0
  Suit[0] = 'Club';
  Suit['Diamond'] = 1
  Suit[1] = 'Diamond';
  Suit["Heart"] = 2
  Suit[2] = 'Heart';
  Suit['Spade'] = 3
  Suit[3] = 'Spade';
})(Suit || (Suit = {}));

Object.keys(Suit).length / 2; // 4
```

### Arrays & Tuples

- Arrays:

  - By default, arrays work same as in JS.
  - Adding a type constraint helps us keep contents consistent.
  - When initializing class properties with empty arrays, provide a type to avoid type 'never'
    inferring.

```typescript
// Plain JS:

let nums = [];

nums.push(5);
nums.push('not a number'); // Allowed in plain JS. Consistency is not kept.

// TS:

let numsTS: number[] = nums; // ERROR. nums is an array of numbers and strings!

class ShoppingCart {
  items = []; // array of nevers, nothing can exist in this array.
  // items: number[] = []; would be the correct way in TS.
  constructor() {
    this.items.push(5); // ERROR
  }
}
```

- Tuples:

  - Arrays of fixed length.
  - Typically represent values that are related in some way.
  - A tuple shines when consumers need to know about order and with destructured assigment.

```typescript
let dependency: [string, number];
dependency = ['react', 16];

let dependencies: [string, number][] = [];

dependencies.push(dependency); // GOOD
dependencies.push([ 'webpack', 3 ]); // GOOD
dependencies.push([ 'typescript', '2.5' ]); // ERROR
```

### Type Aliases

- Sometimes an interface isn't the best way to describe a structure.
- We can use the `type` keyword to define a type alias:

```typescript
type Color = [number, number, number];

let red: Color = [255, 0, 0]; // GOOD
```

- You can export types and interfaces, so you can consume them in other modules. However, type aliases are not hoisted like interfaces.

## 1.4. Object Literal

### Getters & Setters

Interfaces describe a getter/setter just like a regular value type (string, number, boolean, etc.). Getters and setters are functions as properties for the declared object; functions are first class citizens in JS and can be treated just as regular values.

### Challenge 4 - Functional Cashier

- Check 'practice.ts' file to see the exercise solution.

## 1.5. Generics

### Generics

- Allow us to reuse code across many types, interfaces and functions. We still get compile-time safety.
- We need to express a relationship/constraint between types; under the context of a function, for example, we are going to pass an argument of a particular type and the function is going to return a particular type that depends on the type of the argument passed.

```typescript
function gimmieFive<T>(x: T): T[] {
  // <T> represents the type parameter. Its type is determined by the type of the argument used to call the function.
  return [x, x, x, x, x];
}

let threes: number[] = gimmieFive(3); // T gets a value of number in this invocation
let eggs: string[] = gimmieFive('egg'); // T gets a value of string in this case
```

- Arrays, Promises and React components can be expressed with generics too:

```typescript
let cards = Array<[Suit, CardNumber]>(52);

let data: Promise<Response> = fetch(`http://example.com`);

interface MyProps {title: string}
interface MyState {isClicked: boolean}

class MyComponent extends Component<MyProps, MyState> {}
```

- We can specify constraints on generic types:

```typescript
function midpoint<T extends Point2D>(p1: T, p2: T): T {...}
```

- Generics can be used with interfaces as well:

```typescript
interface IFileReader<T extends File> {
  readFile(file: T): Blob
}
```

### Access Modifier Keywords

- public: anyone can access (this is the default for every value within an object).
- protected: self and subclasses can access.
- private: self can access

```typescript
class Account {
  public accountId: number;
  protected email: string; // this property will be accessible by the class constructor itself and any subclass from this.
  private password: string;
}

class SharedAccount extends Account {
  setEmail(newEmail: string) {
    this.email = newEmail;
  }
}
```

### Function Overloading

- TypeScript allows us to have more than one function "head", although we are still limited to a single implementation:

```typescript
function add(x: number, y: number): number;
function add(x: string, y: string, radix: number): number;

function add(
  x: number | string,
  y: number | string,
  radix: number = 10
) : number {
  return parseInt(`${x}`, radix) + parseInt(`${y}`, radix);
} 
```

- The example above basically allows us to parse TWO NUMBERS OR TWO STRINGS into numbers of certain base
- The approach here is to define function heads from the most specific to the least specific.

### Challenge 5 - Typed Stack

In the exercise we will end up seen the way multiple head in a function (function overload) can help in cases when we need to handle multiple types of values within the same function's inputs (array and string in the particular case of the exercise).

- Requirements of the solution: 

  - Build a Stack data structure that uses generics to constrain the types it accepts.
  - Overload the push function, so that it can either take a single item or an array.
  - Pop should return an object of the appropriate type.
  - Keep the internal data structure private.

  - A recommended approach to solve the exercise is using a linked list (recursively sets of objects that refer to the next object in the stack through an inner property):

```typescript    
{ item: "head of the stack",
  next: {
    item: "next head of the stack",
    next: {
      ...
    }
  }
}
```

- Check 'practice.ts' file to see the exercise solution.

## 1.6. ITERATORS & GENERATORS

### Iterators
  
Iterators allow access one item from a collection at a time, keeping track of current position. A function returning an object with a next() method in it, used to get the next item in the sequence.

```typescript
function fibonacci() {
  let lastLast = 1;
  let last = 0;
  return {
    next() {
      let val = last + lastLast;
      if (val > 10) { // Termination
        return { done: true };
      }
      lastLast = last;
      last = val;
      return { value: val, done: false }
    }
  };
}

let it = fibonacci();
for (let p = it.next(); !p.done; p = it.next()) {
  console.log(p.value);
}
```

### Iterables

- Support iteration within a for..of loop.
- Requires implementation of the Symbol.iterator method.
- Array and Map already support this

```typescript
let arr = ['a', 'b', 'c'];
let it = arr[Symbol.iterator]();
console.log(it.next()); // { value: 'a', done: false }
console.log(it.next()); // { value: 'b', done: false }
console.log(it.next()); // { value: 'c', done: false }
console.log(it.next()); // { value: undefined, done: true }
```

- Destructured assignment works with any iterable, not just arrays.
  
### Generators

- Define their own iterative algorithm, yielding each item in the sequence.
- Use the function*() syntax.
- Returns an iterator.
- State of the closure is preserved between .next() calls.
- EXECUTION IS PAUSED.

```typescript
function* fib() {
  let lastLast = 1;
  let last = 0;
  while (true) {
    let val = last + lastLast;
    yield val;
    lastLast = last
    last = val;
  }
}

for (let x of fib()) {
  console.log(x);
}
```

- The ability to pass values IN while iterating is important, and serves as the foundation for many great JS patterns.

```typescript
function* sequence() {
  let lastResult = 0;
  while(true) {
    lastResult = yield lastResult + 5;
    console.log(`lastResult=${lastResult}`);
  }
}

let it = sequence();
console.log(it.next().value); // 5
console.log(it.next(35).value); // lastResult=35 ... 40
console.log(it.next(100).value); // lastResult=100 ... 105
```

- Defining custom iterables is much easier with Generators:

```typescript
let oscar = {
  [Symbol.iterator]: function*() {
    yield 'O';
    yield 'S';
    yield 'C';
    yield 'A';
    yield 'R';
  }
}

for (let o of oscar) {
  console.log(o);
}
```

- We can emulate a barebones (?) implementation of async/await just using generator functions:

  - When we are in an async function and making use of await we are basically implementing a generator yielding multiple promises that push back resolve values into the generator after the resolution of each.
  - Check practice.ts file to see an implementation of the above mentioned.


### Challenge 6 - Fibonacci Generator

- Check 'practice.ts' file to see the exercise solution.

## 1.7. REACT & TYPESCRIPT

### Functional Components

Interfaces are used to describe props and state (when applied):

```typescript
import * as React from 'react'; // Default exports are treated this way in TS due to a historical mismatch in the usage of exports.default in JS

interface IMyComponentProps {
  name: string;
}

const MyComponent: React.FC<IMyComponentProps, {}> = ( props ) => {
  return (<div>{props.name}</div>)
}; 
```
  - the type declarations of React.FC (function component) and React.Component (class components) uses generic types and requires providing the types for props (first) and state (second) objects for the component

Example of a class component definition - Clock Component:

```typescript
import * as React from 'react';

interface IClockProps {
  color: string;
}

interface IClockState {
  time: Date;
}

function padNumber(x: number, pad: string): string {
  const str = `${x}`;
  return pad.substring(0, pad.length - str.length) + str;
}

export class Clock extends React.Componen<IClockProps, IClockState> {
  private task: number;
  
  constructor(props: IClockProps) {
    super(props);
    this.state = { time: new Date() };
  }

  public componentDidMount(): void {
    this.task = window.setInterval(() => this.tick(), 20);
  }

  public componentWillUnmount(): void {
    window.clearInterval(this.task);
  }

  public render() {
    const d = this.state.time;
    let time = [
      d.getHours(),
      d.getMinutes(),
      d.getSeconds()
    ].map((x: number) => padNumber(x, '00')).join(':');
    time += `.${padNumber(d.getTime % 100), '00')}`;
    return (
      <h1 style={ {color: this.props.color} }>
        The time is: { time }
      </h1>
    );
  }

  private tick(): void { // No one outside this class definition can refer to this tick() method
    this.setState({
      time: new Date()
    });
  }
}
```
  
### Integrating TypeScript with tools like Babel

The recommended approach is to get TypeScript out of the Babel world by means of making the TS compiler to target the most modern version of JavaScript possible. This way the compiled code that Babel will end up 'transpiling' is in the raw-est form, i.e. with no transpilation by TS.

# TYPESCRIPT FUNDAMENTALS, V2

## 2.2 TypeScript Basics

### Variable Declarations

- We should leverage the type inferencing TypeScript compiler is able to achieve when dealing with variables with initializers. This means, it is recommended to avoid type annotations/information when declaring with an initial value. However, this is recommended when writting documentation.

- Type information should be seen as an explicit contract between two things.

```typescript
let word: string;
word = 'hello';
word = 123 // WRONG!

// As opposed to:
let word: string = 'hello' // TypesScript will infer that word is a string even without type information been passed.
```

### Arrays & Tuples

- Simple array types can be expressed using []. However we must be carefull when declaring an empty array without specifying a context to the type of contents it will store:

```typescript
let aa = []; // Array of never's: never[]; nothing will be able to be pushed into it
let aa: number[] = []; // Array of numbers
let aa = [5]; // Array of numbers
```

- A tuple is a convention to define arrays of a fixed length with types assigned to each particular space in the array.

```typescript
let bb: [number, string, string, number] = [
  123, 'Fake Street', 'Nowhere, USA', 10110
];

bb = [1,2,4] // ERROR
```
- Type safety is not present when using array's methods on a tuple. We can make, for example, the push() method to be aware that the next element to be inserted should be of certain type. It will allow string or numbers as input types.

- Tuple values often require type annotations:

```typescript
const xx = [32, 31]; // number[]
const yy: [number, number] = [32, 31];
```

### Object Types & Interfaces

- Object types can be expressed using {} and property names. By default, all specified properties become mandatory unless the optional operator '?' is used.

```typescript
let cc: { houseNumber: number; streetName?: string };
cc = {
  streetName: 'Fake Street',
  houseNumber: 33
} // or cc = { houseNumber: 33 } is allowed as well
```
- Additional properties not declared in the object types will cause an error.
- We could reuse this type creating an interface based on it:

```typescript
interface IAddress {
  houseNumber: number;
  streetName?: string;
}

let ee: IAddress = { houseNumber: 33 };
```

### Intersection & Union Types

- Intersection: Sometimes we have a type that can be one of several things. Think of the intersection as if we were implementing overlapping Venn's diagrams and the properties common for all the instances will be part of the type without a doubt.

```typescript
interface IHasEmail {
  name: string;
  email: string;
}

interface IHasPhoneNUmber {
  name: string;
  phone: number;
}

let contactInfo: IHasEmail | IHasPhoneNumber = 
  Math.random() > 0.5
    ? {
        // we can assign it to a IHasPhoneNumber
        name: 'Oscar",
        phone: 3215551212
      }
    : {
        // or a IHasEmail
        name: 'Oscar',
        email: 'mike@example.com'
      };

// contactInfo.name; NOTE: we can only access the .name property because is the one common across all the interfaces of the intersection
```

- Union: 

```typescript
let otherContactInfo: IHasEmail & IHasPhoneNumber = {
  // we must initialize it to a shape that's assignable to both interfaces above
  name: 'Oscar',
  email: 'oscar@example.com',
  phone: 231341234
};

// NOTE that we now can access anything on either type.
```

### Type Systems & Object Shapes

- Type systems come down to answer the question about if both sides of an assignment are equivalent in type:

```typescript
function validateInputField(input: HTMLInputElement) { ... }
validateInputField(x); // can we regard x as an HTMLInputElement?
```

  - Nominal Type Sytems (like Java and pretty much all typed languages out there) answer this question based on whether x is an instance of a class/type named HTMLInputElement.
  - Structural Type Systems only care about the shape of an object. This is how TypeScript works.

- Wider vs Narrower: describes relative differences in range of a type's allowable values.

```yaml
________________________________________________Anything (any)____________________       WIDE
_____________________________________Array (any[])_________________________                |
__________________Array of strings (string[])____________________                          | Getting more and more    
________Array of 3 ([number, number, number])_________                                     |       specific
________ ... (['abc', 'def', string])_________                                             |
NOTHING (never)                                                                         NARROW     
```

### Functions

- Function arguments and return values can have type annotations:

```typescript
function sendEmail(to: IHasEmail): { recipient: string; body: string} {
  return {
    recipient: `${to.name} <${to.email}>`,
    body: "You're pre-qualified for a loan!"
  };
}
```

- Arrow function flavour:

```typescript
const sendTextMessage = (
  to: IHasPhoneNumber
): { recipient: string; body: string } => {
  return {
    recipient: `${to.name} <${to.email}>`,
    body: "You're pre-qualified for a loan!"
  };
}
```

- TypeScript infers return types very well, however, is easy to slip up and unintentionally change things. The TS compiler will go through all the possible branches of our function, determining the possible output/return types. The issue with letting the compiler infer the return types is that types will change based on further implementation modifications and other part of our code using the function may not be aware of such additional returning possibilities. This is why we should keep the return type honest from the start, delimiting the possible outcomes.

```typescript
function getNameParts(contact: { name: string }) { // no return type specified
  const parts = contact.name.split(/\s/g); // split @ whitespaces
  if (parts.length === 1) {
    return { name = parts[0] }
  }
  if (parts.length < 2) {
    throw new Error(`Can't calculate name parts from name ${contact.name}`)
  }
  return {
    first: parts[0],
    middle: 
      parts.length === 2 
        ? undefined
        : // everything except first and last
          parts.slice(1, parts.length - 2).join(' '),
    last: parts[parts.length - 1]
  };
} // multiple return type possibilities will be inferred by the TS compiler
```

- Rest params work just as in JS. Type must be array-ish

```typescript
const sum = (...vals: number[]) => vals.reduce((sum, x) => sum + x, 0)
console.log(sum(3, 4, 6)); // 13
```

### Function Signature Overloading

We can provide specific valid ways to access certain function that allows multiple types of inputs. Even after narrowing the types of the arguments to the narrowest possible in order to implement correctly the function, there could be disallowed combination of the arguments when the function is called, and function overloading helps us taking care of this in TS:

```typescript
// Overload signatures:
function contactPeople(method: 'email', ...people: IHasEmail[]): void;
function contactPeople(method: 'phone', ...people: IHasPhoneNumber[]): void;

// Function implementation
function contactPeople(
  method: 'email' | 'people',
  ...people: (IHasEmail | IHasPhoneNumber)[]
): void {
  if (method === 'email') {
    (people as IHasEmail[]).forEach(sendEmail);
  } else {
    (people as IHasPhoneNumber[]).forEach(sendTextMessage);
  }
}
contactPeople('email', { name: 'foo', email: ''})
contactPeople('phone', { name: 'foo', phone: 2342342})
contactPeople('phone', { name: 'foo', email: ''}) // Invalid access to the function. Mixins not allowed.
```

- The function overloads/heads are what defines how the function should be used. The implmentation is not invoked in TS and it should be wide enough to account for all the cases the overload signatures define, however, the implementation is the actual point of access to the fn after compiling to JS.

### Lexical Scope

- The lexical scope ('this') of a function is part of its signature:

```typescript
function sendMessage(
  this: IHasEmail | IHasPhoneNumber,
  preferredMethod: 'phone' | 'email'
) {
  if (preferredMethod === 'email') {
    console.log('sendEmail');
    sendEmail(this);
  } else {
    console.log('senTextMessage');
    sendTextMessage(this);
  }
}
const c = { name: 'Oscar', phone: 1234215, email: 'oscar@example.com' }

function invokeSoon(fn: () => any, timeout: number) {
  setTimeout(() => fn.call(null), timeout);
}

// this is not satisfied
invokeSoon(() => sendMessage('email'), 500);

// creating a bound function is one solution
const bound = sendMessage.bind(c, 'email');
invokeSoon(() => bound(), 500);

// call/apply works as well
invokeSoon(() => sendMessage.apply(c, ['phone']), 500);
```

## 1.3. Interfaces & Type Aliases

### Type Aliases

- Type aliases allow us to give a type a name. We use the type keyword to declare them. The only time when a type will appear in the RHS of assigment.

```typescript
type StringOrNumber = string | number;
type HasName = { name: string };
```

  - We would want to use type aliases when dealing with primitive types (string, number, boolean, symbol, undefined and null).
  - Any type that can be used in a variable, we can also use a type alias for.
  - This is not true with an interface. Hence, type aliases are more flexible.
  - Self-referencing types don't work. Type aliases are not hoisted.

```typescript      
type NumVal = 1 | 2 | 3 | NumArr; // ERROR
type NumArr = NumVal[]; // ERROR
```

### Interfaces & extends

- Interfaces can extend from other interfaces. The keyword 'extends' (heritage clause alongside with 'implements') is used for this; it is used in inheritance of like-things.

```typescript
interface IHasInternationalPhoneNumber extends IHasPhoneNumber {
  countryCode: string;
}
```
  - We would want to use interfaces when dealing with mutable types like objects, arrays and functions.
  - Interfaces are parsed in a similar way as functions in JS. The are lazily parsed (contents of them are handled only when invoked, in contrast with type aliases that are eagerly parsed).

### Call & Construct Signatures

- Interfaces can describe types for the object type and all sub-objects like functions and arrays. Anything that has a prototype.

```typescript
// Describing a call signature with interfaces
interface IContactMessenger1 {
  (contact: IHasEmail | IHasPhoneNumber, message: string): void;
}
```

- Type aliases on the other hand, can describe both primitive and object types.

```typescript
// Describing a call signature with a type alias
type ContactMessenger2 = (
  contact: IHasEmail | IHasPhoneNumber,
  message: string
) => void; // notice that call signature in type aliases use the fat arrow.
```

- When using type aliases/interface to describe a call signature of a function been declared, we get something called context inferring. This allows us to skip any aditional type annotation inside the function been called (both on the arguments as well in the return type. TS will infer the types involved based on the call signature type).

```typescript
const emailer: ContactMessenger1 = (_contact, _message) => {
  // No type annotations needed nor for arguments neither for the function's return type 
};
```

- Construct signatures can be described as well

```typescript    
interface IContactConstructor {
  new ( ...args: any[]): IHasEmail | IHasPhoneNumber;
} // we could use this to describe a constructor from a JS class
```

### Dictionary Objects & Index Signatures

- Index signatures allow to give more flexibility to object types in the sense multiple key/value pairs as properties can be defined, with the type of both key and value limited to what we specify in the index signature.

  - At most, a type may have one string and one number index signature

```typescript
interface IPhoneNumberDict {
  [numberName: string]: undefined | {
    areaCode: number;
    num: number;
  };
}

let obj: IPhoneNumberDict = {}; // object with no properties defined allowed in this example.
if (typeof obj.abc === "string") {
  obj.abc
}

const phoneDict: IPhoneNumberDict = {
  // the structure of the values are enforced but we have complete control over the key name.
  office: { areaCode: 1234, num: 2435345 },
  home: { areaCode: 324235, num: 5345435 } // this property could be ommited without any compliance from TS
}
```

### Combining Interfaces

- Interfaces are 'open', meaning any declarations of the same name are merged:

```typescript
interface IPhoneNumberDict {
  home: {
    areaCode: number;
    num: number;
  };
  office: {
    areaCode: number;
    num: number;
  };
} // these property type declarations are now required in this interface!

const phoneDict2: IPhoneNumberDict = {
  office: { areaCode: 2342, num: 2342 },
  home: { areaCode: 2344, num: 5245 },
  iphone: { areaCode: 252, num: 145234 } // properties aside office and home are not mandatory.
};
```

- The self-referencing issue when using only type aliases can be solved including an interface:

```typescript
type NumVal = 1 | 2 | 3 | INumArr;
interface INumArr extends Array<NumVal> {};

const x: NumVal = [1, 2, 3, 1, 2, [3, 1, 1, 2]]; // GOOD!
```

### Type Tests

- We can write test cases around thing that are purely types:

  - Microsoft has a library called dtslint which uses tslint. It basically parses the ts linting error messages and compare it against special comments that we leave next to types.

  - We can use this in an early area of our code that is a little bit abstract and we really want to have some confidence around changes been non-destructive.

```typescript
type JSONValue = string
  | number
  | boolean 
  | symbol
  | undefined 
  | null 
  | JSONObject
  | JSONArray

interface JSONObject {
  [k: string]: JSONValue
}

interface JSONArray extends Array<JSONValue> {}

const arr: JSONValue = ["", 3454, () => false]; // ERROR

const str: JSONValue = "hello";
const num: JSONValue = 5;
const f: JSONValue = false;
const t: JSONValue = true;
const n: JSONValue = null;

function isJSONValue(val: JSONValue) {}
function isJSONArray(val: JSONArray) {}
function isJSONObject(val: JSONObject) {}

isJSONValue([]); 
isJSONValue(false) // $ExpectType false
isJSONValue(() => 3) // $ExpectError

isJSONArray([]);
isJSONArray(['abc', 4]);
isJSONArray(4); // $ExpectError
isJSONArray('abc'); // $ExpectError

isJSONObject([]); // $ExpectError
```

## 2.4. Classes

### Classes

Work similarly to what you're used to seeing in JS. They can "implement" interfaces:

```typescript
class Contact implements IHasEmail {
  email: string; // both these properties are stated to exist in the class (due to the interface implemented)
  name: string; // declaring their types must be done up front in the class declaration 
  constructor(name: string, email: string) {
    this.email = email;
    this.name = name;
  }
}
```

### Access Modifiers & Initialization

TS provides parameter properties (in conjuction with access modifier keywords) as a shortcut to avoid all the verbosity required in class declarations.

```typescript
class ParamPropContact implements IHasEmail {
  constructor(
    public name: string,
    public email: string = "no email" // default values are allowed as in JS 
  ) {
    // nothing needed
  }
}
```

Access modifier keywords determines who can access the class members (members refer to properties and methods):

  - public - Everyone can access it
  - protected - Where it is declared and subclasses
  - private - Only where it is declared

```typescript
class OtherContact implements IHasEmail, IHasPhoneNumber {
  protected age: number = 0; // The type annotation could be ommited, letting TS infer it from the default initializer
  private password: string; // Both of these properties represent the ones that aren't provided from outside through function arguments
  
  public constructor(
    public name: string,
    public email: string,
    public phone: number) {
      this.age = 35;
      this.password = Math.round(Math.random() * 1e14).toString(32);
  }
}
```

### Definite Assignment & Lazy Initialization

In cases where a required property could be initialized asynchronously or through a getter, we need to let TS know about it usign one of the following approaches:

- Adding an undefined type to the property to inform TS that it may or may not be declared in the future
- Use the new definite assigment operator (!), which basically tells TS that we are sure the property will be defined in the future and it should bypass the compiler error.

```typescript
class OtherContact implements IHasEmail, IHasPhoneNumber {
  protected age = 0;
  // private password: string | undefined;
  private passwordVal!: string; // Notice the usage of !

  public constructor(
    public name: string,
    public email: string,
    public phone: number) {
      this.age = 35;
  }

  async init() {
    this.password;
    //  this.password = Math.round(Math.random() * 1e14).toString(32);
  }

  get password(): string {
    if (!this.passwordVal) {
      this.passwordVal = Math.round(Math.random() * 1e14).toString(32);
    }
    return this.passwordVal;
  }
  
}
``` 
  
### Abstract Classes

TypesScript allows us to define abstract classes, which represents classes that follow the next behaviors:

  - Can't be directly instantiated, they are intended to be just implemented by subclasses. 
  - Subclasses must fill in (declare) any abstract methods or properties from the abstract class implemented.

```typescript      
abstract class AbstractContact implements IHasEmail, IHasPhoneNumber {
  public abstract phone: number; // Must be implemented by non-abstract subclasses

  constructor(
    public name: string,
    public email: string, // must be public to satisfy IHasEmail
  ) {}

  abstract sendEmail(): void; // must be implemented by non-abstract subclasses
}  

class ConcreteContact extends AbstractContact {
  constructor(
    public phone: number, // Must happen before non property-parameters
    name: string,
    email: string
  ) {
    super(name, email);
  }

  sendEmail() {
    // mandatory!
    console.log("sending an email");
  }
}
```

## 2.5. Converting to TypeScript

### Converting JS to TS: 3 steps for success

- What not to do:

  - Functional changes at the same time: this can be as suttle as the implementation difference of checking if a value is truthy or falsy and a typeof check (null, 0 and [] is going to be handle differently).
  - Attempt this with low test coverage.
  - Let the perfect be the enemy of the good: don't try to type things too strongly too early on. The goal is to get converted and from there start to see benefits of strong typing
  - Forget to add test for your types: dtslint is the way to type test specifically to type information only.
  - Publish types for consumer use while they're in a "weak" state (for libraries publishing).
    
#### Step 1: Compiling in "loose mode"

- Start with test passing.
- Rename all .js to .ts, allowing implicit any:
  - Implicit any's pop up whenever the TS compiler can't infer a more specific and useful type.
  - An example of this is function argument types. If the type is not declared with them, an implicit any will be inferred by TS even when in the function body there were clues that TS could to determine the type. Type inferring does not flow up from the point of argument usage to its declaration:

```typescript
function foo(a) { // type of 'a' is inferred to be of any, no matter what is typed in the function's body
  a.split(', ')
}
```

  - The exception to the above stated is when using type interfaces for function declarations / callbacks. Here, the argument types will be determined by what it is defined in the interface for the function call.

- Fix only things that are not type-checking, or causing compile errors: for example, when typing classes in TS. It is common to forget that we need to declared the type of the arguments required by the class constructor up front at the beginning of the class declaration.
- Be careful to avoid changing behavior.
- Get tests passing again.
      
#### Step 2: Explicit any 

- Start with test passing.
- Ban implicit any: add `"noImplicitAny": true` into the tsconfig.json file under "compilerOptions".
- Where possible, provide a specific and appropiate type.
  - Import types for dependencies from DefinitelyTyped (open source project on npm that provides typed supersets upon JS code for other open source libraries like Node, React, Lodash, etc).
  - Otherwise explicit any.
- Get test passing again.

#### Step 3: Squash explicit anys, enable strict mode

- Incrementally, in small chunks...
- Enable strict mode:

```typescript
"strictNullChecks": true, // null is not regarded as a valid value in any type. The only thing that can hold null, is null.
"strict": true, // 
"strictFunctionTypes": true, // 
"strictBindCallApply": true
```

- Replace explicit anys with more appropriate types. Trying to avoid type casting as much as possible (the usage of 'as' that forces something to be regarded as a specific type)
- Try really hard to avoid unsafe cats (?).

## 2.6. Generics   
          
### Generics

Generics allow us to parameterize types in the same way that functions parameterize values:

```typescript
// param determines the value of x
function wrappedValue(x) {
  return {
    value: x
  };
}

// type param determines the type of x
interface WrappedValue<x> {
  value: x;
}
  
let val: WrappedValue<string[]> = { value: [] }
```

- We can name this parameters whatever we want, but a common convention is to use capital letters starting with 'T' (a convention from C++)
- Type parameters can have default types just like function parameters:

```typescript
interface FilterFunction<T = any> {
  (val: T): boolean;
}

const stringFilter: FilterFunction<string> = val => typeof val === "string";
stringFilter(0); // ERROR
stringFilter('abc'); // OK
```

### Type Parameters

- We don't have to use exactly the type parameter as an arg, things can be based on the type parameter as well.

```typescript
function resolveOrTimeout<T>(promise: Promise<T>, timeout: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const task = setTimeout(() => reject("time up"), timeout);

    promise.then(val => {
      clearTimeout(task);

      resolve(val);
    });
  });
} 
// the type parameter T will become the same type as whatever the promise's val is.

// A type parameter is not needed to be passed when calling the function because is inferred from the val returned from the promise.
resolveOrTimeout(fetch(""), 3000);
```
  
*** Constraints & Scope ***        
  
Type parameters can have constraints. They allow to define the minimun requirements for the shape of the type within the function implementing it:

```typescript  
function arrayToDict<T extends { id: string }>(array: T[]): { [k: string]: T} {
  const out: { [k: string]: { id: string } } = {};
  array.forEach(val => {
    out[val.id] = val;
  });
  return out;
}  

const myDict = arrayToDict([
  { id: 'a', value: 'first', lisa: 'Huang' },
  { id: 'b', value: 'second'},
]); 
```

Like function arguments, type parameters are associated with scopes:

```typescript
function startTuple<T>(a: T) {
  return function finishTuple<U>(b: U) { // type parameter U is only accessible from within finishTuple()
    return [a, b] as [T, U];
  };
}
const myTuple = startTuple(["first"])(42);
```

### Use Cases

- Generics are necessary when we want to describe a relationship between two or more types (i.e., a function argument and return type).
- Aside from interfaces and types aliases, if a type parameter is used once, it can probably be eliminated.
- A rule to follow when using generics is to request the minimum we need and return everything we can. 

```typescript
interface IShape {
  draw();
}

interface ICirlce extends IShape {
  radius: number;
}

function drawShapes1<S extends IShape>(shapes: S[]) {
  // generic type parameter is used only once here
  shapes.forEach(s => s.draw());
}

function drawShapes2(shapes: IShape[]) {
  // This is simpler. Above type param is not necessary
  shapes.forEach(s => s.draw());
}
```

### Notes on Dictionary Challenge

- Notice that in the exercise solution approach, type parameters have to be used to define what the function does. The implementation (function call) of the function created does not require to receive the types of these type parameters in an explicit way thanks to how we wrote the function; the type parameters are inferred from the inputs passed to the function. 

- This would be a well chosen use of generics. The function written represents a flexible piece of code, we have just the level of specificity that we need, etc.

## 2.7. Top & Bottom Types
  
### Top Types

- "Top Types" are types that can hold any values. TypeScript has two built-in top types:

  - any: anys are good for areas of our programs where we want maximum flexibility. Sometimes a `Promise<any>` is fine when we don't care at all the type the promise resolves to.

```typescript
async function logWhenResolved(p: Promise<any>) {
  const val = await p;
  console.log("Resolved to", val);
}
```

  - unknown: it can take any value just as "any" does. The difference between this and any is related with the way we handle access to the typed variables; whereas with any we can access whatever value we desired treating variables as if they were objects, with unknown we can't.

```typescript
let myAny: any = 32;
let myUnknown: unknown = 'hello, unknown';

myAny.foo.bar.baz; // NO PROBLEM
myUnknown.foo; // ERROR
```

    - While there is no constraint in the value type that unknown can hold, we cannot access anything from it without some sort of narrowing/type assertion before we can use it.
    - They are good for "private" values that we don't want to expose. They can still hold any value, we just must narrow the type before trying to access it.

```typescript
myUnknown.split(", "); // ERROR

if (typeof myUnknown === "string") {
  // in here, myUnknown is of type string
  myUnknown.split(", "); // OK
};

if (myUnknown instanceof Promise) {
  // in here, myUnknown is of type Promise<any>
  myUnknown.then(x => console.log(x));
};
```

### Type Guards

We can also create our own type guards, using functions that return booleans:

  - Type casting of IHasEmail is used here to tell the TS compiler to treat the input value as of type IHasEmail. It is up to the type guard the execution of the code branch where x is of IHasEmail.

```typescript
function isHasEmail(x: any): x is IHasEmail {
  return typeof x.name === "string" && typeof x.email === "string";
}

if (isHasEmail(myUnknown)) {
  // In here, myUnknown is of type IHasEmail
  console.log(myUnknown.name, myUnknown.email);
}
```

- Author's most common guard:

```typescript
function isDefined<T>(arg: T | undefined): arg is T {
  return typeof arg !== "undefined";
}

const list = ['a', 'b', 'c', undefined, 'e']
const filtered = list.filter(isDefined); // filtered is of type string[] here.
```

  - Notice in the example above that we have removed the undefined value and also the undefined type that filtered would've get. The type casting 'arg is T' from the isDefined function definition is casting the type on every element a given array that is passed through it.
            
### Unknowns & Branded Types

- When dealing with multiple unknowns, we kind of lose some of the benefits of structural typing. Unknowns can get mixed even when they aren't structurally equal:

```typescript
let aa: unknown = 41;
let bb: unknown = ['a', 'string', 'array'];
bb = aa; // Allowed by TS compiler. This shouldn't happen.
```

- We can then use another type in TS called Branded types:

  - To avoid the above example of mixing unknowns of different structures, we can create types with structures that are difficult to accidentally match. To achieve this we have to involve type casting into the mix:
      
```typescript
  // Two branded types, each with 'brand' and 'unbrand' functions
  interface BrandedA {
    _this_is_branded_with_a: "a";
  }

  function brandA(value: string): BrandedA {
    return (value as unknown) as BrandedA;
  }

  function unbrandA(value: BrandedA): string {
    return (value as unknown) as string;
  }
  
  interface BrandedB {
    _this_is_branded_with_b: "b";
  }

  function brandB(value: { abc: string }): BrandedB {
    return (value as unknown) as BrandedB;
  }

  function unbrandB(value: BrandedB): { abc: string } {
    return (value as unknown) as { abc: string };
  }
      
  let secretA = brandA("This is a secret value");
  let secretB = brandB({ abc: "This is a different secret value" });

  secretA = secretB; // ERROR. THATS GOOD!!
      
  // We can't mix function that expect certain type structure neither
  unbrandB(secretA); // ERROR
  unbrandA(secretB); // ERROR
      
  // Back to our original values
  let revealedA = unbrandA(secretA);
  let revealedB = unbrandA(secretB);
      
  // PROTIP - always brand/unbrand casting in exactly one place (same module for example)
```

### Bottom Types

- Never and all bottom types can hold no values. A common place where we'll end up with a never is through narrowing exhaustively:

```typescript
let x = "abc" as string | number; // Type casting used here for the purpose of the example.
      
if (typeof x === "string") {
  // x is a string here
  x.split(", ");
} else if (typeof x === "number") {
  // x is a number here
  x.toFixed(2);
} else {
  // x is a never here, if we have been good about our types
}
```

- We can use this to our advantage to create exhaustive conditional checking:

```typescript
class UnreachableError extends Error {
  constructor(val: never, message: string) {
    super(`TypeScript thought we could never end up here \n ${message}`)
  }
}
      
let y = 4 as string | number;
      
if (typeof y === "string") {
  // y is a string here
  y.split(", ");
} else if (typeof y === "number") {
  // y is a number here
  y.toFixed(2);
} else {
  throw new UnreachableError(y, "y should be a string or number");
}
```  
  - If we add an additional type possibility to the declaration of y, we would end up having an error at the last else clause where the error is thrown, indicating us that we have unhandled type checkings and that we must address them. Take for example:

```typescript
let y = 4 as string | number | boolean;

// By the point the last else clause is reached, the type of y could either be never or a boolean if we dont take care of that unhandled scenario.
```

  - The type checker in the case we handle all the possible variations of the variable type, is what is called an exhaustive switch/conditional. It ensures we handled everything before we reach the last else clause.
                
## 2.8. Advanced Types

### Mapped Types & Conditional Types & Type Queries
            
- Mapped types allow the use of an interface to transform keys into values from an interface:

```typescript
interface ICommunicationMethods {
  email: IHasEmail;
  phone: IHasPhone;
  fax: { fax: number };
}
        
function contact<K extends keyof ICommunicationMethods>(
  method: K,
  contact: ICommunicationMethods[K] // turning key into value
)

// This can be used as alternative to function overloading
contact("email", { name: "foo", email: "oscar@example.com" });
contact("phone", { name: "foo", phone: 52345234 });
contact("fax", { fax: 2455 });

// We can get all values by mapping through all keys
type AllCommKeys = keyof ICommunicationMethods; // "email" | "phone" | "fax"
type AllCommValues = ICommunicationMethods[keyof ICommunicationMethods]; // IHasEmail | IHasPhoneNumber | { fax: number; }
```

- Using mapped types allow us to take advantage of automatic updates regarding types when the interface is updated, saving us from the need of typing additional function overload heads, for example.
          
  - Type queries allow us to obtain the type from a value using typeof

```typescript  
const alreadyResolvedNum = Promise.resolve(4);

type ResolveType = typeof Promise.resolve;

const x: ResolveType = Promise.resolve;
x(42).then(y => y.toPrecision(2));
```
  - Conditional types allow for the use of a ternary operator w/ types.
    - We can also extract type parameters using the _infer_ keyword. It can only be used inside of generics.

```typescript
type EventualType<T> = T extends Promise<infer S> // if T extends Promise
  ? S // extract the type the promise resolves to 
  : T; // otherwise just let T pass through
  
let a: EventualType<Promise<number>>; // a is number here
let b: EventualType<number[]>; // b is of type number[]
```

### Built-in Utility Types

- Partial allows us to make all properties of an object optional:

```typescript
type MayHaveEmail = Partial<IHasEmail>;
const me: MayHaveEmail = {}; // everything is optional { name?: string; email?: string }
```

- Pick allows us to select one or more properties from an object:

```typescript
type PickA = Pick<{a: 1, b: 2}, "a">;
const y: PickA = { a: 1 };

y. // only prompt us the "a" property as accessible
```

- Extract lets us obtain a subset of types that are assignable to something:

```typescript
type OnlyStrings = Extract<"a" | "b" | 1 | 2, string>;
```

- Exclude lets us obtain a subset of types that are not assignable

```typescript
type NotStrings = Exclude<"a" | "b" | 1 | 2, string>;
```

- Record helps us create a type with specified property keys and ...

### 09. Declaration Merging ###        
        
  -> ???????????????????//

### 10. Declaration Merging ###        
        
  ->
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
*/




// /*
// **
// **
// *********************************
// **
// **
// */

// interface ContactConstructor {
//   (contact: IHasEmail | IHasPhoneNumber, message: string): IHasEmail | IHasPhoneNumber;
// }

// class Contact1 implements IHasPhoneNumber {
//   name: string;
//   phone: number;
//   constructor(contact: IHasPhoneNumber, message: string) {
//     this.name = contact.name;
//     this.phone = contact.phone;
//   }
// }

// class Contact2 implements IHasPhoneNumber {
//   constructor(public name: string, public phone: number) {

//   }
// }


// class OtherContact implements IHasEmail, IHasPhoneNumber {
//   protected age = 0;
//   private passwordVal!: string;
//   constructor(
//     public name: string,
//     public email: string,
//     public phone: number
//   ) {
//     this.age = 35
//   }


//   get password() {
//     if (!this.passwordVal) {
//       this.passwordVal = `hellopassword`
//     }
//     return this.passwordVal;
//   }

//   async init() {
//     this.password
//   }
// }

// /*
// **
// **
// ***************GENERICS******************
// **
// **
// */

// // interfaces can have parameters (which make them generics!) just as a function does with its arguments
// interface FilterFunction<T = any> {
//   (val: T): boolean;
// }

// const newFunction: FilterFunction<string> = (val) => typeof val === "number";

// newFunction("abc")

// /* type Parameters with constraints ---> T must be assignable (extends from) to an object with at least the following shape: {id: string, ...}*/
// function arrayToDict<T extends { id: string }>(array: T[]): { [k: string]: T } {
//   const out: { [k: string]: T } = {};
//   array.forEach((val) => {
//     out[val.id] = val;
//     // the line above is what requires T to have the specified shape at the beginning
//     // T must be an object with at least a property "id" on it!
//   });
//   return out;
// }

// const myDict = arrayToDict([
//   { id: "1", value: "first", lisa: "HUang" },
//   { id: "2", value: "second" }
// ])

// /*
//   function with type parameters that uses a generic type
// */

// /*
// ****** implementation in plain JS ===> input = { key: value, key1: value1, ...} --- output = { key: valueModified, key1: valueModified1, ...}

// function mapDict(
//   dict, 
//   fn
// ) {
//   const output = {}
//   Object.keys(dict).forEach((val, idx) =>{
//     output[val] = fn(dict[val], idx)
//   })
//   return output
// }

// mapDict(
//   {favNum: 2, luckyNum: 20},
//   (num) => ({ val: num })
// )

// */

// type Dict<T> = {
//   [anythingWeWant: string]: T | undefined;
// }

// function mapDict<T, S>(
//   dict: Dict<T>,
//   fn: (val: T, idx: number) => S
// ): Dict<S> {
//   const output: Dict<S> = {}
//   Object.keys(dict).forEach((dkey, idx) => {
//     const thisKeyVal = dict[dkey];
//     if(typeof thisKeyVal !== 'undefined'){
//       output[dkey] = fn(thisKeyVal, idx)
//     }
//   })
//   return output
// }

// /*
// * Type params T and S will be defined on the go during the function creation
// */

// mapDict(
//   { favNum: 2, luckyNum: 20 },
//   (num) => ({ val: num })
// )