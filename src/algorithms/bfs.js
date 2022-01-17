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
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue urna at est viverra finibus. Proin a pulvinar orci, quis lacinia eros. In eget ornare odio, at vestibulum nulla. Integer feugiat augue ut neque accumsan, a cursus purus suscipit. Praesent at ullamcorper nibh, sed ullamcorper nibh. Donec finibus tortor non nisl fermentum, eu scelerisque elit consectetur. Fusce bibendum gravida risus, a malesuada massa euismod et. Nullam volutpat sed metus non pharetra. Donec egestas nisl in nunc feugiat egestas. Quisque commodo aliquet facilisis. Nulla facilisi. Suspendisse sit amet fringilla purus. Aliquam et ante ut sem sagittis rhoncus. Praesent ligula diam, consectetur vel egestas vel, elementum ac est. Nunc at felis nec velit fringilla ultrices. In ultrices tempus orci et blandit. Cras commodo quam hendrerit vulputate efficitur. Integer mattis dictum arcu. Sed vitae sem tempor, cursus arcu eu, maximus sem. Nunc dictum nisi a nisi gravida, in mollis odio consequat. Integer facilisis sit amet nunc quis consectetur.
`,
  pseudocode: `procedure BFS(G, root) is
    {{0}}
    let Q be a queue
    label root as explored
    Q.enqueue(root)
    {{/0}}
    {{1,2,3,4}}
    while Q is not empty do
    {{/1,2,3,4}}
        {{1}}
        v := Q.dequeue()
        {{/1}}
        {{2}}
        if v is the goal then
        {{/2}}
            {{3}}
            return v
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
                {{/6}}`,
  algorithm: (graph, source, dest) => {
    const steps = []; // list to store each 'step' of the algorithm
    const queue = [];
    const explored = new Array(graph.length).fill(false); // explored nodes
    const traversed = []; // traversed edges

    let msg = 'Initialising queue';
    steps.push(createStep(explored, traversed, '', '', 0, msg));

    queue.push(source);
    explored[source] = true;
    while (queue.length !== 0) {
      const v = queue.shift();

      // step console.log(`checking ${v} node`);
      msg = `Dequeuing node ${v} from queue`;
      steps.push(createStep(explored, traversed, v, '', 1, msg));

      // step console.log(`checking ${v} node is dest`);
      msg = `Checking if node ${v} is destination`;
      steps.push(createStep(explored, traversed, v, '', 2, msg));

      if (v === dest) {
        // step console.log(`found dest ${v}`);
        msg = `Found destination node: ${v}`;
        steps.push(createStep(explored, traversed, v, '', 3, msg));

        break; // end loop as we have reach destination
      }
      for (let i = 0; i < graph.length; i += 1) {
        // step console.log(`checking nodes adjacent to ${v}`);
        msg = `Checking adjacent nodes to node ${v}`;
        steps.push(createStep(explored, traversed, v, '', 4, msg));

        if (graph[v][i] === 1) { // edge is adjacent to v
          // step console.log(`checking nodes adjacent to ${v}`);
          msg = `Checking if node ${i} has been visited`;
          steps.push(createStep(explored, traversed, v, '', 5, msg));

          if (!explored[i]) { // not visited
            explored[i] = true;
            queue.push(i);
            traversed.push(`${v} ${i}`);

            // step console.log(`marking node ${i} as visited`);
            msg = `Marking node ${i} as visited and adding it to queue`;
            steps.push(createStep(explored, traversed, v, `${v} ${i}`, 6, msg));
          }
        }
      }
    }
    return steps;
  },
};
