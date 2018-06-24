export default class BSTNode {
    private value;
    left: BSTNode;
    right: BSTNode;
    parent: BSTNode;
    height: number;
    constructor(value: number);
    insert(value: any): BSTNode;
    remove(value: any): void;
    replaceNodeInParent(node: any): void;
    findMin(): BSTNode;
    has(value: any): boolean;
}
