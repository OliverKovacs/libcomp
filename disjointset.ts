export class DisjointSet {
    #heap: { parent: number, rank: number }[] = [];
    #count = 0;

    count() {
        return this.#count;
    }

    set(index: number) {
        if (!this.#heap[index] || this.find(index) !== index) this.#count++;
        this.#heap[index] ??= {} as { parent: number, rank: number };
        this.#heap[index].parent = index;
        this.#heap[index].rank = 0;
    }

    find(index: number) {
        if (this.#heap[index].parent === index) return index;
        this.#heap[index].parent = this.find(this.#heap[index].parent);
        return this.#heap[index].parent;
    }

    union(index1: number, index2: number) {
        index1 = this.find(index1);
        index2 = this.find(index2);

        if (index1 === index2) return;
        if (this.#heap[index1].rank < this.#heap[index2].rank) {
            [ index1, index2 ] = [ index2, index1 ];
        }

        this.#heap[index2].parent = index1;
        this.#count--;

        if (this.#heap[index1].rank !== this.#heap[index2].rank) return;
        this.#heap[index1].rank++;
    }
}
