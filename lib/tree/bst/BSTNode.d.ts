import { BSTValue } from '../type';
export default class BSTNode {
    value?: BSTValue;
    left: BSTNode;
    right: BSTNode;
    parent: BSTNode;
    constructor(value?: BSTValue);
    insert(value: BSTValue): BSTNode;
    remove(value: BSTValue): void;
    replaceNodeInParent(node: BSTNode | null): void;
    findMin(): BSTNode;
    has(value: BSTValue): boolean;
}
