class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = []
  }

  enqueue(val, priority) {
    const newNode = new Node(val, priority);
    let PQ = this.values;
    let currentIdx = PQ.push(newNode) - 1;
    while(currentIdx > 0) {
      let pIdx = Math.floor((currentIdx-1)/2);
      let parent = PQ[pIdx];
      if(parent.priority < newNode.priority) break;
      [PQ[currentIdx], PQ[pIdx]] = [PQ[pIdx], PQ[currentIdx]]
      currentIdx = pIdx;
    }
  }

  dequeue() {
    const PQ = this.values;
    if(!PQ.length) return undefined;
    if(PQ.length === 1) return PQ.pop();
    [PQ[0], PQ[PQ.length-1]] = [PQ[PQ.length-1], PQ[0]]
    const min = PQ.pop()
    const idxQty = PQ.length - 1;
    let idx = 0;
    let swapped = true
    while(swapped) {
      swapped = false;
      let childIdxL = (2*idx + 1) <= idxQty ? 2*idx + 1 : undefined;
      let childIdxR = (2*idx + 2) <= idxQty ? 2*idx + 2 : undefined;
      if(childIdxL && childIdxR) {
        let childL = PQ[childIdxL].priority;
        let childR = PQ[childIdxR].priority;
        let smallestChildIdx = Math.min(childL, childR) === childL
                         ? childIdxL
                         : childIdxR
        swapper(smallestChildIdx);
      } else if(childIdxL) {
        swapper(childIdxL);
      } else if(childIdxR) {
        swapper(childIdxR);
      }
    } 
    function swapper(sIdx) {
      if(PQ[sIdx].priority < PQ[idx].priority) {
        [PQ[idx], PQ[sIdx]] = [PQ[sIdx], PQ[idx]]
        idx = sIdx;
        swapped = true;
      }
    }
    return min;
  }
}

let pq = new PriorityQueue()
pq.enqueue(41,8)
pq.enqueue(39,9)
pq.enqueue(18,1)
pq.enqueue(27,2)
pq.enqueue(27,11)
pq.enqueue(27,5)
pq.enqueue(27,3)
console.log(pq)
console.log(pq.dequeue())
console.log(pq)
console.log(pq.dequeue())
console.log(pq)
console.log(pq.dequeue())
console.log(pq)
console.log(pq.dequeue())
console.log(pq)
console.log(pq.dequeue())
console.log(pq)
console.log(pq.dequeue())
console.log(pq)
console.log(pq.dequeue())
console.log(pq)
console.log(pq.dequeue())
console.log(pq)


