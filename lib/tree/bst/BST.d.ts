import BSTNode from "./BSTNode";
import { BSTValue } from '../type';
export default class BST {
    root: BSTNode;
    constructor(value?: BSTValue);
    insert(value: BSTValue): BST;
    remove(value: BSTValue): BST;
    has(value: BSTValue): boolean;
}
