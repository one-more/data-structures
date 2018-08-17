import Btree from './Btree'

describe('Btree', () => {
  const createTree = keys => keys.reduce((tree, key) => tree.insert(key), new Btree(5));
  const keys = [
    22,5,10,50,67,2,3,68,70,
    6,7,66,17,21,44,45,23,16,
    25
  ];

  it('insert all keys', () => {
    const tree = createTree(keys);

    //root
    expect(
      tree.root.keys
    ).toEqual([22]);

    //left part
    expect(
      tree.root.children[0].keys
    ).toEqual([5,10]);
    expect(
      tree.root.children[0].children[0].keys
    ).toEqual([2,3]);
    expect(
      tree.root.children[0].children[1].keys
    ).toEqual([6,7]);
    expect(
      tree.root.children[0].children[2].keys
    ).toEqual([16,17,21]);

    //right part
    expect(
      tree.root.children[1].keys
    ).toEqual([45,67]);
    expect(
      tree.root.children[1].children[0].keys
    ).toEqual([23,25,44]);
    expect(
      tree.root.children[1].children[1].keys
    ).toEqual([50,66]);
    expect(
      tree.root.children[1].children[2].keys
    ).toEqual([68,70]);
  });

  it('remove simple', () => {
    const tree = createTree(keys);

    tree.remove(44);
    expect(
      tree.root.children[1].children[0].keys
    ).toEqual([23,25]);
  });

  it('remove with join left', () => {
    const tree = createTree(keys);

    tree.remove(50);

    expect(
      tree.root.children[1].keys
    ).toEqual([44,67]);
    expect(
      tree.root.children[1].children[0].keys
    ).toEqual([23,25]);
    expect(
      tree.root.children[1].children[1].keys
    ).toEqual([45,66]);
    expect(
      tree.root.children[1].children[2].keys
    ).toEqual([68,70]);
  });

  it('remove with join right', () => {
    const tree = createTree(keys);

    tree.remove(7);

    expect(
      tree.root.children[0].keys
    ).toEqual([5,16]);
    expect(
      tree.root.children[0].children[0].keys
    ).toEqual([2,3]);
    expect(
      tree.root.children[0].children[1].keys
    ).toEqual([6,10]);
    expect(
      tree.root.children[0].children[2].keys
    ).toEqual([17,21]);
  });

  it('remove with merge left', () => {
    const tree = createTree(keys);

    tree.remove(70);

    expect(
      tree.root.keys
    ).toEqual([5,10,22,45]);
    expect(
      tree.root.children[0].keys
    ).toEqual([2,3]);
    expect(
      tree.root.children[1].keys
    ).toEqual([6,7]);
    expect(
      tree.root.children[2].keys
    ).toEqual([16,17,21]);
    expect(
      tree.root.children[3].keys
    ).toEqual([23,25,44]);
    expect(
      tree.root.children[4].keys
    ).toEqual([50,66,67,68]);
  });

  it('remove with merge right', () => {
    const tree = createTree(keys);

    tree.remove(7);
    tree.remove(6);

    expect(
      tree.root.keys
    ).toEqual([5,22,45,67]);
    expect(
      tree.root.children[0].keys
    ).toEqual([2,3]);
    expect(
      tree.root.children[1].keys
    ).toEqual([10,16,17,21]);
    expect(
      tree.root.children[2].keys
    ).toEqual([23,25, 44]);
    expect(
      tree.root.children[3].keys
    ).toEqual([50,66]);
    expect(
      tree.root.children[4].keys
    ).toEqual([68,70]);
  });

  it('remove from node simple', () => {
    const tree = createTree(keys);

    tree.remove(45);

    expect(
      tree.root.children[1].keys
    ).toEqual([44,67]);
    expect(
      tree.root.children[1].children[0].keys
    ).toEqual([23,25]);
    expect(
      tree.root.children[1].children[1].keys
    ).toEqual([50,66]);
    expect(
      tree.root.children[1].children[2].keys
    ).toEqual([68,70]);

    tree.insert(45);
    tree.remove(5);

    expect(
      tree.root.children[0].keys
    ).toEqual([6,16]);
    expect(
      tree.root.children[0].children[0].keys
    ).toEqual([2,3]);
    expect(
      tree.root.children[0].children[1].keys
    ).toEqual([7,10]);
    expect(
      tree.root.children[0].children[2].keys
    ).toEqual([17,21]);

    tree.insert(5);
    tree.remove(67);

    expect(
      tree.root.children[1].keys
    ).toEqual([44,66]);
    expect(
      tree.root.children[1].children[0].keys
    ).toEqual([23,25]);
    expect(
      tree.root.children[1].children[1].keys
    ).toEqual([45,50]);
    expect(
      tree.root.children[1].children[2].keys
    ).toEqual([68,70]);

    tree.insert(67)
  });

  it('remove from node with join right', () => {
    const tree = createTree(keys.concat([71,72,73,74,74]));

    tree.remove(5);
    tree.remove(6);

    //root
    expect(
      tree.root.keys
    ).toEqual([45]);

    //left part
    expect(
      tree.root.children[0].keys
    ).toEqual([7,22]);
    expect(
      tree.root.children[0].children[0].keys
    ).toEqual([2,3]);
    expect(
      tree.root.children[0].children[1].keys
    ).toEqual([10,16,17,21]);
    expect(
      tree.root.children[0].children[2].keys
    ).toEqual([23,25,44]);

    //right part
    expect(
      tree.root.children[1].keys
    ).toEqual([67,71]);
    expect(
      tree.root.children[1].children[0].keys
    ).toEqual([50,66]);
    expect(
      tree.root.children[1].children[1].keys
    ).toEqual([68,70]);
    expect(
      tree.root.children[1].children[2].keys
    ).toEqual([72,73,74]);
  });

  it('remove from node with join left', () => {
    const tree = createTree(keys.concat([1,4,8,9,11,12]));

    tree.remove(45);
    tree.remove(44);

    //root
    expect(
      tree.root.keys
    ).toEqual([16]);

    //left part
    expect(
      tree.root.children[0].keys
    ).toEqual([5,10]);
    expect(
      tree.root.children[0].children[0].keys
    ).toEqual([1,2,3,4]);
    expect(
      tree.root.children[0].children[1].keys
    ).toEqual([6,7,8,9]);
    expect(
      tree.root.children[0].children[2].keys
    ).toEqual([11,12]);

    //right part
    expect(
      tree.root.children[1].keys
    ).toEqual([22,50]);
    expect(
      tree.root.children[1].children[0].keys
    ).toEqual([17,21]);
    expect(
      tree.root.children[1].children[1].keys
    ).toEqual([23,25]);
    expect(
      tree.root.children[1].children[2].keys
    ).toEqual([66,67,68,70]);
  });

  it('remove from node with merge right', () => {
    const tree = createTree(keys);

    tree.remove(10);
    tree.remove(16);

    expect(
      tree.root.keys
    ).toEqual([5,22,45,67]);
    expect(
      tree.root.children[0].keys
    ).toEqual([2,3]);
    expect(
      tree.root.children[1].keys
    ).toEqual([6,7,17,21]);
    expect(
      tree.root.children[2].keys
    ).toEqual([23,25, 44]);
    expect(
      tree.root.children[3].keys
    ).toEqual([50,66]);
    expect(
      tree.root.children[4].keys
    ).toEqual([68,70]);
  });

  it('remove from node with merge left', () => {
    const tree = createTree(keys);

    tree.remove(45);
    tree.remove(44);

    expect(
      tree.root.keys
    ).toEqual([5,10,22,50]);
    expect(
      tree.root.children[0].keys
    ).toEqual([2,3]);
    expect(
      tree.root.children[1].keys
    ).toEqual([6,7]);
    expect(
      tree.root.children[2].keys
    ).toEqual([16,17, 21]);
    expect(
      tree.root.children[3].keys
    ).toEqual([23,25]);
    expect(
      tree.root.children[4].keys
    ).toEqual([66,67,68,70]);
  });

  it('has all keys', () => {
    const tree = createTree(keys);

    for (const key of keys) {
      expect(
        tree.has(key)
      ).toBe(true)
    }
  })
});