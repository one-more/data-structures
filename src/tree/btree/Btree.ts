import BtreeNode from "./BtreeNode"
import {BSTValue} from "../type"

export default class Btree {
  root: BtreeNode;

  constructor(order: number) {
    this.root = new BtreeNode(order, null);
  }

  insert(value: BSTValue): Btree {
    this.root = this.root.insert(value);
    return this
  }

  remove(value: BSTValue): Btree {
    this.root = this.root.remove(value);
    return this
  }

  has(value: BSTValue): boolean {
    return this.root.has(value)
  }
}