class NewNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SingleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    if (!this.head) {
      this.head = new NewNode(val);
      this.tail = this.head;
    } else {
      this.tail.next = new NewNode(val);
      this.tail = this.tail.next;
    }
    this.length++;
    return this.length;
  }

  pop() {
    if (!this.head) return undefined;
    var node = this.head;
    var newTail = this.head; // or var newTail = node
    while(node.next) {
      newTail = node;
      node = node.next;
    }
    newTail.next = null;
    this.tail = newTail;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    } 
    return node; 
   
    /* Using get(idx) method
    if (!this.head) return undefined;
    var oldTail = this.tail;
    this.tail = this.get(this.length-2); // Using get(idx) method to retrieve the previous node to current tail node
    this.tail.next = null;
    this.length--
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return oldTail; 
    */
  }

  shift() {
    if(!this.head) return undefined;
    var oldHead = this.head
    this.head = oldHead.next;
    this.length--;
    if(this.length === 0) {
      this.tail = null;
    }
    return oldHead;
  }

  unshift(val) {
    var newNode = new NewNode(val);
    if(!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  get(idx) {
    if (idx < 0 || idx >= this.length || undefined) return undefined;
    var count = 0;
    var currentNode = this.head; // or var currentNode = node
    while(count < idx) {
      currentNode = currentNode.next;
      count++;
    }
    return currentNode;
  }

  set(idx, val) {
    var foundNode = this.get(idx);
    if(!foundNode) return false;
    foundNode.val = val;
    return true;
  }
 
  insert(idx, val) {
    if(idx < 0 || idx > this.length || idx === undefined || val === undefined) return false;
    if(idx === 0) return Boolean(this.unshift(val));
    if(idx === this.length) return Boolean(this.push(val));
    var newNode = new NewNode(val);
    var prevNode = this.get(idx-1);
    newNode.next = prevNode.next;
    prevNode.next = newNode;
    this.length++;
    return true
  }

  remove(idx) {
    if (idx < 0 || idx >= this.length || idx === undefined) return false;
    if (idx === 0) return Boolean(this.shift());
    if (idx === this.length - 1) return Boolean(this.pop());
    var prevNode = this.get(idx-1);
    var removed = prevNode.next;
    prevNode.next = removed.next;
    this.length--;
    return true;
  }

  reverse() {
    if (!this.head || this.head === this.tail) return this;
    var prev = null;
    var node = this.head;
    var next = node.next;
    [this.head, this.tail] = [this.tail, this.head];
    while (next) {
      [node.next, prev, node] = [prev, node, next];
      next = node.next;
    }
    node.next = prev;
    return this;

  /* 
    if (this.length <= 1) return this;
    let next;
    let prev = null; 
    let node = this.head;
    [this.head, this.tail] = [this.tail, this.head];
    while(node.next) {
      [next, node.next, prev] = [node.next, prev, node];
      node = next;
    }
    node.next = prev;
    return this;
  }
  */
  }
}

var newLL = new SingleLinkedList();
// console.log(newLL)
newLL.push(1)
newLL.push(2)
newLL.pop()
console.log(newLL.shift())
console.log(newLL.get(0))
console.log(newLL.unshift(5))
console.log(newLL.unshift(7))
console.log(newLL.get(1))
console.log(newLL.insert(2,4))
console.log(newLL)
console.log(newLL.reverse());
console.log(newLL.reverse()); 
