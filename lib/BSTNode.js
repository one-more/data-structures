"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BSTNode = /** @class */ (function () {
    function BSTNode(value) {
        this.value = value;
        this.height = 0;
    }
    BSTNode.prototype.insert = function (value) {
        if (this.value == null) {
            this.value = value;
            return this;
        }
        if (this.value > value) {
            if (this.left) {
                return this.left.insert(value);
            }
            else {
                this.left = new BSTNode(value);
                this.left.parent = this;
                return this.left;
            }
        }
        else if (this.value < value) {
            if (this.right) {
                return this.right.insert(value);
            }
            else {
                this.right = new BSTNode(value);
                this.right.parent = this;
                return this.right;
            }
        }
        return this;
    };
    BSTNode.prototype.remove = function (value) {
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
    };
    BSTNode.prototype.replaceNodeInParent = function (node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else {
                this.parent.right = node;
            }
        }
        if (node) {
            node.parent = this.parent;
        }
    };
    BSTNode.prototype.findMin = function () {
        var current = this;
        while (current.left) {
            current = current.left;
        }
        return current;
    };
    BSTNode.prototype.has = function (value) {
        if (value == this.value) {
            return true;
        }
        var _a = this, left = _a.left, right = _a.right;
        if (left && right) {
            return this.left.has(value) || this.right.has(value);
        }
        if (left) {
            return this.left.has(value);
        }
        if (right) {
            this.right.has(value);
        }
        return false;
    };
    BSTNode.prototype.setLeft = function (node) {
        this.left = node;
    };
    BSTNode.prototype.setRight = function (node) {
        this.right = node;
    };
    return BSTNode;
}());
exports.default = BSTNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQlNUTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9CU1ROb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7SUFDRSxpQkFBb0IsS0FBSztRQUFMLFVBQUssR0FBTCxLQUFLLENBQUE7UUFLekIsV0FBTSxHQUFXLENBQUMsQ0FBQztJQUxTLENBQUM7SUFPN0Isd0JBQU0sR0FBTixVQUFPLEtBQUs7UUFDVixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFFO1lBQ3RCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2xCO1NBQ0Y7YUFBTSxJQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFFO1lBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2pDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDekIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ25CO1NBQ0Y7UUFDRCxPQUFPLElB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