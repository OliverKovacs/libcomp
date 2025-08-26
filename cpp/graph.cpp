#ifndef GRAPH_H
#define GRAPH_H

#include <cassert>
#include <cstdint>
#include <deque>
#include <iostream>
#include <set>
#include <unordered_map>
#include <utility>

typedef uint32_t vertex_t;
typedef std::pair<vertex_t, vertex_t> edge_t;

class Graph {
public:
    virtual Graph *clone() = 0;
    virtual const std::set<vertex_t> *vertices() = 0;
    virtual const std::set<std::pair<vertex_t, vertex_t>> *edges() = 0;
    virtual bool adjacent(vertex_t x, vertex_t y) = 0;
    virtual const std::set<vertex_t> *neighbors(vertex_t x) = 0;
    virtual bool contains(vertex_t x) = 0;
    virtual bool add_vertex(vertex_t x) = 0;
    virtual bool remove_vertex(vertex_t x) = 0;
    virtual bool add_edge(vertex_t x, vertex_t y) = 0;
    virtual bool remove_edge(vertex_t x, vertex_t y) = 0;


    bool is_bipartite() {
        const std::set<vertex_t> *V = this->vertices();
        if (V->empty())
            return true;

        std::unordered_map<vertex_t, bool> C;
        std::deque<vertex_t> Q = {};

        vertex_t _v = *V->begin();
        C[_v] = true;
        Q.push_back(_v);

        while (!Q.empty()) {
            vertex_t v = Q.front();
            Q.pop_front();
            const std::set<vertex_t> *Nv = this->neighbors(v);
            for (vertex_t u : *Nv) {
                if (C.contains(u) && C[v] == C[u])
                    return false;

                if (C.contains(u))
                    continue;

                C[u] = !C[v];
                Q.push_back(u);
            }
        }

        return true;
    }

    static void load_from_in(Graph *G)
    {
        int32_t n, m, v1, v2;
        std::cin >> n >> m;
        for (int _ = 0; _ < n; _++) {
            std::cin >> v1;
            G->add_vertex(v1);
        }
        for (int _ = 0; _ < m; _++) {
            std::cin >> v1 >> v2;
            G->add_edge(v1, v2);
        }
    }
};

class GraphAdjacencyList : public Graph {
private:
    std::unordered_map<vertex_t, std::set<vertex_t>> data;

public:
    GraphAdjacencyList()
    {
        data = std::unordered_map<vertex_t, std::set<vertex_t>>();
    }

    Graph *clone() override
    {
        Graph *G = new GraphAdjacencyList();
        for (const auto v : *this->vertices())
            G->add_vertex(v);
        for (const auto &[v, w] : *this->edges())
            G->add_edge(v, w);
        return G;
    }

    const std::set<vertex_t> *vertices() override
    {
        std::set<vertex_t> *set
            = new std::set<vertex_t>();

        for (const auto& [v, _] : data)
            set->insert(v);
        return set;
    }

    const std::set<std::pair<vertex_t, vertex_t>> *edges() override
    {
        std::set<std::pair<vertex_t, vertex_t>> *set
            = new std::set<std::pair<vertex_t, vertex_t>>();

        for (const auto& [v, list] : data)
            for (const auto w : list)
                if (v < w)
                    set->insert(std::make_pair(v, w));
        return set;
    }

    bool contains(vertex_t x) override
    {
        return data.contains(x);
    }

    bool adjacent(vertex_t x, vertex_t y) override
    {
        if (!this->contains(x))
            return false;

        return data[x].contains(y);
    }

    const std::set<vertex_t> *neighbors(vertex_t x) override
    {
        return &data[x];
    }

    bool add_vertex(vertex_t x) override
    {
        if (this->contains(x))
            return false;

        data[x] = std::set<vertex_t>();
        return true;
    }

    bool remove_vertex(vertex_t x) override
    {
        if (!this->contains(x))
            return false;

        for (const auto v : data[x])
            data[v].erase(x);

        data.erase(x);
        return true;
    }

    bool add_edge(vertex_t x, vertex_t y) override
    {
        if (!this->contains(x) || !this->contains(y) || x == y)
            return false;

        data[x].insert(y);
        data[y].insert(x);
        return true;
    }

    bool remove_edge(vertex_t x, vertex_t y) override
    {
        if (!this->contains(x) || !this->contains(y) || !this->adjacent(x, y))
            return false;

        this->data[x].erase(y);
        this->data[y].erase(x);
        return true;
    }
};

#endif /* GRAPH_H */
