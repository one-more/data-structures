import BSTNode from "./BSTNode"

export default class BST {
    root: BSTNode;

    constructor(value: number) {
        this.root = new BSTNode(value);
    }

    add(value: number): BSTNode {
        return this.root.insert(value);
    }

    remove(value: number): void {
        return this.root.remove(value);
    }

    has(value: number): boolean {
        return this.root.has(value);
    }
}