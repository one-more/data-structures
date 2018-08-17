import BST from './BST'
import BSTNode from './BSTNode'

describe('BST', () => {
  const rootValue = 10;
  const leftValue = 6;
  const rightValue = 14;
  const leftLeftValue = 4;
  const leftRightValue = 8;
  const rightLeftValue = 12;
  const rightRightValue = 16;

  const keys = [
    rootValue,
    leftValue,
    rightValue,
    leftLeftValue,
    leftRightValue,
    rightValue,
    rightLeftValue,
    rightRightValue
  ];

  const createTree = keys => keys.reduce((tree, key) => tree.insert(key), new BST);

  it('create empty', () => {
    const tree = new BST();
    expect(
      tree.root.value
    ).toBe(undefined)
  });

  it('inspect root', () => {
    const tree = createTree(keys);

    expect(
      tree.root instanceof BSTNode
    ).toBeTruthy();
    expect(
      tree.root.value
    ).toBe(rootValue)
  });

  it('has all keys', () => {
    const tree = createTree(keys);

    expect(
      tree.root.left.value
    ).toBe(leftValue);
    expect(
      tree.root.right.value
    ).toBe(rightValue);
    expect(
      tree.root.left.left.value
    ).toBe(leftLeftValue);
    expect(
      tree.root.left.right.value
    ).toBe(leftRightValue);
    expect(
      tree.root.right.left.value
    ).toBe(rightLeftValue);
    expect(
      tree.root.right.right.value
    ).toBe(rightRightValue)
  });

  it('insert root value again', () => {
    const tree = createTree(keys);

    tree.insert(rootValue);
    expect(
      tree.root.left.value
    ).toBe(leftValue);
    expect(
      tree.root.right.value
    ).toBe(rightValue);
  });

  it('remove root value', () => {
    const tree = new BST(rootValue);

    tree.remove(rootValue);
    expect(
      tree.root.value
    ).toBe(null);
    tree.insert(rootValue);
    expect(
      tree.root.value
    ).toBe(rootValue)
  });

  it('remove left left', () => {
    const tree = createTree(keys);

    tree.remove(leftLeftValue);
    expect(
      tree.root.left.left
    ).toBe(null)
  });

  it('remove left right', () => {
    const tree = createTree(keys);

    tree.remove(leftRightValue);
    expect(
      tree.root.left.right
    ).toBe(null)
  });

  it('remove left', () => {
    const tree = createTree(keys);

    tree.remove(leftValue);
    expect(
      tree.root.left.value
    ).toBe(leftLeftValue);
    expect(
      tree.root.left.left
    ).toBe(null)
  });

  it('remove right left', () => {
    const tree = createTree(keys);

    tree.remove(rightLeftValue);
    expect(
      tree.root.right.left
    ).toBe(null)
  });

  it('remove right right', () => {
    const tree = createTree(keys);

    tree.remove(rightRightValue);
    expect(
      tree.root.right.right
    ).toBe(null)
  });

  it('remove right', () => {
    const tree = createTree(keys);

    tree.remove(rightValue);
    expect(
      tree.root.right.value
    ).toBe(rightLeftValue);
    expect(
      tree.root.right.left
    ).toBe(null)
  });

  it('remove single left left', () => {
    const tree = new BST(rootValue);

    tree.insert(leftValue);
    tree.insert(leftLeftValue);
    tree.remove(leftValue);
    expect(
      tree.root.left.value
    ).toBe(leftLeftValue)
  });

  it('remove left on 4th level', () => {
    const left3 = 2;
    const right3 = 5;
    const tree = new BST(rootValue);
    tree.insert(leftValue);
    tree.insert(leftRightValue);
    tree.insert(leftLeftValue);
    tree.insert(left3);
    tree.insert(right3);
    tree.remove(leftValue);
    expect(
      tree.root.left.value
    ).toBe(left3)
  });

  it('remove single right right', () => {
    const tree = new BST(rootValue);
    tree.insert(rightValue);
    tree.insert(rightRightValue);
    tree.remove(rightValue);
    expect(
      tree.root.right.value
    ).toBe(rightRightValue);
  });

  it('remove undefined', () => {
    const tree = createTree(keys);

    tree.remove(undefined);
  });

  it('has all values', () => {
    const tree = createTree(keys);

    [
      rootValue,
      leftValue,
      leftLeftValue,
      leftLeftValue,
      rightValue,
      rightLeftValue,
      rightRightValue,
    ].forEach(value => {
      expect(
        tree.has(value)
      ).toBe(true)
    })
  })
});