"use strict";

var _BST = _interopRequireDefault(require("./BST"));

var _BSTNode = _interopRequireDefault(require("./BSTNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('BST', function () {
  var rootValue = 10;
  var leftValue = 6;
  var rightValue = 14;
  var leftLeftValue = 4;
  var leftRightValue = 8;
  var rightLeftValue = 12;
  var rightRightValue = 16;
  var keys = [rootValue, leftValue, rightValue, leftLeftValue, leftRightValue, rightValue, rightLeftValue, rightRightValue];

  var createTree = function createTree(keys) {
    return keys.reduce(function (tree, key) {
      return tree.insert(key);
    }, new _BST.default());
  };

  it('create empty', function () {
    var tree = new _BST.default();
    expect(tree.root.value).toBe(undefined);
  });
  it('inspect root', function () {
    var tree = createTree(keys);
    expect(tree.root instanceof _BSTNode.default).toBeTruthy();
    expect(tree.root.value).toBe(rootValue);
  });
  it('has all keys', function () {
    var tree = createTree(keys);
    expect(tree.root.left.value).toBe(leftValue);
    expect(tree.root.right.value).toBe(rightValue);
    expect(tree.root.left.left.value).toBe(leftLeftValue);
    expect(tree.root.left.right.value).toBe(leftRightValue);
    expect(tree.root.right.left.value).toBe(rightLeftValue);
    expect(tree.root.right.right.value).toBe(rightRightValue);
  });
  it('insert root value again', function () {
    var tree = createTree(keys);
    tree.insert(rootValue);
    expect(tree.root.left.value).toBe(leftValue);
    expect(tree.root.right.value).toBe(rightValue);
  });
  it('remove root value', function () {
    var tree = new _BST.default(rootValue);
    tree.remove(rootValue);
    expect(tree.root.value).toBe(null);
    tree.insert(rootValue);
    expect(tree.root.value).toBe(rootValue);
  });
  it('remove left left', function () {
    var tree = createTree(keys);
    tree.remove(leftLeftValue);
    expect(tree.root.left.left).toBe(null);
  });
  it('remove left right', function () {
    var tree = createTree(keys);
    tree.remove(leftRightValue);
    expect(tree.root.left.right).toBe(null);
  });
  it('remove left', function () {
    var tree = createTree(keys);
    tree.remove(leftValue);
    expect(tree.root.left.value).toBe(leftLeftValue);
    expect(tree.root.left.left).toBe(null);
  });
  it('remove right left', function () {
    var tree = createTree(keys);
    tree.remove(rightLeftValue);
    expect(tree.root.right.left).toBe(null);
  });
  it('remove right right', function () {
    var tree = createTree(keys);
    tree.remove(rightRightValue);
    expect(tree.root.right.right).toBe(null);
  });
  it('remove right', function () {
    var tree = createTree(keys);
    tree.remove(rightValue);
    expect(tree.root.right.value).toBe(rightLeftValue);
    expect(tree.root.right.left).toBe(null);
  });
  it('remove single left left', function () {
    var tree = new _BST.default(rootValue);
    tree.insert(leftValue);
    tree.insert(leftLeftValue);
    tree.remove(leftValue);
    expect(tree.root.left.value).toBe(leftLeftValue);
  });
  it('remove left on 4th level', function () {
    var left3 = 2;
    var right3 = 5;
    var tree = new _BST.default(rootValue);
    tree.insert(leftValue);
    tree.insert(leftRightValue);
    tree.insert(leftLeftValue);
    tree.insert(left3);
    tree.insert(right3);
    tree.remove(leftValue);
    expect(tree.root.left.value).toBe(left3);
  });
  it('remove single right right', function () {
    var tree = new _BST.default(rootValue);
    tree.insert(rightValue);
    tree.insert(rightRightValue);
    tree.remove(rightValue);
    expect(tree.root.right.value).toBe(rightRightValue);
  });
  it('remove undefined', function () {
    var tree = createTree(keys);
    tree.remove(undefined);
  });
  it('has all values', function () {
    var tree = createTree(keys);
    [rootValue, leftValue, leftLeftValue, leftLeftValue, rightValue, rightLeftValue, rightRightValue].forEach(function (value) {
      expect(tree.has(value)).toBe(true);
    });
  });
});