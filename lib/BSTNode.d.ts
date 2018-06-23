export default class BSTNode {
    private value;
    constructor(value: any);
    left: BSTNode;
    right: BSTNode;
    parent: BSTNode;
    insert(value: number): BSTNode;
    remove(value: number): void;
    replaceNodeInParent(node: BSTNode | null): void;
    findMin(): BSTNode;
    has(value: number): boolean;
}
