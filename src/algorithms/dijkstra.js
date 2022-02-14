import { extractMin, createStep } from '../util/util';

export default {
  name: 'Dijkstra\'s algorithm',
  weighted: true,
  notDirectional: false,
  presets: [
    {
      name: '5 Nodes',
      matrix: [
        [0, 1, 0, 0, 0], // eslint-disable-line
        [0, 0, 1, 0, 0], // eslint-disable-line
        [0, 0, 0, 1, 0], // eslint-disable-line
        [0, 0, 0, 0, 1], // eslint-disable-line
        [1, 0, 0, 0, 0], // eslint-disable-line
      ],
    },
  ],
  description: `
  ##### Description [[1](https://brilliant.org/wiki/dijkstras-short-path-finder/)]
  One algorithm for finding the shortest path from a starting node to a target node in a
  weighted graph is Dijkstra’s algorithm. The algorithm creates a tree of shortest paths
  from the starting vertex, the source, to all other points in the graph.

  Dijkstra’s algorithm, published in 1959 and named after its creator Dutch computer scientist
  Edsger Dijkstra, can be applied on a weighted graph. The graph can either be directed or
  undirected. One stipulation to using the algorithm is that the graph needs to have a
  nonnegative weight on every edge.

  ##### Time and space complexity [[2](https://iq.opengenus.org/time-and-space-complexity-of-dijkstra-algorithm/)]
  Using the approach below, using an unsorted array, we search through all vertices to find the
  closest within the graph. This means that our initial time complexity will be \`O(n)\` for this search.
  This will bring our total time complexity to \`O(V^2)\` where \`V\` is the number of vertices in the graph.
  Space complexity will be \`O(V)\` where \`V\` is number of vertices in graph, it is worse case scenario
  if it is a complete graph and every edge has to be visited.

  ##### Dijkstra Pseudocode
  \`\`\`
  function Dijkstra(Graph, source):
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
     return dist[], prev[]
  \`\`\`

  ---

  Sources
  * [1] [https://brilliant.org/wiki/dijkstras-short-path-finder/](https://brilliant.org/wiki/dijkstras-short-path-finder/)
  * [2] [https://iq.opengenus.org/time-and-space-complexity-of-dijkstra-algorithm/](https://iq.opengenus.org/time-and-space-complexity-of-dijkstra-algorithm/)
`,
  pseudocode: `function Dijkstra(Graph, source):
    {{0}}
    create vertex set Q
    {{/0}}
    {{1}}
    for each vertex v in Graph:
    {{/1}}
        {{2}}
        dist[v] ← INFINITY
        prev[v] ← UNDEFINED
        add v to Q
        {{/2}}
    {{3}}
    dist[source] ← 0
    {{/3}}
    while Q is not empty:
        {{4}}
        u ← vertex in Q with min dist[u]
        remove u from Q
        {{/4}}
        {{5}}
        for each neighbor v of u still in Q:
        {{/5}}
            {{6}}
            alt ← dist[u] + length(u, v)
            {{/6}}
            {{7}}
            if alt < dist[v]:
            {{/7}}
                {{8}}
                dist[v] ← alt
                prev[v] ← u
                {{/8}}
     {{9}}
     return dist[], prev[]
     {{/9}}`,
  algorithm: (graph, source, dest, directed) => {
    const steps = [];
    const explored = new Array(graph.length).fill(false);
    const traversed = [];

    const queue = [];
    const dist = [];
    const prev = [];

    let msg = 'Initialising queue';
    steps.push(createStep(explored, traversed, '', '', 0, msg, prev, dist));

    for (let v = 0; v < graph.length; v += 1) {
      msg = 'Looping through graph vertices';
      steps.push(createStep(explored, traversed, '', '', 1, msg, prev, dist));

      dist.push(Infinity);
      prev.push(null);
      queue.push(v);

      msg = 'Initialising dist, prev and adding vertices to queue';
      steps.push(createStep(explored, traversed, '', '', 2, msg, prev, dist));
    }
    dist[source] = 0;

    msg = 'Setting distance from source to source to 0';
    steps.push(createStep(explored, traversed, '', '', 3, msg, prev, dist));

    while (queue.length > 0) {
      const u = extractMin(queue, dist);

      queue.splice(queue.indexOf(u), 1);

      explored[u] = true;
      msg = 'Getting node from queue with smallest distance from source';
      steps.push(createStep(explored, traversed, u, '', 4, msg, prev, dist));

      for (let v = 0; v < graph[u].length; v += 1) {
        if (graph[u][v] > 0 || (!directed && graph[v][u] > 0)) {
          msg = `Checking adjacent nodes to node ${u}`;
          steps.push(createStep(explored, traversed, u, '', 5, msg, prev, dist));

          let alt;
          let edge;
          if (!directed && graph[v][u] > 0) {
            alt = parseInt(dist[u], 10) + parseInt(graph[v][u], 10);
            edge = `${v} ${u}`;
          } else {
            alt = parseInt(dist[u], 10) + parseInt(graph[u][v], 10);
            edge = `${u} ${v}`;
          }

          traversed.push(edge);
          msg = `Calculating weight when going to node ${v} via ${u} from source`;
          steps.push(createStep(explored, traversed, u, edge, 6, msg, prev, dist));

          msg = `Comparing calculated distance to known distance from source to node ${v}`;
          steps.push(createStep(explored, traversed, u, edge, 7, msg, prev, dist));

          if (alt < dist[v]) {
            dist[v] = alt;
            prev[v] = u;

            msg = `Updating distance from source to ${v} and node previous to ${v}`;
            steps.push(createStep(explored, traversed, u, edge, 8, msg, prev, dist));
          }
        }
      }
    }

    const seq = [];
    let u = dest;
    if (dist[u] !== Infinity) {
      while (u) {
        seq.push(u);
        u = prev[u];
      }
      seq.push(source);
    }

    msg = 'Finished, returning distances to each node from source';
    steps.push(createStep(explored, traversed, '', '', 9, msg, prev, dist));

    // add the steps to show the path target -> source
    if (seq.length > 0) {
      const pathHighlight = []; // array of edges to be highlighted
      for (let i = 0; i < seq.length - 1; i += 1) {
        msg = `${seq[i]} -> ${seq[i + 1]}`;
        pathHighlight.push(`${seq[i + 1]} ${seq[i]}`);
        steps.push(createStep(explored, traversed, '', '', null, msg, prev, dist, pathHighlight));
      }
    }

    return steps;
  },
};
