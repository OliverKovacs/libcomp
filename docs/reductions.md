# Reductions

Common reductions between synchronization primitives.

#### Atomic Register → 2-Lock (Dekker)

```
class Lock2():
    flag ← [ false, false ]
    turn ← 0

    void lock(id):
        flag[id] ← true
        while flag[!id]:
            if turn != id:
                flag[id] ← false
                while turn != id:
                    nop
                flag[id] ← true



    void unlock(id):
        turn ← !id
        flag[id] ← false
```

#### Atomic Register → 2-Lock (Peterson)

```
class Lock2():
    flag ← [ false, false ]
    turn ← 0

    void lock(id):
        flag[id] ← true
        turn ← !id
        while flag[!id] and turn = !id:
            nop

    void unlock(id):
        flag[id] ← false
```

#### Atomic Register → n-Lock (Backery)

#### Binary 2-Consensus → 2-Consensus

```
class Consensus2():
    c ← BinaryConsensus2()
    a[2]

    int decide(n, id):
        a[id] ← n
        return a[c.decide(id, id)]
```

#### Consensus → Lock

```
class Lock():
    c ← Consensus()

    void lock(id):
        while not c.decide(id, id) = id:
            nop

    void unlock():
        c ← Consensus()
```

#### FIFO → 2-Consensus

```
class Consensus2():
    q ← FIFO()
    q.enqueue(0)
    q.enqueue(1)
    a[2]

    void decide(n, id):
        a[id] ← n
        return a[id xor q.dequeue()]
```

#### FIFO with peek() → n-Consensus

```
class Consensus(n):
    q ← FIFO()
    a[n]

    void decide(n, id):
        a[id] ← n
        q.enqueue(id)
        return a[q.peek()]
```

#### Lock → Semaphore

```
class Semaphore(n):
    l ← Lock()
    n ← n

    void acquire():
        l.lock()
        n ← n - 1
        l.unlock()

    void release():
        l.lock()
        n ← n + 1
        l.unlock()
```

#### Lock and Semaphore → Barrier

```
class Barrier(n):
    n ← n
    c ← 0
    l ← Lock()
    s ← Semaphore(0)

    void barrier():
        l.lock()
        c ← c + 1
        if c = n:
            s.release()
        l.unlock()

        s.acquire()
        s.release()
```

#### Lock and Semaphore → Cyclic Barrier

```
class CyclicBarrier(n):
    n ← n
    c ← 0
    l ← Lock()
    s1 ← Semaphore(0)
    s2 ← Semaphore(1)

    void barrier():
        l.lock()
        c ← c + 1
        if c = n:
            s1.release()
            s2.acquire()
        l.unlock()

        s1.acquire()
        s1.release()

        l.lock()
        c ← c - 1
        if c = 0:
            s1.acquire()
            s2.release()
        l.unlock()

        s2.acquire()
        s2.release()

```

#### Semaphore → 2-Barrier (Rendezvous)

```
class Barrier2():
    s ← [ Semaphore(0), Semaphore(0) ]

    void barrier(id):
        s[!id].release()
        s[id].acquire()
```

#### Semaphore → Lock

```
class Lock():
    s ← Semaphore(1)

    void lock():
        s.acquire()

    void unlock():
        s.release()
```
