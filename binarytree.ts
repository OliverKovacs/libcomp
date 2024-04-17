export class BinaryTree<T> {
    #heap: T[] = [];

    root() {
        return 0;
    }

    last() {
        return this.size() - 1;
    }

    size() {
        return this.#heap.length;
    }

    get(index: number): T {
        return this.#heap[index];
    }

    swap(index1: number, index2: number) {
        [ this.#heap[index1], this.#heap[index2] ] =
            [ this.#heap[index2], this.#heap[index1] ];
    }

    parent(index: number): number {
        return ((index + 1) >>> 1) - 1;
    }

    left(index: number): number {
        return (index << 1) + 1;
    }

    right(index: number): number {
        return (index + 1) << 1;
    }
    
    push(value: T): number {
        return this.#heap.push(value);
    }

    pop(): T {
        return this.#heap.pop()!;
    }
}
