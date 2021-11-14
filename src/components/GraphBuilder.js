import React from 'react';
import CreateTools from './CreateTools';
import AlgorithmSelector from './AlgorithmSelector';
import Playback from './Playback';
import CodeViewer from './CodeViewer';
import Graph from './Graph';
import './GraphBuilder.css';

const graphBuilder = () => (
  <div id="graphBuilder" className="graph-builder">
    <div id="controls" className="controls">
      <CreateTools />
      <AlgorithmSelector />
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

export default graphBuilder;
