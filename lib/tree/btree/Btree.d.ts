import BtreeNode from "./BtreeNode";
import { BSTValue } from "../type";
export default class Btree {
    root: BtreeNode;
    constructor(order: number);
    insert(value: BSTValue): Btree;
    remove(value: BSTValue): Btree;
    has(value: BSTValue): boolean;
}
