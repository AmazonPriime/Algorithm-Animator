import React, { Component } from 'react';
import CreateTools from './CreateTools';
import AlgorithmSelector from './AlgorithmSelector';
import Playback from './Playback';
import CodeViewer from './CodeViewer';
import Graph from './Graph';
import algorithms from '../algorithms';
import config from '../constant/config';
import { randomMatix, buildGraphFromMatrix } from '../util/util';
import './GraphBuilder.css';

class GraphBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAlgorithm: algorithms[0],
      graphMatrix: randomMatix(config.defaultMatrixSize),
      sourceNode: config.defaultMatrixSize - 1,
      destNode: 0,
      updated: false,
    };
  }

  changeAlgorithm(i) {
    if (i < algorithms.length && i !== -1) {
      this.setState({ currentAlgorithm: algorithms[i] });
    }
  }

  updateMatrix(m) {
    for (let i = 0; i < m.length; i += 1) {
      if (m.length !== m[i].length) {
        return;
      }
    }
    this.setState({ graphMatrix: m });
  }

  render() {
    const {
      graphMatrix,
      currentAlgorithm,
      sourceNode,
      destNode,
      updated,
    } = this.state;

    return (
      <div id="graphBuilder" className="graph-builder">
        <div id="controls" className="controls">
          <CreateTools
            numNodes={graphMatrix.length}
            updateMatrix={(m) => this.updateMatrix(m)}
            updateSource={(v) => this.setState({ sourceNode: v })}
            updateDest={(v) => this.setState({ destNode: v })}
            source={sourceNode}
            dest={destNode}
            setUpdated={() => this.setState({ updated: true })}
          />
          <AlgorithmSelector
            currentAlgorithm={currentAlgorithm.name}
            selectAlgorithm={(i) => this.changeAlgorithm(i)}
            algorithms={algorithms.map((v) => v.name)}
          />
          <Playback />
        </div>
        <div className="graph-code-container">
          <Graph
            graphElements={buildGraphFromMatrix(graphMatrix)}
            source={sourceNode}
            dest={destNode}
            updated={updated}
            setUpdated={() => this.setState({ updated: false })}
          />
          <CodeViewer code={currentAlgorithm.pseudocode} />
        </div>
      </div>
    );
  }
}

export default GraphBuilder;
