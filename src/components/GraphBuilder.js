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
      sourceNode: 0,
      destNode: config.defaultMatrixSize - 1,
      updated: false,
      newestNodePos: null,
      addedNode: false,
      currentPreset: '',
    };
  }

  changeAlgorithm(i) {
    if (i < algorithms.length && i !== -1) {
      this.setState({
        currentAlgorithm: algorithms[i],
        currentPreset: '',
      });
    }
  }

  changePreset(i) {
    const { currentAlgorithm } = this.state;

    console.log(currentAlgorithm.presets);

    if (i < currentAlgorithm.presets.length && i !== -1) {
      this.updateMatrix(currentAlgorithm.presets[i].matrix);
      this.setState({ currentPreset: currentAlgorithm.presets[i].name });
    }
  }

  updateMatrix(m) {
    const { sourceNode, destNode } = this.state;

    for (let i = 0; i < m.length; i += 1) {
      if (m.length !== m[i].length) {
        return;
      }
    }

    this.setState({
      graphMatrix: m,
      sourceNode: sourceNode >= m.length ? 0 : sourceNode,
      destNode: destNode >= m.length ? m.length - 1 : destNode,
    });
  }

  addNode(pos = null) {
    const { graphMatrix } = this.state;

    for (let i = 0; i < graphMatrix.length; i += 1) {
      graphMatrix[i].push(0);
    }

    graphMatrix.push(Array(graphMatrix.length + 1).fill(0));

    if (pos) {
      this.setState({
        addedNode: true,
        newestNodePos: pos,
      });
    }
  }

  render() {
    const {
      graphMatrix,
      currentAlgorithm,
      sourceNode,
      destNode,
      updated,
      currentPreset,
      newestNodePos,
      addedNode,
    } = this.state;

    const { weighted } = currentAlgorithm;

    return (
      <div id="graphBuilder" className="graph-builder">
        <div id="controls" className="controls">
          <CreateTools
            updateMatrix={(m) => this.updateMatrix(m)}
            updateSource={(v) => this.setState({ sourceNode: v })}
            updateDest={(v) => this.setState({ destNode: v })}
            setUpdated={() => this.setState({ updated: true })}
            selectPreset={(i) => this.changePreset(i)}
            presets={currentAlgorithm.presets.map((v) => v.name)}
            numNodes={graphMatrix.length}
            source={sourceNode}
            dest={destNode}
            currentPreset={currentPreset}
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
            setUpdated={() => this.setState({ updated: false })}
            addNode={(pos) => this.addNode(pos)}
            addedNode={addedNode}
            graphElements={buildGraphFromMatrix(graphMatrix, weighted, newestNodePos)}
            source={sourceNode}
            dest={destNode}
            updated={updated}
          />
          <CodeViewer code={currentAlgorithm.pseudocode} />
        </div>
      </div>
    );
  }
}

export default GraphBuilder;
