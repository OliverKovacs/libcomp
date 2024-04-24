import { AdjacencyList, Graph, StdUndirected, dijkstra, kruskal } from "./graph";

const UndirectedAdjacencyList = StdUndirected(AdjacencyList);

const g = new UndirectedAdjacencyList() as Graph<number, { length: number }>;

g.add_vertex(0);
g.add_vertex(1);
g.add_vertex(2);
g.add_vertex(3);

g.add_edge(0, 1, 0);
g.add_edge(0, 2, 1);
g.add_edge(1, 3, 2);
g.add_edge(2, 3, 3);

g.set_edge_value(0, { length: 1 });
g.set_edge_value(1, { length: 10 });
g.set_edge_value(2, { length: 100 });
g.set_edge_value(3, { length: 1 });

console.log(g);

console.log(dijkstra(g, 0, 3));
console.log(kruskal(g));
