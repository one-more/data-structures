import {BSTValue} from "../type"
import head from "ramda/src/head"
import last from "ramda/src/last"
import curry from "ramda/src/curry"

export default class BtreeNode {
  keys: BSTValue[] = [];

  children: BtreeNode[] = [];

  get isRoot() {
    return !this.parent
  }

  get minKeysLength(): number {
    if (this.isRoot) {
      return 1
    }
    return Math.floor(this.order / 2);
  }

  get maxKeysLength() : number {
    return this.order - 1;
  }

  constructor(
    public order: number,
    public parent: BtreeNode | null
  ) {
    this.order = order;
    this.parent = parent;
  }

  insert(value: BSTValue): BtreeNode {
    if (this.hasKey(value)) {
      return this
    }
    if (this.children.length) {
      let index = this.getNextKeyIndex(value);
      const child = this.children[index];
      const res = child.insert(value);
      return res.parent || res;
    }
    if (this.keys.length < this.maxKeysLength) {
      this.insertKey(value);
      return this;
    }
    this.insertKey(value);
    return split(this);
  }

  insertKey(key: BSTValue): number {
    const nextIndex = this.getNextKeyIndex(key);
    if (~nextIndex) {
      this.keys.splice(nextIndex, 0, key);
      return nextIndex;
    }
    this.keys.push(key);
    return this.keys.length - 1;
  }

  removeKey(value: BSTValue): void {
    const {keys} = this;
    this.keys = keys.filter(key => key != value);
  }

  hasKey(value: BSTValue): boolean {
    return this.keys.includes(value)
  }

  getNextKeyIndex(value: BSTValue): number {
    return this.getKeyIndex(
      (key: BSTValue) => key > value
    )
  }

  getKeyIndex(fn: Function): number {
    const {keys} = this;
    let i = 0;
    for (; i < keys.length; i++) {
      if (fn(keys[i])) {
        return i
      }
    }
    return i;
  }

  remove(value: BSTValue): BtreeNode {
    const {children} = this;
    if (this.hasKey(value)) {
      if (children.length) {
        return this.removeFromNode(value);
      }
      return this.removeFromLeaf(value);
    }
    return this.removeFromChild(value)
  }

  removeFromNode(value: BSTValue): BtreeNode {
    const rightChildIndex = this.getNextKeyIndex(value);
    const leftChild = this.children[rightChildIndex - 1];
    const rightChild = this.children[rightChildIndex];
    const rightmostKey = last(leftChild.keys);
    const leftmostKey = head(rightChild.keys);

    const swapLeft = () => this.swapChildKey(
      leftChild,
      value,
      rightmostKey
    );
    const swapRight = () => this.swapChildKey(
      rightChild,
      value,
      leftmostKey
    );

    if (leftChild.keys.length > leftChild.minKeysLength) {
      return swapLeft()
    }
    if (rightChild.keys.length > rightChild.minKeysLength) {
      return swapRight()
    }
    if (this.children[rightChildIndex + 1]) {
      return swapRight()
    }
    return swapLeft()
  }

  swapChildKey(child: BtreeNode, value: BSTValue, replaceKey: BSTValue): BtreeNode {
    const {keys} = this;
    this.keys = keys.map(key => {
      if (key == value) {
        return replaceKey
      }
      return key
    });
    child.removeKey(replaceKey);
    const res = child.rebalanceIfNeedTo();
    return res.parent.rebalanceIfNeedTo();
  }

  removeFromLeaf(value: BSTValue): BtreeNode {
    const {keys} = this;
    if (keys.length > this.minKeysLength) {
      this.removeKey(value);
      return this;
    }
    this.removeKey(value);
    return this.rebalance(value);
  }

  removeFromChild(value: BSTValue): BtreeNode {
    const index = this.getNextKeyIndex(value);
    const child = this.children[index];
    if (child) {
      const res = child.remove(value);
      return res.parent.rebalanceIfNeedTo()
    }
    return this;
  }

