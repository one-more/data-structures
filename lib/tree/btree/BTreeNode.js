"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _head = _interopRequireDefault(require("ramda/src/head"));

var _last = _interopRequireDefault(require("ramda/src/last"));

var _curry = _interopRequireDefault(require("ramda/src/curry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BtreeNode =
/*#__PURE__*/
function () {
  _createClass(BtreeNode, [{
    key: "isRoot",
    get: function get() {
      return !this.parent;
    }
  }, {
    key: "minKeysLength",
    get: function get() {
      if (this.isRoot) {
        return 1;
      }

      return Math.floor(this.order / 2);
    }
  }, {
    key: "maxKeysLength",
    get: function get() {
      return this.order - 1;
    }
  }]);

  function BtreeNode(order, parent) {
    _classCallCheck(this, BtreeNode);

    _defineProperty(this, "keys", []);

    _defineProperty(this, "children", []);
  }

  _createClass(BtreeNode, [{
    key: "insert",
    value: function insert(value) {
      if (this.hasKey(value)) {
        return this;
      }

      if (this.children.length) {
        var index = this.getNextKeyIndex(value);
        var child = this.children[index];
        var res = child.insert(value);
        return res.parent || res;
      }

      if (this.keys.length < this.maxKeysLength) {
        this.insertKey(value);
        return this;
      }

      this.insertKey(value);
      return split(this);
    }
  }, {
    key: "insertKey",
    value: function insertKey(key) {
      var nextIndex = this.getNextKeyIndex(key);

      if (~nextIndex) {
        this.keys.splice(nextIndex, 0, key);
        return nextIndex;
      }

      this.keys.push(key);
      return this.keys.length - 1;
    }
  }, {
    key: "removeKey",
    value: function removeKey(value) {
      var keys = this.keys;
      this.keys = keys.filter(function (key) {
        return key != value;
      });
    }
  }, {
    key: "hasKey",
    value: function hasKey(value) {
      return this.keys.includes(value);
    }
  }, {
    key: "getNextKeyIndex",
    value: function getNextKeyIndex(value) {
      return this.getKeyIndex(function (key) {
        return key > value;
      });
    }
  }, {
    key: "getKeyIndex",
    value: function getKeyIndex(fn) {
      var keys = this.keys;
      var i = 0;

      for (; i < keys.length; i++) {
        if (fn(keys[i])) {
          return i;
        }
      }

      return i;
    }
  }, {
    key: "remove",
    value: function remove(value) {
      var children = this.children;

      if (this.hasKey(value)) {
        if (children.length) {
          return this.removeFromNode(value);
        }

        return this.removeFromLeaf(value);
      }

      return this.removeFromChild(value);
    }
  }, {
    key: "removeFromNode",
    value: function removeFromNode(value) {
      var _this = this;

      var rightChildIndex = this.getNextKeyIndex(value);
      var leftChild = this.children[rightChildIndex - 1];
      var rightChild = this.children[rightChildIndex];
      var rightmostKey = (0, _last.default)(leftChild.keys);
      var leftmostKey = (0, _head.default)(rightChild.keys);

      var swapLeft = function swapLeft() {
        return _this.swapChildKey(leftChild, value, rightmostKey);
      };

      var swapRight = function swapRight() {
        return _this.swapChildKey(rightChild, value, leftmostKey);
      };

      if (leftChild.keys.length > leftChild.minKeysLength) {
        return swapLeft();
      }

      if (rightChild.keys.length > rightChild.minKeysLength) {
        return swapRight();
      }

      if (this.children[rightChildIndex + 1]) {
        return swapRight();
      }

      return swapLeft();
    }
  }, {
    key: "swapChildKey",
    value: function swapChildKey(child, value, replaceKey) {
      var keys = this.keys;
      this.keys = keys.map(function (key) {
        if (key == value) {
          return replaceKey;
        }

        return key;
      });
      child.removeKey(replaceKey);
      var res = child.rebalanceIfNeedTo();
      return res.parent.rebalanceIfNeedTo();
    }
  }, {
    key: "removeFromLeaf",
    value: function removeFromLeaf(value) {
      var keys = this.keys;

      if (keys.length > this.minKeysLength) {
        this.removeKey(value);
        return this;
      }

      this.removeKey(value);
      return this.rebalance(value);
    }
  }, {
    key: "removeFromChild",
    value: function removeFromChild(value) {
      var index = this.getNextKeyIndex(value);
      var child = this.children[index];

      if (child) {
        var res = child.remove(value);
        return res.parent.rebalanceIfNeedTo();
      }

      return this;
    }
  }, {
    key: "joinLeftSib",
    value: function joinLeftSib(lefttSib, thisIndex) {
      var parent = this.parent;
      var rightmostKey = lefttSib.keys.pop();
      var rightChild = lefttSib.children.pop();
      var parentKey = parent.keys[thisIndex - 1];
      parent.keys[thisIndex - 1] = rightmostKey;
      this.keys.unshift(parentKey);

      if (rightChild) {
        this.children.unshift(rightChild);
      }
    }
  }, {
    key: "joinRightSib",
    value: function joinRightSib(rightSib, thisIndex) {
      var parent = this.parent;
      var leftmostKey = rightSib.keys.shift();
      var leftChild = rightSib.children.shift();
      var parentKey = parent.keys[thisIndex];
      parent.keys[thisIndex] = leftmostKey;
      this.keys.push(parentKey);

      if (leftChild) {
        this.children.push(leftChild);
      }
    }
  }, {
    key: "mergeRight",
    value: function mergeRight(rightSib, thisIndex) {
      var parent = this.parent,
          keys = this.keys,
          children = this.children;
      var parentKey = parent.keys[thisIndex];
      this.keys.push(parentKey);
      this.keys = keys.concat(rightSib.keys);
      this.children = children.concat(rightSib.children.map(setParent(this)));
      parent.keys.splice(thisIndex, 1);
      parent.children.splice(thisIndex + 1, 1);
    }
  }, {
    key: "mergeLeft",
    value: function mergeLeft(lefttSib, thisIndex) {
      var parent = this.parent;
      var parentKey = parent.keys[thisIndex - 1];
      lefttSib.keys.push(parentKey);
      parent.keys.splice(thisIndex - 1, 1);
      lefttSib.keys = lefttSib.keys.concat(this.keys);
      lefttSib.children = lefttSib.children.concat(this.children.map(setParent(lefttSib)));
      parent.children.splice(thisIndex, 1);
    }
  }, {
    key: "needRebalance",
    value: function needRebalance() {
      return this.keys.length < this.minKeysLength;
    }
  }, {
    key: "rebalanceIfNeedTo",
    value: function rebalanceIfNeedTo(value) {
      if (this.keys.length == 0) {
        var children = this.children;
        return (0, _head.default)(children);
      }

      if (this.needRebalance()) {
        return this.rebalance(value);
      }

      return this;
    }
  }, {
    key: "rebalance",
    value: function rebalance(value) {
      if (!value) {
        var keys = this.keys;
        value = (0, _head.default)(keys);
      }

      var parent = this.parent;
      var thisIndex = parent.getNextKeyIndex(value);
      var leftSib = parent.children[thisIndex - 1];
      var rightSib = parent.children[thisIndex + 1];

      if (rightSib && rightSib.keys.length > rightSib.minKeysLength) {
        this.joinRightSib(rightSib, thisIndex);
        return this;
      }

      if (leftSib && leftSib.keys.length > leftSib.minKeysLength) {
        this.joinLeftSib(leftSib, thisIndex);
        return this;
      }

      if (rightSib) {
        this.mergeRight(rightSib, thisIndex);
        return this;
      }

      if (leftSib) {
        this.mergeLeft(leftSib, thisIndex);
        return this;
      }

      return this;
    }
  }, {
    key: "has",
    value: function has(value) {
      if (this.hasKey(value)) {
        return true;
      }

      return this.children.map(function (child) {
        return child.has(value);
      }).some(Boolean);
    }
  }]);

  return BtreeNode;
}();

exports.default = BtreeNode;

function createParent(node) {
  var order = node.order;
  return new BtreeNode(order, null);
}

function split(node) {
  var keys = node.keys,
      order = node.order,
      children = node.children;
  var parent = node.parent || createParent(node);
  var median = Math.floor(keys.length / 2);
  var index = parent.insertKey(keys[median]);
  var childrenMedian = Math.floor(children.length / 2);
  var leftChild = new BtreeNode(order, parent);
  var rightChild = new BtreeNode(order, parent);
  parent.children[index] = leftChild;
  parent.children.splice(index + 1, 0, rightChild);
  leftChild.keys = keys.slice(0, median);
  rightChild.keys = keys.slice(median + 1);
  leftChild.children = children.slice(0, childrenMedian);
  rightChild.children = children.slice(childrenMedian);
  leftChild.children.forEach(function (child) {
    return child.parent = leftChild;
  });
  rightChild.children.forEach(function (child) {
    return child.parent = rightChild;
  });

  if (parent.keys.length > parent.maxKeysLength) {
    return split(parent);
  }

  return parent;
}

var setParent = (0, _curry.default)(function (parent, child) {
  child.parent = parent;
  return child;
});