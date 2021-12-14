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

const ensureInteger = (v) => v.replace(/[^\d]+/, '');

class GraphBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAlgorithm: algorithms[0],
      graphMatrix: randomMatix(config.defaultMatrixSize),
      sourceNode: 0,
      destNode: config.defaultMatrixSize - 1,
      sourceSelected: '',
      targetSelected: '',
      weight: '',
      updated: false,
      newestNodePos: null,
      currentPreset: '',
      graphInitialised: false,
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
      this.setState({ newestNodePos: pos });
    }
  }

  removeNode(i) {
    const { graphMatrix } = this.state;

    if (!ensureInteger(i) || i.length === 0) {
      return;
    }

    if (i >= graphMatrix.length) {
      return;
    }

    // remove the node
    graphMatrix.splice(i, 1);

    // remove connections from other nodes
    for (let j = 0; j < graphMatrix.length; j += 1) {
      graphMatrix[j].splice(i, 1);
    }

    this.setState({
      graphMatrix,
    });
  }

  addEdge() {
    const {
      sourceSelected,
      targetSelected,
      graphMatrix,
      weight,
    } = this.state;

    let weightValue = 1;

    if (sourceSelected.length === 0 || targetSelected.length === 0) {
      return;
    }

    if (!ensureInteger(sourceSelected) || !ensureInteger(targetSelected)) {
      return;
    }

    if (ensureInteger(weight) && weight.length > 0) {
      weightValue = weight;
    }

    if (sourceSelected >= graphMatrix.length || targetSelected >= graphMatrix.length) {
      return;
    }

    // update to add edge between nodes and reset source/target selected
    graphMatrix[sourceSelected][targetSelected] = weightValue;

    this.setState({
      sourceSelected: '',
      targetSelected: '',
    });
  }

  removeEdge(source, target) {
    const { graphMatrix } = this.state;

    if (!ensureInteger(source) || !ensureInteger(target)) {
      return;
    }

    // update to remove edge between source/target
    graphMatrix[source][target] = 0;

    this.setState({ graphMatrix });
  }

  updateWeight(id, i, j) {
    const { currentAlgorithm, weight, graphMatrix } = this.state;
    const { weighted } = currentAlgorithm;

    if (!weighted || i.length === 0 || j.length === 0 || weight.length === 0) {
      return;
    }

    if (!ensureInteger(weight) || !ensureInteger(i) || !ensureInteger(j)) {
      return;
    }

    // update the weight
    graphMatrix[i][j] = weight;

    this.setState({ graphMatrix });
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
      sourceSelected,
      targetSelected,
      graphInitialised,
      weight,
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
            setWeight={(v) => this.setState({ weight: v })}
            selectPreset={(i) => this.changePreset(i)}
            presets={currentAlgorithm.presets.map((v) => v.name)}
            numNodes={graphMatrix.length}
            source={sourceNode}
            dest={destNode}
            weight={weight}
            weighted={weighted}
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
            removeNode={(i) => this.removeNode(i)}
            addEdge={() => this.addEdge()}
            removeEdge={(source, target) => this.removeEdge(source, target)}
            setSourceSelected={(id) => this.setState({ sourceSelected: id })}
            setTargetSelected={(id) => this.setState({ targetSelected: id })}
            setInitialised={() => this.setState({ graphInitialised: true })}
            updateWeight={(id, i, j) => this.updateWeight(id, i, j)}
            graphElements={buildGraphFromMatrix(graphMatrix, weighted, newestNodePos)}
            source={sourceNode}
            dest={destNode}
            updated={updated}
            sourceSelected={sourceSelected}
            targetSelected={targetSelected}
            initialised={graphInitialised}
          />
          <CodeViewer code={currentAlgorithm.pseudocode} />
        </div>
      </div>
    );
  }
}

export default GraphBuilder;
