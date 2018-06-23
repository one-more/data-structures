import BSTNode from "./BSTNode";
export default class BST {
    root: BSTNode;
    constructor(value: number);
    add(value: number): void;
    remove(value: number): void;
    has(value: number): void;
}
