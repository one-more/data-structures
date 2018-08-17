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

## BTree
````es6
type BSTValue = string | number;

interface BtreeNode {
  keys: BSTValue[];
  children: BtreeNode[];
}

interface Btree {
  root: BtreeNode;

  insert(value: BSTValue): BTree
  remove(value: BSTValue): BTree
  has(value: BSTValue): boolean
}
````