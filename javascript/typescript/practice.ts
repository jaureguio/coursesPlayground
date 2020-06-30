/* 

#
#
####### TYPESCRIPT FUNDAMENTALS, V1 #######
#
#

/* ### 02. TYPES ### */

/*
  *** Challenge 1: Color Functions ***

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

    console.log(hexToRgb('ffbbcc'));

    export function rgbToHex(r: number, g: number, b:number): string {  
      let rgb = [r,g,b];
      return rgb
        .map((rgbCh) => Math.max(0, Math.min(rgbCh, 255)).toString(16))
        .map((hexCh) => hexCh.length < 2 ? `0${hexCh}` : hexCh)
        .join(``);
    }

    console.log(rgbToHex(12,34,212)) 
*/

/*
  *** Challenge 2 - Account Manager ***

    interface User {
      email: string;
      password: string
    }

    interface ConfirmedUser extends User {
      isActive: true; // This is called a 'literal type'. Boolean could've be used aswell if false was
                          also allowed
    }
    
    interface Admin extends ConfirmedUser {
      adminSince: Date; // Any constructor can be used as type in addition to the primitive types.
    }
*/

/* ### 03. CLASSES ### */

/* 
  *** Challenge 3: Card Dealing ***

    enum Suit {
      Clubs, Diamonds, Hearts, Spades
    } // Suit is compiled to JS as { Suit['Clubs'] = 0, Suits[0] = 'Clubs' ...}

    enum CardNumber {
      Ace, Two, Three, Four, Five, Six, Seven, Eight, Nine,
      Ten, Jack, Queen, King
    }

    type Card = [Suit, CardNumber]
    
    function createDeck(): Card[] {
      let deck: Card[] = []
      for(let s = 0; s < Object.keys(Suit).length; s+=2) {
        for(let c = 0; c < Object.keys(CardNumber).length; c+=2) {
          deck.push([s/2, c/2])
        }
      }
      return deck;
      
      
      // Alternate way of creating the deck of index
      //   let suits = Object.keys(Suit);
      //   let cardNumbers = Object.keys(CardNumber);

      //   suits.forEach((_, sIdx) => {
      //     if (sIdx % 2 === 0) {
      //       cardNumbers.forEach((_, cnIdx) => {
      //         if (cnIdx % 2 === 0) {
      //           deck.push([sIdx/2, cnIdx/2])
      //         }
      //       })
      //     }  
      //   })
      
    }

    // Swaps values of currentIdx with a random idx from the array bounded by (currentIdx, randomIdx). This means that the currentIdx will be excluded 
    // from iteration in subsequent iterations.
    function shuffleArray (arr: any[]) {
      arr.forEach((_, idx) => {
        let randomIdx: number = Math.floor(Math.random()*(arr.length - idx)) + idx;
        [arr[randomIdx], arr[idx]] = [arr[idx], arr[randomIdx]]
      })
      return arr;
    }

    class Dealer {
      cards: Card[]
      constructor() {
        this.cards = createDeck()
        shuffleArray(this.cards)
      }
      dealHand(cardsQty: number): Card[] {
        if (this.cards.length < cardsQty) throw new Error ("Not enough cards left in the current deck")
        if (cardsQty < 0) throw new Error ("Please tell me how many cards you want to receive!") 
        // The Error constructor is used here in order to keep the current call stack in place after throwing
        return this.cards.splice(this.getLength() - cardsQty, cardsQty)
      }
      readCard(card: Card): string {
        let [suit, cardNumber] = card
        return `${CardNumber[cardNumber]} of ${Suit[suit]}`
      }
      getLength(): number {
        return this.cards.length
      }
    }

    let d = new Dealer();

    let myHand = d.dealHand(5);

    myHand.forEach((card) => console.log(d.readCard(card)));  
*/

/* ### 04. OBJECT LITERALS ### */

/*
  *** Challenge 4: Functional Cashier ***

    interface CartItem {
      name: string;
      price: number;
      qty: number;
    }

    interface CartApi {
      length: number;
      total: number;
      addItem(item: CartItem): CartApi
      add(name: string, price: number, qty?: number): CartApi
    }

    function cashier(): CartApi {
      let cart: CartItem[] = [];

      return {
        addItem(item) {
          cart.push(item);
          return this;
        },
        add(name, price, qty=1) {
          cart.push({ name, price, qty });
          return this;
        },

        get length() {
          return cart.reduce((acc, {qty}) => acc + qty, 0)
        },

        get total() {
          return Math.round(cart.reduce((acc, {price, qty}) => acc + price*qty, 0)*100)/100
        }
      }
    }

    let cart = cashier();
    cart
      .add('Apple', .99)
      .add('Pear', 1.99, 2)
      .addItem({
        name: 'Banana',
        price: 2.99,
        qty: 3
      })

    console.log(`Your total for ${cart.length} items is ${cart.total}`)
*/

/* ### 05. GENERICS  ### */

/*
  *** Challenge 5 - Typed Stack ***
      
  // The I in IStack is used in order to follow a common convention in TS to refer to interface and differentiate themvfrom classes
  interface IStack<T> { 
    push(items: T): IStack<T>;
    push(items: T[]): IStack<T>;
      pop(): T | undefined;
      length(): number;
      print(): void;
    }
    
    interface IStackNode<T> {
      data: T;
      next: IStackNode<T> | undefined;
    }
    
    export class Stack<T> implements IStack<T> {
      private head: IStackNode<T>;
      
      push(items: T): Stack<T>;
      push(items: T[]): Stack<T>;
      push(items: T | T[]): Stack<T> {
        if (items instanceof Array) {
          items.forEach((i) => {
            this.push(i);
          })
        } else {
          let n = {
            data: items,
            next: this.head
          }
          this.head = n;
          return this;
        }
      }
      
      pop(): T | undefined {
        let n = this.head;
        if(!n) return undefined;
        this.head = n.next;
        return n.data;
      }
      
      length(): number {
        let n = this.head;
        let count = 0;
        while (n) {
          n = n.next;
          count++;
        }
        return count;
      }
      
      print(): void {
        let n = this.head;
        if (!n) return undefined;
        while(n) {
          console.log(n)
          n = n.next
        }
      }
    }
    
    let stack = new Stack<string>()
    console.log(stack)
    stack.push("lemon")
    stack.push(["apple","orange","banana"])
    console.log(stack.pop())
    console.log(stack.pop())
    stack.print()
*/
    

/* ### 06. ITERATORS & GENERATORS ### */

/* 
  let oscar = {
    _name: 'Oscar',
    [Symbol.iterator]() {
      let i = 0;
      let str = this._name;
      return {
        next() {
          if (i < str.length) return { value: str[i++], done: false }
          return { value: undefined, done: true }
        }
      }
    }
  };

  // let it = oscar[Symbol.iterator]();

  for (let letter of oscar) {
    console.log(letter)
  }
*/

  
/*  
  *** Challenge 06 - Fibonacci Generator *** */

/* 
    function* getFibSequence() {
      let twoAgo = 1;
      let oneAgo = 0;
      while(true) {
        let val = twoAgo + oneAgo;
        yield val;
        twoAgo = oneAgo;
        oneAgo = val;
      }
    }

    let fib = getFibSequence()
    console.log(fib)
*/  
  
/*
    *** Implementation using plain closure in a iterator form:

        function getFibSequence() {
          let two = 1
          let one = 0
          return {
            next() {
              let val = one + two;
              [two, one] = [one, val];
              return val;
            }
          }
        }
*/

/*
    *** Async/await implementation using Promises and Generators ***

        ->USING PLAIN JAVASCRIPT`:

          function wait(ms) {
            return new Promise((resolve) => {
              setTimeout(resolve, ms)
            })
          }

          function isPromise(fn) {
            return fn instanceof Promise;
          }

          function* generator() {
            let first = yield wait(1500).then(() => 'FIRST');
            console.log(`first: ${first}`);
            let second = yield wait(1500).then(() => 'SECOND');
            console.log(`second: ${second}`)
        //  let third = yield `third`;
            return 'third'
            console.log(third)
          }

          function task(genFn) {
            let p = new Promise((resolve) => {
              let it = genFn();
              let lastVal;

              function nextStep(lastPromiseVal) {
                let {value, done} = it.next(lastPromiseVal)
                  if (done && typeof value === 'undefined') {
                  // console.log('done')
                  lastVal = lastPromiseVal
                  resolve({value, lastVal})
                  return;
                } else {
                  lastVal = value;
                  if (isPromise(value)) {
                    // console.log('is a promise');
                    value.then((promiseVal) => {
                      nextStep(promiseVal);
                    })
                  } else {
                    // console.log('not a promise');
                    nextStep(value);
                  }
                }
              }
              nextStep();
            })
            return p
          }

          task(generator).then(({val, lastVal}) => console.log(val, lastVal))


        ->USING TYPESCRIPT:

            function wait<T>(ms: number): Promise<T> {
              return new Promise((resolve) => {
                setTimeout(resolve, ms)
              })
            }

            function isPromise<T>(fn: Promise<T>): boolean {
              return fn instanceof Promise;
            }

            function task<T>(genFn: () => IterableIterator<any>): Promise<T> {
              let p = new Promise<T>((resolve) => {
                let it = genFn();
                let lastVal: any;

                function nextStep(lastPromiseVal: any) {
                  let {value, done} = it.next(lastPromiseVal)
                  if (done && typeof value === 'undefined') {
                    // console.log('done')
                    resolve(lastVal as T)
                    return;
                  } else {
                    lastVal = value;
                    if (isPromise(value)) {
                      // console.log('is a promise');
                      value.then((promiseVal: any) => {
                        nextStep(promiseVal);
                      })
                    } else {
                      // console.log('not a promise');
                      nextStep(value);
                    }
                  }
                }
                nextStep();
              })
              return p
            }

            task(function* () {
              let first = yield wait(1500).then(() => 'FIRST');
              console.log(`first: ${first}`);
              let second = yield wait(1500).then(() => 'SECOND');
              console.log(`second: ${second}`)
              let third = yield `third`;
              console.log(third)
            })

          * The usage of several any's  in here should be avoided, but the point to prove here is the implementation of async/await with generators.
*/

