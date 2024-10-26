#include<bits/stdc++.h>

int64_t lvl = 5;

void solve(std::ifstream *, std::ofstream *);

int main(int argc, char *argv[])
{
    for (int64_t i = 1; i <= 5; i++) {
        std::stringstream inp;
        inp << "level" << lvl << "/level" << lvl << "_" << i << ".in";
        std::cout << inp.str() << std::endl;
        std::ifstream inf(inp.str());

        std::stringstream outp;
        outp << "out/level" << lvl << "_" << i << ".out";
        std::ofstream outf(outp.str());

        solve(&inf, &outf);
    }

    return 0;
}

void solve(std::ifstream *inf, std::ofstream *outf) {
    // implement
}
