import { createStep } from '../util/util';

export default {
  name: 'Breadth First Search',
  weighted: false,
  notDirectional: false,
  presets: [
    {
      name: 'BFS PRESET 1',
      matrix: [
        [0, 1, 0, 1], // eslint-disable-line
        [0, 0, 0, 1], // eslint-disable-line
        [0, 0, 0, 1], // eslint-disable-line
        [1, 1, 1, 0], // eslint-disable-line
      ],
    },
  ],
  description: `
  ##### Description [[1](https://brilliant.org/wiki/breadth-first-search-bfs/)]
  Breadth-first search (BFS) is an important graph search algorithm that is used to solve
  many problems including finding the shortest path in a graph and solving puzzle games
  (such as Rubik's Cubes). Many problems in computer science can be thought of in terms of graphs.
  For example, analyzing networks, mapping routes, and scheduling are graph problems.
  Graph search algorithms like breadth-first search are useful for analyzing and solving graph
  problems.

  ##### Time and space complexity [[2](https://en.wikipedia.org/wiki/Breadth-first_search)]
  The time complexity can be expressed as \`O(|V|+|E|)\`, since every vertex and
  every edge will be explored in the worst case. \`|V|\` is the number of vertices and \`|E|\` is
  the number of edges in the graph. Note that \`O(|E|)\` may vary between \`O(1)\` and \`O(|V|^2)\`,
  depending on how sparse the input graph is.

  When the number of vertices in the graph is known ahead of time, and additional data structures
  are used to determine which vertices have already been added to the queue, the space complexity
  can be expressed as \`O(|V|)\`, where \`|V|\` is the number of vertices. This is in addition to
  the space required for the graph itself, which may vary depending on the graph representation
  used by an implementation of the algorithm.

  When working with graphs that are too large to store explicitly (or infinite), it is more
  practical to describe the complexity of breadth-first search in different terms: to find the
  nodes that are at distance d from the start node (measured in number of edge traversals), BFS
  takes \`O(b^(d + 1))\` time and memory, where b is the "branching factor" of the graph
  (the average out-degree).

  ##### BFS Pseudocode
  \`\`\`
  procedure BFS(G, root) is
    let Q be a queue
    label root as explored
    Q.enqueue(root)
    if source is the goal then
        return source
    while Q is not empty do
        v := Q.dequeue()
        for all edges from v to w in G.adjacentEdges(v) do
            if w is not labeled as explored then
                label w as explored
                Q.enqueue(w)
                if w is the goal then
                    return w
  \`\`\`

  ---
  
  Sources
  * [1] [https://brilliant.org/wiki/breadth-first-search-bfs/](https://brilliant.org/wiki/breadth-first-search-bfs/)
  * [2] [https://en.wikipedia.org/wiki/Breadth-first_search](https://en.wikipedia.org/wiki/Breadth-first_search)
`,
  pseudocode: `procedure BFS(G, root) is
    {{0}}
    let Q be a queue
    label root as explored
    Q.enqueue(root)
    {{/0}}
    {{1}}
    if source is the goal then
    {{/1}}
        {{2}}
        return source
        {{/2}}
    while Q is not empty do
        {{3}}
        v := Q.dequeue()
        {{/3}}
        {{4}}
        for all edges from v to w in G.adjacentEdges(v) do
        {{/4}}
            {{5}}
            if w is not labeled as explored then
            {{/5}}
                {{6}}
                label w as explored
                Q.enqueue(w)
                {{/6}}
                {{7}}
                if w is the goal then
                {{/7}}
                    {{8}}
                    return w
                    {{/8}}`,
  algorithm: (graph, source, dest, directed) => {
    const steps = []; // list to store each 'step' of the algorithm
    const queue = [];
    const prev = new Array(graph.length).fill(null);
    const explored = new Array(graph.length).fill(false); // explored nodes
    const traversed = []; // traversed edges
    let dontSkipQueue = true;
    queue.push(source);
    explored[source] = true;

    let msg = 'Initialising queue';
    steps.push(createStep(explored, traversed, source, '', 0, msg, prev));

    msg = `Checking if node ${source} is destination`;
    steps.push(createStep(explored, traversed, source, '', 1, msg, prev));

    if (source === parseInt(dest, 10)) {
      msg = `Found destination node: ${source}`;
      steps.push(createStep(explored, traversed, source, '', 2, msg, prev));

      dontSkipQueue = false; // skip loop as we have found destination
    }

    while (queue.length !== 0 && dontSkipQueue) {
      const v = queue.shift();

      msg = `Dequeuing node ${v} from queue`;
      steps.push(createStep(explored, traversed, v, '', 3, msg, prev));

      for (let i = 0; i < graph.length; i += 1) {
        if (graph[v][i] > 0 || (!directed && graph[i][v] > 0)) { // edge is adjacent to v
          msg = `Checking adjacent nodes to node ${v}`;
          steps.push(createStep(explored, traversed, v, '', 4, msg, prev));

          msg = `Checking if node ${i} has been visited`;
          const edge = (!directed && graph[i][v] > 0) ? `${i} ${v}` : `${v} ${i}`;
          steps.push(createStep(explored, traversed, v, edge, 5, msg, prev));
          traversed.push(edge);
          if (!explored[i]) { // not visited
            explored[i] = true;
            queue.push(i);
            prev[i] = i !== 0 ? v : null;

            msg = `Marking node ${i} as visited and adding it to queue`;
            steps.push(createStep(explored, traversed, v, '', 6, msg, prev));

            msg = `Checking if node ${i} is destination`;
            steps.push(createStep(explored, traversed, v, '', 7, msg, prev));

            if (i === parseInt(dest, 10)) {
              msg = `Found destination node: ${i}`;
              steps.push(createStep(explored, traversed, i, '', 8, msg, prev));

              dontSkipQueue = false;
              break; // exit loop as we have found destination
            }
          }
        }
      }
    }
    return steps;
  },
};
