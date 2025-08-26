#ifndef COLORING_H
#define COLORING_H

#include <cstdint>
#include <iostream>
#include <random>
#include <set>
#include <unordered_map>

#include "graph.cpp"

class Coloring {
public:

    // find a coloring of G with C(G) colors in O(|E|)
    // where chi(G) <= C(G) <= Delta(G) + 1
    static std::unordered_map<vertex_t, int32_t> *greedy(Graph *G)
    {
        std::unordered_map<vertex_t, int32_t> *C
            = new std::unordered_map<vertex_t, int32_t>();

        for (vertex_t v : *G->vertices()) {

            std::set<int32_t> used{};
            for (const auto w : *G->neighbors(v))
                if (C->contains(w))
                    used.insert((*C)[w]);

            int32_t color = 0;
            while (used.contains(color))
                color++;

            (*C)[v] = color;
        }

        return C;
    }

    // find random coloring of G in k colors
    static std::unordered_map<vertex_t, int32_t> *random(Graph *G, int32_t k)
    {
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<> distrib(0, k - 1);

        std::unordered_map<vertex_t, int32_t> *C
            = new std::unordered_map<vertex_t, int32_t>();

        for (vertex_t v : *G->vertices())
            (*C)[v] = distrib(gen);

        return C;
    }

    // check if a coloring if no two neighboring vertices
    // have the same color
    static bool check(Graph *G, std::unordered_map<vertex_t, int32_t> *C)
    {
        for (const auto v : *G->vertices())
            if (!C->contains(v))
                return false;

        for (const auto v : *G->vertices())
            for (const auto w : *G->neighbors(v))
                if ((*C)[v] == (*C)[w])
                    return false;

        return true;
    }

    static size_t chromatic_number(const std::unordered_map<vertex_t, int32_t> *C)
    {
        std::set<int32_t> colors{};
        for (const auto& [_, c] : *C)
            colors.insert(c);
        return colors.size();
    }

    static void print(const std::unordered_map<vertex_t, int32_t> *C)
    {
        if (C->size() == 0) {
            std::cout << "{}" << std::endl;
            return;
        }

        std::cout << "{";
        for (const auto& [v, c] : *C)
            std::cout << v << " -> " << c << ", ";
        std::cout << "\b\b}" << std::endl;
    }
};

#endif /* COLORING_H */
