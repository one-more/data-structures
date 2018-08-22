"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BtreeNode = function BtreeNode() {
  _classCallCheck(this, BtreeNode);

  _defineProperty(this, "order", void 0);

  _defineProperty(this, "parent", void 0);

  _defineProperty(this, "keys", void 0);

  _defineProperty(this, "children", void 0);

  _defineProperty(this, "isRoot", void 0);

  _defineProperty(this, "minKeysLength", void 0);

  _defineProperty(this, "maxKeysLength", void 0);
};

exports.default = BtreeNode;