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

