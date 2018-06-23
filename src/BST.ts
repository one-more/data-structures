import BSTNode from "./BSTNode"

export default class BST {
    root: BSTNode;

    constructor(value: number) {
        this.root = new BSTNode(value);
    }

    add(value: number) {
        this.root.insert(value);
    }

    remove(value: number) {
        this.root.remove(value);
    }

    has(value: number) {
        this.root.has(value);
    }
}