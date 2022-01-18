import { extractMin, createStep } from '../util/util';

export default {
  name: 'Dijkstra\'s algorithm',
  weighted: true,
  notDirectional: false,
  presets: [
    {
      name: 'DIJKSTRA PRESET 1',
      matrix: [
        [0, 0, 1, 0, 0], // eslint-disable-line
        [1, 0, 1, 1, 0], // eslint-disable-line
        [0, 1, 0, 0, 0], // eslint-disable-line
        [0, 1, 0, 0, 0], // eslint-disable-line
        [1, 0, 0, 1, 0], // eslint-disable-line
      ],
    },
  ],
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue urna at est viverra finibus. Proin a pulvinar orci, quis lacinia eros. In eget ornare odio, at vestibulum nulla. Integer feugiat augue ut neque accumsan, a cursus purus suscipit. Praesent at ullamcorper nibh, sed ullamcorper nibh. Donec finibus tortor non nisl fermentum, eu scelerisque elit consectetur. Fusce bibendum gravida risus, a malesuada massa euismod et. Nullam volutpat sed metus non pharetra. Donec egestas nisl in nunc feugiat egestas. Quisque commodo aliquet facilisis. Nulla facilisi. Suspendisse sit amet fringilla purus. Aliquam et ante ut sem sagittis rhoncus. Praesent ligula diam, consectetur vel egestas vel, elementum ac est. Nunc at felis nec velit fringilla ultrices. In ultrices tempus orci et blandit. Cras commodo quam hendrerit vulputate efficitur. Integer mattis dictum arcu. Sed vitae sem tempor, cursus arcu eu, maximus sem. Nunc dictum nisi a nisi gravida, in mollis odio consequat. Integer facilisis sit amet nunc quis consectetur.
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
  algorithm: (graph, source, dest) => {
    const steps = [];
    const explored = new Array(graph.length).fill(false);
    const traversed = [];

    const queue = [];
    const dist = [];
    const prev = [];

    let msg = 'Initialising queue';
    steps.push(createStep(explored, traversed, '', '', 0, msg, dist));

    for (let v = 0; v < graph.length; v += 1) {
      msg = 'Looping through graph vertices';
      steps.push(createStep(explored, traversed, '', '', 1, msg, dist));

      dist.push(Infinity);
      prev.push(null);
      queue.push(v);

      msg = 'Initialising dist, prev and adding vertices to queue';
      steps.push(createStep(explored, traversed, '', '', 2, msg, dist));
    }
    dist[source] = 0;

    msg = 'Setting distance from source to source to 0';
    steps.push(createStep(explored, traversed, '', '', 3, msg, dist));

    while (queue.length > 0) {
      const u = extractMin(queue, dist);

      queue.splice(queue.indexOf(u), 1);

      explored[u] = true;
      msg = 'Getting node from queue with smallest distance from source';
      steps.push(createStep(explored, traversed, u, '', 4, msg, dist));

      for (let v = 0; v < graph[u].length; v += 1) {
        msg = `Checking adjacent nodes to node ${u}`;
        steps.push(createStep(explored, traversed, u, '', 5, msg, dist));

        if (graph[u][v] > 0) {
          const alt = parseInt(dist[u], 10) + parseInt(graph[u][v], 10);

          traversed.push(`${u} ${v}`);
          msg = `Calculating weight when going to node ${v} via ${u} from source`;
          steps.push(createStep(explored, traversed, u, `${u} ${v}`, 6, msg, dist));

          msg = `Comparing calculated distance to known distance from source to node ${v}`;
          steps.push(createStep(explored, traversed, u, `${u} ${v}`, 7, msg, dist));

          if (alt < dist[v]) {
            dist[v] = alt;
            prev[v] = u;

            msg = `Updating distance from source to ${v} and node previous to ${v}`;
            steps.push(createStep(explored, traversed, u, `${u} ${v}`, 8, msg, dist));
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
    steps.push(createStep(explored, traversed, '', '', 9, msg, dist));

    // add the steps to show the path target -> source
    if (seq.length > 0) {
      const pathHighlight = []; // array of edges to be highlighted
      for (let i = 0; i < seq.length - 1; i += 1) {
        msg = `${seq[i]} -> ${seq[i + 1]}`;
        pathHighlight.push(`${seq[i + 1]} ${seq[i]}`);
        steps.push(createStep(explored, traversed, '', '', null, msg, dist, pathHighlight));
      }
    }

    return steps;
  },
};
