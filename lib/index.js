"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BST", {
  enumerable: true,
  get: function get() {
    return _bst.default;
  }
});
Object.defineProperty(exports, "BTree", {
  enumerable: true,
  get: function get() {
    return _btree.default;
  }
});

var _bst = _interopRequireDefault(require("./tree/bst"));

var _btree = _interopRequireDefault(require("./tree/btree"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }