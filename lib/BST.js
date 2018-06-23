"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BSTNode = _interopRequireDefault(require("./BSTNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BST =
/*#__PURE__*/
function () {
  function BST(value) {
    _classCallCheck(this, BST);

    _defineProperty(this, "root", void 0);

    this.root = new _BSTNode.default(value);
  }

  _createClass(BST, [{
    key: "add",
    value: function add(value) {
      this.root.insert(value);
    }
  }, {
    key: "remove",
    value: function remove(value) {
      this.root.remove(value);
    }
  }, {
    key: "has",
    value: function has(value) {
      this.root.has(value);
    }
  }]);

  return BST;
}();

exports.default = BST;