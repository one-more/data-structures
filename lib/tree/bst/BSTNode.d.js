"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BSTNode = function BSTNode() {
  _classCallCheck(this, BSTNode);

  _defineProperty(this, "value", void 0);

  _defineProperty(this, "left", void 0);

  _defineProperty(this, "right", void 0);

  _defineProperty(this, "parent", void 0);
};

exports.default = BSTNode;