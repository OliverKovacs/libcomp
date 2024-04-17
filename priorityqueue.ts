import { BinaryTree } from "./binarytree";

export class PriorityQueue<T> {
    #cmp: (a: T, b: T) => number;
    #tree: BinaryTree<T>;

    constructor(cmp: (a: T, b: T) => number) {
        this.#cmp = cmp;
        this.#tree = new BinaryTree();
    }

    size() {
        return this.#tree.size();
    }

    peek() {
        return this.#tree.get(this.#tree.root());
    }

    push(value: T) {
        this.#tree.push(value);
        this.#up();
        return this.#tree.size();
    }
    
    pop() {
        const value = this.peek();
        const last = this.#tree.last();
        this.#tree.swap(this.#tree.root(), last);
        this.#tree.pop();
        this.#down();
        return value;
    }

    #greater(index1: number, index2: number) {
        return this.#cmp(this.#tree.get(index1), this.#tree.get(index2));
    }

    #up() {
        let node = this.#tree.last();
        while (node > this.#tree.root() && this.#greater(node, this.#tree.parent(node))) {
            this.#tree.swap(node, this.#tree.parent(node));
            node = this.#tree.parent(node);
        }
    }

    #down() {
        let node = this.#tree.root();
        while (
            (this.#tree.left(node) < this.size() && this.#greater(this.#tree.left(node), node)) ||
            (this.#tree.right(node) < this.size() && this.#greater(this.#tree.right(node), node))
        ) {
            const max = (this.#tree.right(node) < this.size() && this.#greater(this.#tree.right(node), this.#tree.left(node)))
                ? this.#tree.right(node)
                : this.#tree.left(node);
            this.#tree.swap(node, max);
            node = max;
        }
    }
}
