"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BSTNode =
/*#__PURE__*/
function () {
  function BSTNode(value) {
    _classCallCheck(this, BSTNode);

    _defineProperty(this, "left", void 0);

    _defineProperty(this, "right", void 0);

    _defineProperty(this, "parent", void 0);
  }

  _createClass(BSTNode, [{
    key: "insert",
    value: function insert(value) {
      if (this.value == null) {
        this.value = value;
        return this;
      }

      if (this.value > value) {
        if (this.left) {
          return this.left.insert(value);
        } else {
          this.left = new BSTNode(value);
          this.left.parent = this;
          return this.left;
        }
      } else if (this.value < value) {
        if (this.right) {
          return this.right.insert(value);
        } else {
          this.right = new BSTNode(value);
          this.right.parent = this;
          return this.right;
        }
      }

      return this;
    }
  }, {
    key: "remove",
    value: function remove(value) {
      if (!this.has(value)) {
        return;
      }

      if (value < this.value) {
        return this.left.remove(value);
      }

      if (value > this.value) {
        return this.right.remove(value);
      }

      if (this.left && this.right) {
        var successor = this.findMin();
        this.value = successor.value;
        return successor.remove(successor.value);
      }

      if (this.left) {
        return this.replaceNodeInParent(this.left);
      }

      if (this.right) {
        return this.replaceNodeInParent(this.right);
      }

      return this.replaceNodeInParent(null);
    }
  }, {
    key: "replaceNodeInParent",
    value: function replaceNodeInParent(node) {
      if (this.parent) {
        if (this === this.parent.left) {
          this.parent.left = node;
        } else {
          this.parent.right = node;
        }
      } else {
        this.value = null;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
  }, {
    key: "findMin",
    value: function findMin() {
      var current = this.left;

      while (current.left) {
        current = current.left;
      }

      return current;
    }
  }, {
    key: "has",
    value: function has(value) {
      if (value === this.value) {
        return true;
      }

      var left = this.left,
          right = this.right;

      if (left && right) {
        return this.left.has(value) || this.right.has(value);
      }

      if (left) {
        return this.left.has(value);
      }

      if (right) {
        return this.right.has(value);
      }

      return false;
    }
  }]);

  return BSTNode;
}();

exports.default = BSTNode;