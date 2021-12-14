export default {
  name: 'Dijkstra\'s algorithm',
  weighted: true,
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
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue urna at est viverra finibus. Proin a pulvinar orci, quis lacinia eros. In eget ornare odio, at vestibulum nulla. Integer feugiat augue ut neque accumsan, a cursus purus suscipit. Praesent at ullamcorper nibh, sed ullamcorper nibh. Donec finibus tortor non nisl fermentum, eu scelerisque elit consectetur. Fusce bibendum gravida risus, a malesuada massa euismod et. Nullam volutpat sed metus non pharetra. Donec egestas nisl in nunc feugiat egestas. Quisque commodo aliquet facilisis. Nulla facilisi. Suspendisse sit amet fringilla purus. Aliquam et ante ut sem sagittis rhoncus. Praesent ligula diam, consectetur vel egestas vel, elementum ac est. Nunc at felis nec velit fringilla ultrices. In ultrices tempus orci et blandit. Cras commodo quam hendrerit vulputate efficitur. Integer mattis dictum arcu. Sed vitae sem tempor, cursus arcu eu, maximus sem. Nunc dictum nisi a nisi gravida, in mollis odio consequat. Integer facilisis sit amet nunc quis consectetur.
`,
};
