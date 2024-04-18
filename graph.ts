import { DisjointSet } from "./disjointset";
import { PriorityQueue } from "./priorityqueue";

interface Core {
    vertices(): number[];
    edges(): number[];
    neighbors(x: number): number[];
    add_vertex(x: number): void;
    remove_vertex(x: number): void;
    add_edge(x: number, y: number, z: number): void;
    get_edge(x: number, y: number): number;
    remove_edge(x: number, y: number): void;
}

interface Values<Vertex, Edge> {
    get_vertex_value(vertex: number): Vertex | undefined;
    set_vertex_value(vertex: number, value: Vertex): void;
    get_edge_value(edge: number): Edge | undefined;
    set_edge_value(edge: number, value: Edge): void;
}

export interface Graph<Vertex, Edge> extends Core, Values<Vertex, Edge> {
    adjacent(x: number, y: number): boolean;
};

type WeightedGraph = Graph<any, { length: number }>;

export function adjacency_list_core(): Core {
    const impl: { __vertex_list: Map<number, [ number, number ][]> } & Core = {
        __vertex_list: new Map(),
        vertices: function(): number[] {
            return Array.from(this.__vertex_list.keys());
        },
        edges: function(): number[] {
            const set = new Set<number>();
            this.vertices()
                .forEach((v: number) => this.__vertex_list.get(v).forEach(([ _, e ]) => set.add(e)));
            return Array.from(set);
        },
        neighbors: function(x: number): number[] {
            const list = this.__vertex_list.get(x);
            if (!list)
                throw new Error("invalid vertices");
            return list.map(([ vertex ]) => vertex);
        },
        add_vertex: function(x: number): void {
            if (this.__vertex_list.get(x)) return;
            this.__vertex_list.set(x, []);
        },
        remove_vertex: function(x: number): void {
            if (!this.__vertex_list.get(x)) return;
            this.neighbors(x).forEach((neighbor: number) => this.remove_edge(x, neighbor));
            this.__vertex_list.delete(x);
        },
        add_edge: function(x: number, y: number, z: number): void {
            const list = this.__vertex_list.get(x);
            if (!list || !this.__vertex_list.get(y)) return;
            list.push([ y, z ]);
        },
        get_edge: function(x: number, y: number): number {
            if (!this.__vertex_list.get(x) || !this.__vertex_list.get(y)) return -1;
            return this.__vertex_list.get(x)!.filter(([ vertex ]) => vertex === y)[0][1];
        },
        remove_edge: function(x: number, y: number): void {
            if (!this.__vertex_list.get(x) || !this.__vertex_list.get(y)) return;
            this.__vertex_list.set(
                x,
                this.__vertex_list.get(x)!.filter(([ vertex ]) => vertex !== y),
            );
        },
    };
    return impl;
}

// TODO adjacency_matrix
// TODO incidence_matrix

export function adjacency_list<Vertex, Edge>(): Graph<Vertex, Edge> {
    return std_values(std_adjacent(adjacency_list_core()));
};

export function std_adjacent<T extends Core>(object: T): T & { adjacent: (x: number, y: number) => boolean } {
    const impl: { adjacent: (x: number, y: number) => boolean } = {
        adjacent: function(x: number, y: number): boolean {
            return this.neighbors(x).includes(y);
        },
    }
    return Object.assign(impl, object);
}

type ValueImpl<Vertex, Edge> = {
    __vertex_values: Map<number, Vertex>;
    __edge_values: Map<number, Edge>;
} & Values<Vertex, Edge>;

export function std_values<T extends Core, Vertex, Edge>(object: T): T & Values<Vertex, Edge> {
    const impl: ValueImpl<Vertex, Edge> = {
        __vertex_values: new Map<number, Vertex>(),
        __edge_values: new Map<number, Edge>(),
        get_vertex_value: function(vertex: number): Vertex | undefined {
            return this.__vertex_values.get(vertex);
        },
        set_vertex_value: function(vertex: number, value: Vertex): void {
            this.__vertex_values.set(vertex, value);
        },
        get_edge_value: function(edge: number): Edge | undefined {
            return this.__edge_values.get(edge);
        },
        set_edge_value: function(edge: number, value: Edge): void {
            this.__edge_values.set(edge, value);
        },
    };
    return Object.assign(impl, object);
}

// TODO correctly handle loops
export function undirected<T extends Core>(object: T): T {
    const clone = Object.assign({}, object);
    clone.add_edge = (x: number, y: number, z: number): void => {
        object.add_edge(x, y, z);
        object.add_edge(y, x, z);
    };
    clone.remove_edge = (x: number, y: number): void => {
        object.remove_edge(x, y);
        object.remove_edge(y, x);
    };
    return clone;
}

type BestMap = Map<number, { distance: number, next: number }>;
type DijkstraPriorityQueue = PriorityQueue<{ distance: number, current: number }>;

export function dijkstra(
    graph: WeightedGraph,
    begin: number,
    end: number,
) {
    const best: BestMap = new Map();
    const queue: DijkstraPriorityQueue = new PriorityQueue(
        (state1, state2) => state2.distance - state1.distance,
    );

    best.set(end, { distance: 0, next: -1 });
    queue.push({ current: end, distance: 0 });

    while (queue.size()) {
        const top = queue.pop();
        const neighbors = graph.neighbors(top.current);
        for (const next of neighbors) {
            const edge = graph.get_edge(top.current, next);
            const distance = top.distance + graph.get_edge_value(edge)!.length;
            const best_distance = best.get(next)?.distance ?? Infinity;
            if (best_distance <= distance) continue;
            best.set(next, { distance, next: top.current });
            queue.push({ distance, current: next });
        }
    }

    const path: number[] = [];
    let pointer = begin;
    do {
        path.push(pointer);
        pointer = best.get(pointer)?.next!;
    } while (pointer !== -1);
    return path;
}

export function kruskal(graph: WeightedGraph) {
    const vertices = graph.vertices();
    const size = vertices.length;
    const list = vertices
        .flatMap(vertex => graph.neighbors(vertex).map(e => [ vertex, e ]))
        .map(pair => {
            const edge = graph.get_edge(pair[0], pair[1]);
            const length = graph.get_edge_value(edge)?.length;
            return { pair, length };
        })
        .sort((a, b) => b.length! - a.length!);

    const djs = new DisjointSet();
    vertices.forEach(vertex => djs.set(vertex));

    const mst: [ number, number ][] = [];
    while (mst.length < size - 1) {
        const [ a, b ] = list.pop()!.pair;
        if (djs.find(a) === djs.find(b)) continue;
        djs.union(a, b);
        mst.push([ a, b ]);
    }
    return mst;
}

// TODO mincut
