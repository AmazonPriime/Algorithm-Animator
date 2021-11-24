export default {
  name: 'Dijkstra\'s algorithm',
  presets: [
    {
      name: 'DIJKSTRA PRESET 1',
      matrix: [
        [0, 1, 0], // eslint-disable-line
        [1, 0, 1], // eslint-disable-line
        [0, 0, 0], // eslint-disable-line
      ],
    },
  ],
  pseudocode: `function Dijkstra(Graph, source):
    create vertex set Q
    for each vertex v in Graph:
        dist[v] ← INFINITY
        prev[v] ← UNDEFINED
        add v to Q
    dist[source] ← 0
    while Q is not empty:
        u ← vertex in Q with min dist[u]
        remove u from Q
        for each neighbor v of u still in Q:
            alt ← dist[u] + length(u, v)
            if alt < dist[v]:
                dist[v] ← alt
                prev[v] ← u
     return dist[], prev[]`,
  algorithm: () => {},
};
