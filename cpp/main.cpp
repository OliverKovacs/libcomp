#include <cstdint>
#include <iostream>

#include "prime.cpp"
#include "graph.cpp"
#include "coloring.cpp"
#include "matching.cpp"

#include "geometry.cpp"

void test_graph()
{
    Graph *G = new GraphAdjacencyList();
    Graph::load_from_in(G);
    std::unordered_map<vertex_t, int32_t> *C = Coloring::greedy(G);
    std::cout
        << Coloring::chromatic_number(C) << " "
        << Coloring::check(G, C) << std::endl;
    Coloring::print(C);

    std::set<std::pair<vertex_t, vertex_t>> *M = Matching::greedy(G);
    std::cout << M->size() << std::endl;
    Matching::print(M);

    std::cout << G->is_bipartite() << std::endl;

    std::cout << std::endl;
}

void test_hull()
{
    int32_t n, x, y;
    std::cin >> n; 
    std::vector<Point> P = std::vector<Point>();
    for (int32_t _ = 0; _ < n; _++) {
        std::cin >> x >> y;
        P.push_back(Point(x, y));
    }

    {
        std::vector<Point> *hull = ConvexHull::jarvis_wrap(&P);
        print_points(hull);
        delete hull;
    }

    {
        sort_x(&P);
        std::vector<Point> *hull = ConvexHull::local_repair(&P);
        print_points(hull);
        delete hull;
    }
}

void test_prime(int64_t x)
{
    size_t count = 0;
    for (size_t i = 0; i < 1000; i++)
        count += miller_rabin(x);
    std::cout << count << std::endl;
}

int main()
{
    int32_t t;
    std::cin >> t;
    for (int32_t _ = 0; _ < t; _++)
        test_graph();

    std::cin >> t;
    for (int32_t _ = 0; _ < t; _++)
        test_hull();

    std::cout << std::endl;
    test_prime(15);
    test_prime(23);
}
