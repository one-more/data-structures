export default class BSTNode {
    constructor(
        private value: any
    ) {}

    left!: BSTNode;
    right!: BSTNode;
    parent!: BSTNode;

    insert(value: number): BSTNode {
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
        } else if(this.value < value) {
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

    remove(value: number): void {
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
            const successor = this.findMin();
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

    replaceNodeInParent(node: BSTNode | null) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node as BSTNode;
            } else {
                this.parent.right = node as BSTNode;
            }
        }
        if (node) {
            node.parent = this.parent;
        }
    }

    findMin() {
        let current: BSTNode = this;
        while(current.left) {
            current = current.left;
        }
        return current;
    }

    has(value: number): boolean {
        if (value == this.value) {
            return true;
        }
        let {left, right} = this;
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
    }
}