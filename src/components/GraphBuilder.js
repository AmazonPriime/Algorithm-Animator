import React from 'react';
import CreateTools from './CreateTools';
import AlgorithmSelector from './AlgorithmSelector';
import Playback from './Playback';
import CodeViewer from './CodeViewer';
import Graph from './Graph';
import './GraphBuilder.css';

const graphBuilder = () => {
  const algorithms = ['Depth First Search', 'Breadth First Search', 'Dijkstra\'s Algorithm', 'A* Path Finding'];

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
      <div id="graph" className="graph">
        <Graph />
      </div>
      <div id="code" className="code">
        <CodeViewer />
      </div>
    </div>
  );
};

export default graphBuilder;