/*

#
#
####### TYPESCRIPT FUNDAMENTALS, V2 #######
#
#

### 06. Generics ###

  *** Dictionary exercise ***
*/

/*

type Dict<T> = {
  [anythingWeWant: string]: T | undefined;
}

function mapDict<T, S>(
  dict: Dict<T>, 
  fn: (val: T, idx: number) => S
): Dict<S> {
  const out: Dict<S> = {};
  Object.keys(dict).forEach((dKey, idx) => {
    const thisItem = dict[dKey];
    if (typeof thisItem !== 'undefined') {
      out[dKey] = fn(thisItem, idx)
    }
  });
  return out;
}

console.log(mapDict({
  a: 'a',
  b: 'b'
}, (str) => ({ val: str })))
    
*/

/* Additional exercises on Generics */

/* 

interface IBook { 
  id: number;
  author: string;
}

interface IItem<T = any> { 
  [key: string]: T
}

function mapByKey<U extends IItem>(array: U[], key: keyof U): IItem<U> {
  return array.reduce((dict, item) => ({ ...dict, [item[key]]: item }), {})
}

mapByKey([
  { id: 1, author: "A" },
  { id: 2, author: "B" },
  { id: 3, author: "A" },
  { id: 4, author: "C" },
], "id")

/* Output

{
  '1': { id: 1, author: 'A' },
  '2': { id: 2, author: 'B' },
  '3': { id: 3, author: 'A' },
  '4': { id: 4, author: 'C' } 
}

*/

/* ********** */

/* 
interface IItem<T = any> { 
  [key: string]: T
}

interface IGroup<T> {
  [key: string]: T[]
}

function groupByKey<U extends IItem>(array: U[], key: keyof U) : IGroup<U> {
  // Array.prototype.reduce is a generic function on its own. We can specify the expected return type of the reduce to have better typing support.
  // dict: IGroup<U> would've worked here too
  return array.reduce<IGroup<U>>(( dict, item ) => {
    let group = item[key]
    if (group in dict) dict[group].push(item)
    else dict[group] = [item]
    
    return dict
  }, {})
}

groupByKey(
  [
    { id: 1, author: 'A' },
    { id: 2, author: 'B' },
    { id: 3, author: 'A' },
    { id: 4, author: 'C' },
  ],
  'author'
  ) 
  
  
  /* Output
  
  {
    'A': [ { id: 1, author: 'A' }, { id: 3, author: 'A' } ],
    'B': [ { id: 2, author: 'B' } ],
    'C': [ { id: 4, author: 'C' } ],
  }
  
  */
 
/* ********** */

/* 

interface IItem<T = any> {
  [key: string] : T
}

type ValueGetter<T = any> = (obj: T) => string | number

type SortingOrder = "ascending" | "descending"

function sortBy<U extends IItem>(array: U[], sortBy: ValueGetter<U>, sortOrder: SortingOrder) {
  if(sortOrder === "ascending") 
    return [...array].sort((a,b) => sortBy(a) > sortBy(b) ? 1 : -1)
  if (sortOrder === "descending")
    return [...array].sort((a,b) => sortBy(a) > sortBy(b) ? -1 : 1)
  return 'Sort order should be "ascending" or "descending"'
}

sortBy(
  [
    { id: 1, author: 'A' },
    { id: 2, author: 'B' },
    { id: 3, author: 'A' },
    { id: 4, author: 'C' },
  ],
  (item) => item.id,
  "descending"
)

*/