  joinLeftSib(lefttSib: BtreeNode, thisIndex: number): void {
    const {parent} = this;
    const rightmostKey = lefttSib.keys.pop();
    const rightChild = lefttSib.children.pop();
    const parentKey = parent.keys[thisIndex - 1];
    parent.keys[thisIndex - 1] = rightmostKey;
    this.keys.unshift(parentKey);
    if (rightChild) {
      this.children.unshift(rightChild)
    }
  }

  joinRightSib(rightSib: BtreeNode, thisIndex: number): void {
    const {parent} = this;
    const leftmostKey = rightSib.keys.shift();
    const leftChild = rightSib.children.shift();
    const parentKey = parent.keys[thisIndex];
    parent.keys[thisIndex] = leftmostKey;
    this.keys.push(parentKey);
    if (leftChild) {
      this.children.push(leftChild)
    }
  }

  mergeRight(rightSib: BtreeNode, thisIndex: number): void {
    const {parent, keys, children} = this;
    const parentKey = parent.keys[thisIndex];
    this.keys.push(parentKey);
    this.keys = keys.concat(rightSib.keys);
    this.children = children.concat(
      rightSib.children.map(setParent(this))
    );
    parent.keys.splice(thisIndex, 1);
    parent.children.splice(thisIndex + 1, 1);
  }

  mergeLeft(lefttSib: BtreeNode, thisIndex: number): void {
    const {parent} = this;
    const parentKey = parent.keys[thisIndex - 1];
    lefttSib.keys.push(parentKey);
    parent.keys.splice(thisIndex - 1, 1);
    lefttSib.keys = lefttSib.keys.concat(this.keys);
    lefttSib.children = lefttSib.children.concat(
      this.children.map(setParent(lefttSib))
    );
    parent.children.splice(thisIndex, 1)
  }

  needRebalance(): boolean {
    return this.keys.length < this.minKeysLength;
  }

  rebalanceIfNeedTo(value?: BSTValue): BtreeNode {
    if (this.keys.length == 0) {
      const {children} = this;
      return head(children);
    }
    if (this.needRebalance()) {
      return this.rebalance(value);
    }
    return this;
  }

  rebalance(value?: BSTValue): BtreeNode {
    if (!value) {
      const {keys} = this;
      value = head(keys) as BSTValue;
    }
    const {parent} = this;
    const thisIndex = parent.getNextKeyIndex(value);
    const leftSib = parent.children[thisIndex - 1];
    const rightSib = parent.children[thisIndex + 1];
    if (rightSib && rightSib.keys.length > rightSib.minKeysLength) {
      this.joinRightSib(rightSib, thisIndex);
      return this;
    }
    if (leftSib && leftSib.keys.length > leftSib.minKeysLength) {
      this.joinLeftSib(leftSib, thisIndex);
      return this;
    }
    if (rightSib) {
      this.mergeRight(rightSib, thisIndex);
      return this;
    }
    if (leftSib) {
      this.mergeLeft(leftSib, thisIndex);
      return this;
    }
    return this;
  }

  has(value: BSTValue): boolean {
    if (this.hasKey(value)) {
      return true;
    }
    return this.children.map(child => child.has(value))
      .some(Boolean);
  }
}

function createParent(node: BtreeNode): BtreeNode {
  const {order} = node;
  return new BtreeNode(order, null);
}

function split(node: BtreeNode): BtreeNode {
  const {keys, order, children} = node;
  const parent = node.parent || createParent(node);

  const median = Math.floor(keys.length / 2);
  const index = parent.insertKey(keys[median]);
  const childrenMedian = Math.floor(children.length / 2);

  const leftChild = new BtreeNode(order, parent);
  const rightChild = new BtreeNode(order, parent);
  parent.children[index] = leftChild;
  parent.children.splice(index + 1, 0, rightChild);

  leftChild.keys = keys.slice(0, median);
  rightChild.keys = keys.slice(median + 1);
  leftChild.children = children.slice(0, childrenMedian);
  rightChild.children = children.slice(childrenMedian);

  leftChild.children.forEach(child => child.parent = leftChild);
  rightChild.children.forEach(child => child.parent = rightChild);

  if (parent.keys.length > parent.maxKeysLength) {
    return split(parent)
  }

  return parent;
}

const setParent = curry((parent, child) => {
  child.parent = parent;
  return child;
});