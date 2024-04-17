import { Graph, AdjacencyList, undirected, dijkstra } from "./graph";

const G = undirected(new AdjacencyList<never, { length: number }>());
// const G = new AdjacencyList<never, { length: number }>();

G.add_vertex(0)
G.add_vertex(1)
G.add_vertex(2)
G.add_vertex(3)

G.add_edge(0, 1, 0)
G.add_edge(0, 2, 1)
G.add_edge(2, 3, 2)

dijkstra(G, 0, 3);

console.log(JSON.stringify(G, null, 4))

