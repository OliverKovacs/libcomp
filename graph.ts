import { DisjointSet } from "./disjointset";
import { PriorityQueue } from "./priorityqueue";
import { cmpByKey } from "./lambda";

type Constructor<T = {}> = new (...args: any[]) => T;

interface GraphCore {
    vertices(): number[];
    edges(): number[];
    neighbors(x: number): number[];
    add_vertex(x: number): void;
    remove_vertex(x: number): void;
    add_edge(x: number, y: number, z: number): void;
    get_edge(x: number, y: number): number;
    remove_edge(x: number, y: number): void;
}

interface GraphValues<Vertex, Edge> {
    get_vertex_value(vertex: number): Vertex | undefined;
    set_vertex_value(vertex: number, value: Vertex): void;
    get_edge_value(edge: number): Edge | undefined;
    set_edge_value(edge: number, value: Edge): void;
}

export interface Graph<Vertex, Edge> extends GraphCore, GraphValues<Vertex, Edge> {
    adjacent(x: number, y: number): boolean;
};

type WeightedGraph = Graph<any, { length: number }>;

export function StdAdjacent<T extends Constructor<GraphCore>>(base: T) {
    return class extends base {
        adjacent (x: number, y: number): boolean {
            return this.neighbors(x).includes(y);
        }
    };
}

export function StdValues<Vertex, Edge, T extends Constructor<GraphCore>>(base: T) {
    return class extends base {
        private vertex_values = new Map<number, Vertex>();
        private edge_values = new Map<number, Edge>();

        get_vertex_value(vertex: number): Vertex | undefined {
            return this.vertex_values.get(vertex);
        }

        set_vertex_value(vertex: number, value: Vertex): void {
            this.vertex_values.set(vertex, value);
        }

        get_edge_value(edge: number): Edge | undefined {
            return this.edge_values.get(edge);
        }

        set_edge_value(edge: number, value: Edge): void {
            this.edge_values.set(edge, value);
        }
    };
}

export function StdUndirected<T extends Constructor<GraphCore>>(base: T) {
    return class extends base {
        add_edge(x: number, y: number, z: number): void {
            base.prototype.add_edge.bind(this)(x, y, z);
            if (x !== y) {
                base.prototype.add_edge.bind(this)(y, x, z);
            }
        }

        remove_edge(x: number, y: number): void {
            base.prototype.remove_edge.bind(this)(x, y);
            if (x !== y) {
                base.prototype.remove_edge.bind(this)(y, x);
            }
        }
    };
}

export function AdjacencyListCore() {
    return class {
        private vertex_list = new Map<number, [ number, number ][]>();

        vertices(): number[] {
            return Array.from(this.vertex_list.keys());
        }

        edges(): number[] {
            const set = new Set<number>();
            this.vertices()
                .forEach((v: number) => this.vertex_list.get(v)!.forEach(([ _, e ]) => set.add(e)));
            return Array.from(set);
        }

        neighbors(x: number): number[] {
            const list = this.vertex_list.get(x);
            if (!list)
                throw new Error("invalid vertices");
            return list.map(([ vertex ]) => vertex);
        }

        add_vertex(x: number): void {
            if (this.vertex_list.get(x)) return;
            this.vertex_list.set(x, []);
        }

        remove_vertex(x: number): void {
            if (!this.vertex_list.get(x)) return;
            this.neighbors(x).forEach((neighbor: number) => this.remove_edge(x, neighbor));
            this.vertex_list.delete(x);
        }

        add_edge(x: number, y: number, z: number): void {
            const list = this.vertex_list.get(x);
            if (!list || !this.vertex_list.get(y)) return;
            list.push([ y, z ]);
        }

        get_edge(x: number, y: number): number {
            if (!this.vertex_list.get(x) || !this.vertex_list.get(y)) return -1;
            return this.vertex_list.get(x)!.filter(([ vertex ]) => vertex === y)[0][1];
        }

        remove_edge(x: number, y: number): void {
            if (!this.vertex_list.get(x) || !this.vertex_list.get(y)) return;
            this.vertex_list.set(
                x,
                this.vertex_list.get(x)!.filter(([ vertex ]) => vertex !== y),
            );
        }
    }
}

// TODO AdjacencyMatrixCore
// TODO IncidenceMatrixCore

export const AdjacencyList = StdValues(StdAdjacent(AdjacencyListCore()));

export function dijkstra(
    graph: WeightedGraph,
    begin: number,
    end: number,
) {
    type BestMap = Map<number, { distance: number, next: number }>;

    const best: BestMap = new Map();
    const queue = new PriorityQueue<{ distance: number, current: number }>(cmpByKey("distance"));

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
        .sort(cmpByKey("length"));

    const djs = new DisjointSet();
    vertices.forEach(djs.set.bind(djs));

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
// TODO bellman_held_karp
