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
        this.root.insert(value);
    };
    BST.prototype.remove = function (value) {
        this.root.remove(value);
    };
    BST.prototype.has = function (value) {
        this.root.has(value);
    };
    return BST;
}());
exports.default = BST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQlNULmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0JTVC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUErQjtBQUUvQjtJQUdFLGFBQVksS0FBSztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxpQkFBRyxHQUFILFVBQUksS0FBSztRQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxvQkFBTSxHQUFOLFVBQU8sS0FBSztRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxpQkFBRyxHQUFILFVBQUksS0FBSztRQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFDSCxVQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQyJ9