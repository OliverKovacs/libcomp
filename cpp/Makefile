CXX=g++
CXXFLAGS=-std=c++23 -Wall -Wextra -Wpedantic

test: main
	cat test.txt | ./$^

run: main
	./$^

main: main.cpp graph.cpp coloring.cpp matching.cpp geometry.cpp prime.cpp
	$(CXX) $(CXXFLAGS) main.cpp -o $@

clean:
	rm -f main
