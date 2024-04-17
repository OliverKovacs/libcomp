type Value<T> = T | null | undefined;

export interface Graph<Vertex, Edge> {
    vertices(): number[];
    adjacent(x: number, y: number): boolean;
    neighbors(x: number): number[];
    add_vertex(x: number): void;
    remove_vertex(x: number): void;
    add_edge(x: number, y: number, z: number): void;
    remove_edge(x: number, y: number): void;

    get_vertex_value(vertex: number): Value<Vertex>;
    set_vertex_value(vertex: number, value: Vertex): void;
    get_edge_value(edge: number): Value<Edge>;
    set_edge_value(edge: number, value: Edge): void;
};

export class AdjacencyList<Vertex, Edge> implements Graph<Vertex, Edge> {
    vertex_list: Value<[ number, number ][]>[] = [];
    vertex_values: Value<Vertex>[] = [];
    edge_values: Value<Edge>[] = [];

    vertices(): number[] {
        return this.vertex_list
            .map((e, i) => [ e, i ])
            .filter(([ e ]) => e)
            .map(([ _, i ]) => i) as number[];
    }

    adjacent(x: number, y: number): boolean {
        return this.neighbors(x).includes(y);
    }

    neighbors(x: number): number[] {
        if (!this.vertex_list[x])
            throw new Error("invalid vertices");
        return this.vertex_list[x]!.map(([ vertex ]) => vertex);
    }

    add_vertex(x: number): void {
        this.vertex_list[x] ??= [];
    }

    remove_vertex(x: number): void {
        if (!this.vertex_list[x]) return;
        this
            .neighbors(x)
            .forEach(neighbor => this.remove_edge(x, neighbor));
        this.vertex_list[x] = undefined;
    }

    add_edge(x: number, y: number, z: number): void {
        this.vertex_list[x]!.push([ y, z ]);
    }

    remove_edge(x: number, y: number): void {
        this.vertex_list[x] = this.vertex_list[x]!
            .filter(([ vertex ]) => vertex !== y);
    }

    get_vertex_value(x: number): Value<Vertex> {
        return this.vertex_values[x];
    }

    set_vertex_value(x: number, v: Vertex): void {
        this.vertex_values[x] = v;
    }

    get_edge_value(x: number): Value<Edge> {
        return this.edge_values[x];
    }

    set_edge_value(x: number, v: Edge): void {
        this.edge_values[x] = v;
    }
};

export function undirected<Vertex, Edge>(graph: Graph<Vertex, Edge>): Graph<Vertex, Edge> {
    const clone = Object.assign({}, graph);
    Object.setPrototypeOf(clone, graph.constructor.prototype);
    clone.add_edge = (x: number, y: number, z: number): void => {
        graph.add_edge(x, y, z);
        graph.add_edge(y, x, z);
    };
    clone.remove_edge = (x: number, y: number): void => {
        graph.remove_edge(x, y);
        graph.remove_edge(y, x);
    };
    return clone;
}

export function dijkstra<T extends { length: number }>(
    graph: Graph<any, T>,
    begin: number,
    end: number
) {

}
