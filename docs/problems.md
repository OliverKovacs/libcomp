# Problems

List of common problems.

## Graphs

- Amount of minimum spanning trees
    - Kirchhoff's theorem
- Hamiltonian path problem
    - Bruteforce
    - Bellman–Held–Karp algorithm
- Longest path problem
- Minimum cut/maximum flow
- Minimum spanning tree (MST)
    - Kruskual's algorithm
    - Prim's algorithm
- Shortest path problem
    - Dijkstra's algorithm
    - A* search algorithm
- Traveling Salesman problem (TSP)

## Groups
- Conjugacy problem
    - For $x, y \in G$ is there a $z \in G$ such that $y = zxz^{-1}$?
- Word problem
- Isomorphism problem

## Lattices

- Cluster analysis
    - Hoshen–Kopelman algorithm

# CTFs

## Cryptography

### [Anshel–Anshel–Goldfeld key exchange](https://en.wikipedia.org/wiki/Anshel%E2%80%93Anshel%E2%80%93Goldfeld_key_exchange)

Shared public: nonabelian group $G$  
Alice public: $\bold{a} = (a_1, \ldots, a_n)$ where $a_i \in G$  
Alice private: $A = {a_i}_1^{\epsilon_1} \cdots {a_i}_L^{\epsilon_L}$ where $\epsilon_k = \pm 1$  
Bob public: $\bold{b} = (b_1, \ldots, b_n)$ where $b_i \in G$  
Bob private: $B = {b_j}_1^{\delta_1} \cdots {b_j}_L^{\delta_L}$ where $\delta_k = \pm 1$  
Alice sends: $\bar{a} = (A^{-1}b_1A, \ldots,  A^{-1}b_nA)$  
Bob sends: $\bar{b} = (B^{-1}a_1B, \ldots,  B^{-1}a_nB)$  
Shared secret: $A^{-1}B^{-1}AB
    = A^{-1} \cdot \left(B^{-1}{a_i}_1^{\epsilon_1}B\right) \cdots \left(B^{-1}{a_i}_L^{\epsilon_L}B\right)
    = \left(A^{-1}{b_j}_1^{\delta_1}A\right) \cdots \left(A^{-1}{b_j}_L^{\delta_L}A\right) \cdot B$

Attacks:
- Solve simultaneous conjugacy equations

### [Diffie-Hellman key exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange)

Shared public: $p \in \mathbb{P}$, $g$ primitive root modulo $p$  
Alice private: $a \in \mathbb{Z}$  
Alice public: $A = g^a \mod p$  
Bob private: $b \in \mathbb{Z}$  
Bob public: $B = g^b \mod p$  
Shared private: $s = B^a \mod p = A^b \mod p$

Attacks:
- [see DLP](#dlp)

### [Rivest–Shamir–Adleman (RSA)](https://en.wikipedia.org/wiki/RSA_(cryptosystem))

Private: $p, q \in \mathbb{P}$  
Public modulus $m = p \cdot q$  
Public exponent: $e \in \mathbb{P}$ and $\gcd(e, m) = 1$  
Private exponent: $d \equiv e^{-1} \pmod {\lambda{n}}$

Encrypt: $c \equiv m^e \pmod m$  
Decrypt: $m \equiv c^d \pmod m$

Attacks:
- if $m$ small:
    - factorize (SageMath, CADO-NFS)
    - [factordb](http://factordb.com/)
- if $p$ and $q$ similar:
    - [Fermat's factorization method](https://en.wikipedia.org/wiki/Fermat%27s_factorization_method)
- if $p − 1$ or $q − 1$ [smooth](https://en.wikipedia.org/wiki/Smooth_number):
    - [Pollard's p − 1 algorithm](https://en.wikipedia.org/wiki/Pollard%27s_p_%E2%88%92_1_algorithm)
- if $e$ small:
    - if m large:
        - $e$-th root of $c$
    - if multiple messages:
        - [Håstad's broadcast attack](https://en.wikipedia.org/wiki/Coppersmith%27s_attack#H%C3%A5stad's_broadcast_attack)
    - if known difference between messages:
        - [Franklin–Reiter related-message attack](https://en.wikipedia.org/wiki/Coppersmith%27s_attack#Franklin%E2%80%93Reiter_related-message_attack)
    - if random padding:
        - [Coppersmith's attack](https://en.wikipedia.org/wiki/Coppersmith%27s_attack)
- if $d$ small:
    - [Wiener's attack](https://en.wikipedia.org/wiki/Wiener%27s_attack)

<a name="dlp">

### [Discrete logarithm problem (DLP)](https://en.wikipedia.org/wiki/Discrete_logarithm)
</a>

Let $G$ by any Group and $a, b \in G$ then $k \in \mathbb Z$ that solves $b^k = a$ is the discrete logarithm $\log_b a$.  

Attacks:
- generally:
    - [Pollard's rho algorithm](https://en.wikipedia.org/wiki/Pollard%27s_rho_algorithm) (SageMath)
    - Baby-step giant-step (→ use Pollard's rho)
- if $|G|$ is a [smooth](https://en.wikipedia.org/wiki/Smooth_number) integer:
    - [Pohling-Hellman algorithm](https://en.wikipedia.org/wiki/Pohlig%E2%80%93Hellman_algorithm)
- if in $(\mathbb Z / q \mathbb Z)^*$ with $q \in \mathbb P$:
    - [Index calculus algorithm](https://en.wikipedia.org/wiki/Index_calculus_algorithm)
- if in a finite field:
    - [Function field sieve](https://en.wikipedia.org/wiki/Function_field_sieve) (CADO-NFS)

## Rev / Pwn

- [radare2](https://github.com/radareorg/radare2)
- [Ghidra](https://github.com/NationalSecurityAgency/ghidra)
- [angr](https://github.com/angr/angr)
- [Z3](https://github.com/Z3Prover/z3)
- gdb/lldb

## RF

- [GNU Radio](https://github.com/gnuradio/gnuradio)
- [inspectrum](https://github.com/miek/inspectrum)
- [urh](https://github.com/jopohl/urh)
