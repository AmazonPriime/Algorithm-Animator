import React from 'react';
import CreateTools from './CreateTools';
import AlgorithmSelector from './AlgorithmSelector';
import Playback from './Playback';
import CodeViewer from './CodeViewer';
import Graph from './Graph';
import './GraphBuilder.css';

const graphBuilder = () => {
  const algorithms = ['Depth First Search', 'Breadth First Search', 'Dijkstra\'s Algorithm', 'A* Path Finding'];

  const bfsCode = `
  procedure BFS(G, root) is
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
                  Q.enqueue(w)`;

  return (
    <div id="graphBuilder" className="graph-builder">
      <div id="controls" className="controls">
        <CreateTools />
        <AlgorithmSelector
          currentAlgorithm="Breadth First Search"
          algorithms={algorithms}
        />
        <Playback />
      </div>
      <div className="graph-code-container">
        <div id="graph" className="graph">
          <Graph />
        </div>
        <div id="code" className="code">
          <CodeViewer code={bfsCode} />
        </div>
      </div>
    </div>
  );
};

export default graphBuilder;
