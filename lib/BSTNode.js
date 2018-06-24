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
            if (this === this.parent.left) {
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
        var current = this.left;
        while (current.left) {
            current = current.left;
        }
        return current;
    };
    BSTNode.prototype.has = function (value) {
        if (value === this.value) {
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
            return this.right.has(value);
        }
        return false;
    };
    return BSTNode;
}());
exports.default = BSTNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQlNUTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9CU1ROb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7SUFNRSxpQkFBb0IsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFGakMsV0FBTSxHQUFXLENBQUMsQ0FBQztJQUVpQixDQUFDO0lBRXJDLHdCQUFNLEdBQU4sVUFBTyxLQUFLO1FBQ1YsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBRTtZQUN0QixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoQztpQkFBTTtnQkFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQzthQUNsQjtTQUNGO2FBQU0sSUFBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBRTtZQUM1QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNqQztpQkFBTTtnQkFDTCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQzthQUNuQjtTQUNGO1FBQ0QsT0FBTyxJ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