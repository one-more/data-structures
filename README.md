# classic data structures

## Binary Tree
````es6
type BSTValue = string | number;

interface BinaryTreeNode {
  value: BSTValue,
  left: BinaryTreeNode,
  right: BinaryTreeNode,
}

interface BinaryTree {
  root: BinaryTreeNode,

  insert(value: BSTValue): BinaryTree
  remove(value: BSTValue): BinaryTree
  has(value: BSTValue): boolean
}
````

### usage
````es5
import {BST} from 'data-structires'

const tree = new BST();
tree.insert(5);
tree.remove(5)
````

## BTree
````es6
type BSTValue = string | number;

interface BtreeNode {
  keys: BSTValue[];
  children: BtreeNode[];
}

interface Btree {
  root: BtreeNode;

  constructor(order: number): void

  insert(value: BSTValue): BTree
  remove(value: BSTValue): BTree
  has(value: BSTValue): boolean
}
````

### usage
````es5
import {BTree} from 'data-structires'

const tree = new BTree(5);
tree.insert(5);
tree.remove(5)
````