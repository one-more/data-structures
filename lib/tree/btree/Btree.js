"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BtreeNode = _interopRequireDefault(require("./BtreeNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Btree =
/*#__PURE__*/
function () {
  function Btree(order) {
    _classCallCheck(this, Btree);

    _defineProperty(this, "root", void 0);

    this.root = new _BtreeNode.default(order, null);
  }

  _createClass(Btree, [{
    key: "insert",
    value: function insert(value) {
      this.root = this.root.insert(value);
      return this;
    }
  }, {
    key: "remove",
    value: function remove(value) {
      this.root = this.root.remove(value);
      return this;
    }
  }, {
    key: "has",
    value: function has(value) {
      return this.root.has(value);
    }
  }]);

  return Btree;
}();

exports.default = Btree;