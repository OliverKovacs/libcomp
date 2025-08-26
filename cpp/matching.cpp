#ifndef MATCHING_H
#define MATCHING_H

#include <cassert>
#include <set>
#include <utility>

#include "assertm.cpp"
#include "graph.cpp"

class Matching {
public:
    static std::set<edge_t> *greedy(Graph *G)
    {
        Graph *_G = G->clone();

        std::set<std::pair<vertex_t, vertex_t>> *M
            = new std::set<std::pair<vertex_t, vertex_t>>();

        const std::set<std::pair<vertex_t, vertex_t>> *E = _G->edges();

        while (!E->empty()) {
            const auto [v, w] = *E->begin();
            _G->remove_vertex(v);
            _G->remove_vertex(w);
            M->insert(std::make_pair(v, w));
            E = _G->edges();
        }

        return M;
    }

    static std::set<edge_t> *augmenting_paths(Graph *G, std::set<edge_t> *M)
    {
        std::deque<std::set<vertex_t> *> L = std::deque<std::set<vertex_t> *>();

        const std::set<vertex_t> *V = G->vertices();
        L.push_back(new std::set<vertex_t>());
        for (vertex_t v : *V)
            L[0]->insert(v);

        size_t n = L[0]->size();
        for (const auto &[v, w] : *M) {
            L[0]->erase(v);
            L[0]->erase(w);
        }

        std::set<edge_t> *set = new std::set<edge_t>();
        if (L[0]->empty()) {
            delete L[0];
            return set;
        }

        std::unordered_map<vertex_t, bool> visited;

        for (size_t i = 1; i < n; i++) {
            L.push_back(new std::set<vertex_t>());
            for (vertex_t v : *L[i - 1]) {
                // TODO
                (void)v;
            }
        }

        return set;
    }

    static std::set<edge_t> *hopcroft_karp(Graph *G)
    {
        assertm(G->is_bipartite(), "G must be bipartite!");

        // TODO

        return NULL;
    }

    static void print(std::set<std::pair<vertex_t, vertex_t>> *M) {
        if (M->size() == 0) {
            std::cout << "{}" << std::endl;
            return;
        }

        std::cout << "{";
        for (const auto &[v, w] : *M)
            std::cout << "{" << v << ", " << w << "}, ";
        std::cout << "\b\b}" << std::endl;
    }
};

#endif /* MATCHING_H */
