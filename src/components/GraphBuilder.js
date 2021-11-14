import React from 'react';
import CreateTools from './CreateTools';
import AlgorithmSelector from './AlgorithmSelector';
import Playback from './Playback';
import CodeViewer from './CodeViewer';
import Graph from './Graph';
import './GraphBuilder.css';

const graphBuilder = () => (
  <div>
    <CreateTools />
    <AlgorithmSelector />
    <Playback />
    <CodeViewer />
    <Graph />
  </div>
);

export default graphBuilder;
