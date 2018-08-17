import BSTNode from "./BSTNode"
import { BSTValue } from '../type';

export default class BST {
    root: BSTNode;

    constructor(value?: BSTValue) {
        this.root = new BSTNode(value);
    }

    insert(value: BSTValue): BST {
        this.root.insert(value);
        return this;
    }

    remove(value: BSTValue): BST {
        this.root.remove(value);
        return this;
    }

    has(value: BSTValue): boolean {
        return this.root.has(value);
    }
}