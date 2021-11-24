export default {
  name: 'Breadth First Search',
  presets: [
    {
      name: 'BFS PRESET 1',
      matrix: [
        [0, 1, 0], // eslint-disable-line
        [1, 0, 1], // eslint-disable-line
        [0, 0, 0], // eslint-disable-line
      ],
    },
  ],
  pseudocode: `procedure BFS(G, root) is
    let Q be a queue
    label root as explored
    Q.enqueue(root)
    while Q is not empty do
        v := Q.dequeue()
        if v is the goal then
            return v
        for all edges from v to w in G.adjacentEdges(v) do
            if w is not labeled as explored then
                label w as explored
                Q.enqueue(w)`,
  algorithm: () => {},
};
