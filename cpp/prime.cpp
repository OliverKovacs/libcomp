#ifndef PRIME_H
#define PRIME_H

#include <cstdint>
#include <random>

inline bool odd(uint64_t n)
{
    return n & 1;
}

inline bool even(uint64_t n)
{
    return !odd(n);
}

template<typename T>
T modpow(T base, T exp, T mod)
{
    base %= mod;
    T res = 1;
    while (exp > 0) {
        if (odd(exp))
            res = (res * base) % mod;
        base = (base * base) % mod;
        exp >>= 1;
    }
    return res;
}

bool miller_rabin(int64_t n)
{
    if (n == 2)
        return true;

    if (n == 1 || even(n))
        return false;


    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(2, n - 1);
    int64_t a = distrib(gen);

    int64_t k = 0;
    int64_t d = n - 1;
    while (even(d)) {
        d >>= 1;
        k++;
    }

    int64_t x = modpow(a, d, n);

    if (x == 1 || x == n - 1)
        return true;

    for (int64_t _ = 0; _ < k - 1; _++) {
        x = modpow(x, 2l, n);
        if (x == 1)
            return false;
        if (x == n - 1)
            return true;
    }

    return false;
}

#endif /* PRIME_H */
