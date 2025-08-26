#include <algorithm>
#include <cstdint>
#include <iostream>
#include <limits>
#include <set>
#include <vector>

#include "assertm.cpp"

class Point {
public:

    int32_t x;
    int32_t y;

    Point() {
        this->x = 0;
        this->y = 0;
    }

    Point(int32_t x, int32_t y) {
        this->x = x;
        this->y = y;
    }

    // whether the point p is left of qr
    static bool left_of(const Point &p, const Point &q, const Point &r)
    {
        return (r.x - q.x) * (p.y - q.y) > (r.y - q.y) * (p.x - q.x);
    }
};

inline bool operator==(const Point &lhs, const Point &rhs)
{
    return lhs.x == rhs.x && lhs.y == rhs.y;
}

class ConvexHull {
private:

    static void assert_sorted_x(const std::vector<Point> *P)
    {
        int32_t last = std::numeric_limits<int32_t>::lowest();
        for (const auto &p : *P) {
            if (last > p.x)
                assertm(false, "Points must be sorted by x coordinate!");
            last = p.x;
        }
    }

    static Point next_point(const Point q, const std::vector<Point> *P)
    {
        Point q_next = *P->begin();

        if (q_next == q)
            q_next = *std::next(P->begin());

        for (const Point & p : *P) {
            if (p == q)
                continue;

            if (!Point::left_of(p, q, q_next))
                q_next = p;
        }

        return q_next;
    }

public:

    // find convex hull in O(n * h)
    // P must be in general position
    static std::vector<Point> *jarvis_wrap(const std::vector<Point> *P)
    {
        std::vector<Point> *q = new std::vector<Point>();
        if (P->size() <= 2) {
            for (const auto p : *P)
                q->push_back(p);
            return q;
        }

        Point p_now = (*P)[0];
        for (Point p : *P)
            if (p.y < p_now.y)
                p_now = p;

        do {
            q->push_back(p_now);
            p_now = next_point(p_now, P);
        }
        while(p_now != (*q)[0]);

        return q;
    }

    // find convex hull in O(n)
    // P must be in general position and sorted
    static std::vector<Point> *local_repair(const std::vector<Point> *P)
    {
        assert_sorted_x(P);

        std::vector<Point> *q = new std::vector<Point>();
        if (P->size() <= 2) {
            for (const auto p : *P)
                q->push_back(p);
            return q;
        }

        int32_t n = P->size();
        q->resize(n);
        (*q)[0] = (*P)[0];

        int32_t h = 0;
        for (int32_t i = 1; i < n; i++) {
            while (h > 0 && Point::left_of((*q)[h], (*q)[h - 1], (*P)[i]))
                h--;
            h++;
            (*q)[h] = (*P)[i];
        }
        int32_t h_prime = h;
        for (int32_t i = n - 2; i > 0; i--) {
            while (h > h_prime && Point::left_of((*q)[h], (*q)[h-1], (*P)[i]))
                h--;
            h++;
            (*q)[h] = (*P)[i];
        }

        q->resize(h);
        return q;
    }
};

class SmallestEnclosingCircle {

    // O(n^4)
    static std::pair<Point, Point> *bruteforce(const std::vector<Point> *P)
    {
        std::pair<Point, Point> *res = new std::pair<Point, Point>();

        // TODO
        (void)P;

        return res;
    }

    // expected O(n log n)
    static std::pair<Point, Point> *randomized(const std::vector<Point> *P)
    {
        std::pair<Point, Point> *res = new std::pair<Point, Point>();

        // TODO
        (void)P;

        return res;
    }
};

bool cmp_x(const Point &lhs, const Point &rhs)
{
    return lhs.x < rhs.x;
}

void sort_x(std::vector<Point> *P)
{
    std::sort(P->begin(), P->end(), cmp_x);
}

void print_points(std::vector<Point> *P)
{
    std::cout << "(";
    for (const auto &p : *P)
        std::cout << "(" << p.x << ", " << p.y << "), ";
    std::cout << "\b\b)" << std::endl;
}
