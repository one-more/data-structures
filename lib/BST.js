"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BSTNode_1 = __importDefault(require("./BSTNode"));
var BST = /** @class */ (function () {
    function BST(value) {
        this.root = new BSTNode_1.default(value);
    }
    BST.prototype.add = function (value) {
        return this.root.insert(value);
    };
    BST.prototype.remove = function (value) {
        return this.root.remove(value);
    };
    BST.prototype.has = function (value) {
        return this.root.has(value);
    };
    return BST;
}());
exports.default = BST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQlNULmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0JTVC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUErQjtBQUUvQjtJQUdJLGFBQVksS0FBYTtRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsaUJBQUcsR0FBSCxVQUFJLEtBQWE7UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxvQkFBTSxHQUFOLFVBQU8sS0FBYTtRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxpQkFBRyxHQUFILFVBQUksS0FBYTtRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNMLFVBQUM7QUFBRCxDQUFDLEFBbEJELElBa0JDIn0=