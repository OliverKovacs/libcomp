import { adjacency_list, undirected, dijkstra, kruskal } from "./graph";

const G = undirected(adjacency_list<number, { length: number }>());

G.add_vertex(0)
G.add_vertex(1)
G.add_vertex(2)
G.add_vertex(3)

G.add_edge(0, 1, 0)
G.add_edge(0, 2, 1)
G.add_edge(1, 3, 2)
G.add_edge(2, 3, 3)

G.set_edge_value(0, { length: 1 });
G.set_edge_value(1, { length: 10 });
G.set_edge_value(2, { length: 100 });
G.set_edge_value(3, { length: 1 });

console.log(G);

console.log(dijkstra(G, 0, 3));
console.log(kruskal(G));
