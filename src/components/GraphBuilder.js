import React, { Component } from 'react';
import CreateTools from './CreateTools';
import AlgorithmSelector from './AlgorithmSelector';
import Playback from './Playback';
import CodeViewer from './CodeViewer';
import Graph from './Graph';
import Legend from './Legend';
import algorithms from '../algorithms';
import config from '../constant/config';
import {
  randomMatix,
  buildGraphFromMatrix,
  highlightGraph,
  genPathEdgeStles,
  flattenMatrix,
  convertPrev,
} from '../util/util';
import './GraphBuilder.css';

const ensureInteger = (v) => v.replace(/[^\d]+/, '');

class GraphBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAlgorithm: algorithms[0],
      directedMatrix: randomMatix(config.defaultMatrixSize),
      undirectedMatrix: [], // assigned in componentDidMount()
      sourceNode: 0,
      destNode: config.defaultMatrixSize - 1,
      sourceSelected: '',
      targetSelected: '',
      weight: '',
      updated: false,
      newestNodePos: null,
      currentPreset: '',
      graphInitialised: false,
      directed: true,
      speed: 1, // current speed multiplier for the animation
      playing: false, // whether or not the animation is paused
      updatedSincePlay: true, // has graph updated, default true
      steps: [], // the steps for the animation
      currentStep: 0, // the index for the current step
      animationStyles: [], // list of the styles for the current step of animation
    };
  }

  componentDidMount() {
    const { directedMatrix } = this.state;
    this.setState({
      undirectedMatrix: flattenMatrix(directedMatrix),
    });
  }

  runAnimation(initialise = false) {
    const {
      playing,
      speed,
      currentStep,
      steps,
    } = this.state;
    if (playing || initialise) {
      setTimeout(() => this.runAnimation(), 250 / speed);
    }
    this.changeStep(1);
    // stop when at end
    if (currentStep >= steps.length - 1 && !initialise) {
      this.setState({ playing: false });
    }
  }

  changeAlgorithm(i) {
    if (i < algorithms.length && i !== -1) {
      this.setState({
        currentAlgorithm: algorithms[i],
        currentPreset: '',
      });
      this.resetSteps();
    }
  }

  changePreset(i) {
    const { currentAlgorithm } = this.state;

    if (i < currentAlgorithm.presets.length && i !== -1) {
      this.updateMatrix(currentAlgorithm.presets[i].matrix);
      this.setState({
        currentPreset: currentAlgorithm.presets[i].name,
      });
      this.resetSteps();
    }
  }

  updateMatrix(m) {
    const { sourceNode, destNode, directed } = this.state;

    for (let i = 0; i < m.length; i += 1) {
      if (m.length !== m[i].length) {
        return;
      }
    }

    if (directed) {
      this.setState({
        directedMatrix: m,
      });
    } else {
      this.setState({
        undirectedMatrix: flattenMatrix(m), // ensure matrix has no double edges
      });
    }

    this.setState({
      sourceNode: sourceNode >= m.length ? 0 : sourceNode,
      destNode: destNode >= m.length ? m.length - 1 : destNode,
    });

    this.resetSteps();
  }

  addNode(pos = null) {
    const { directedMatrix, undirectedMatrix, directed } = this.state;

    if (directed) {
      for (let i = 0; i < directedMatrix.length; i += 1) {
        directedMatrix[i].push(0);
      }
      directedMatrix.push(Array(directedMatrix.length + 1).fill(0));
    } else {
      for (let i = 0; i < undirectedMatrix.length; i += 1) {
        undirectedMatrix[i].push(0);
      }
      undirectedMatrix.push(Array(undirectedMatrix.length + 1).fill(0));
    }

    if (pos) {
      this.setState({
        newestNodePos: pos,
      });
    }

    this.resetSteps();
  }

  removeNode(i) {
    const { directedMatrix, undirectedMatrix, directed } = this.state;

    if (!ensureInteger(i) || i.length === 0) {
      return;
    }

    const matrix = directed ? directedMatrix : undirectedMatrix;

    if (i >= matrix.length) {
      return;
    }

    if (directed) {
      // remove the node
      directedMatrix.splice(i, 1);
      // remove connections from other nodes
      for (let j = 0; j < matrix.length; j += 1) {
        directedMatrix[j].splice(i, 1);
      }
      this.setState({
        directedMatrix,
      });
    } else {
      // remove the node
      undirectedMatrix.splice(i, 1);
      // remove connections from other nodes
      for (let j = 0; j < matrix.length; j += 1) {
        undirectedMatrix[j].splice(i, 1);
      }
      this.setState({
        undirectedMatrix,
      });
    }

    this.setState({
      updated: true,
    });
    this.resetSteps();
  }

  addEdge() {
    const {
      sourceSelected,
      targetSelected,
      directedMatrix,
      undirectedMatrix,
      directed,
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

    const matrix = directed ? directedMatrix : undirectedMatrix;

    if (sourceSelected >= matrix.length || targetSelected >= matrix.length) {
      return;
    }

    // update to add edge between nodes and reset source/target selected
    if (directed) {
      directedMatrix[sourceSelected][targetSelected] = weightValue;
    } else if (!undirectedMatrix[targetSelected][sourceSelected] > 0) {
      // make sure there isn't already and edge
      undirectedMatrix[sourceSelected][targetSelected] = weightValue;
    }

    this.setState({
      sourceSelected: '',
      targetSelected: '',
    });
    this.resetSteps();
  }

  removeEdge(source, target) {
    const { directedMatrix, undirectedMatrix, directed } = this.state;

    if (!ensureInteger(source) || !ensureInteger(target)) {
      return;
    }

    // update to remove edge between source/target
    if (directed) {
      directedMatrix[source][target] = 0;
    } else {
      // remove both possible edges
      undirectedMatrix[source][target] = 0;
      undirectedMatrix[target][source] = 0;
    }

    this.resetSteps();
  }

  updateWeight(id, i, j) {
    const {
      currentAlgorithm,
      weight,
      directedMatrix,
      undirectedMatrix,
      directed,
    } = this.state;
    const { weighted } = currentAlgorithm;

    if (!weighted || i.length === 0 || j.length === 0 || weight.length === 0) {
      return;
    }

    if (!ensureInteger(weight) || !ensureInteger(i) || !ensureInteger(j)) {
      return;
    }

    if (directed) {
      directedMatrix[i][j] = weight;
    } else if (undirectedMatrix[i][j] > 0) {
      undirectedMatrix[i][j] = weight;
    } else {
      undirectedMatrix[j][i] = weight;
    }

    this.resetSteps();
  }

  generateSteps() {
    const {
      currentAlgorithm,
      directedMatrix,
      undirectedMatrix,
      directed,
      sourceNode,
      destNode,
    } = this.state;

    const matrix = directed ? directedMatrix : undirectedMatrix;
    const steps = currentAlgorithm.algorithm(matrix, sourceNode, destNode, directed);

    this.setState({ steps });
  }

  changeStep(v) {
    const { steps, currentStep, directed } = this.state;
    if (v === 1 && currentStep + 1 < steps.length) {
      this.setState({ currentStep: currentStep + 1 });
    } else if (v === -1 && currentStep - 1 >= 0) {
      this.setState({ currentStep: currentStep - 1 });
    }
    if (steps[currentStep]) {
      const animationStyles = highlightGraph(steps[currentStep], directed);
      this.setState({ animationStyles });
    }
  }

  resetSteps() {
    // reset the step related states when graph updates
    this.setState({
      playing: false,
      updatedSincePlay: true,
      steps: [],
      currentStep: 0,
      animationStyles: [],
    });
  }

  render() {
    const {
      directedMatrix,
      undirectedMatrix,
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
      directed,
      speed,
      playing,
      currentStep,
      steps,
      updatedSincePlay,
      animationStyles,
    } = this.state;

    const { weighted } = currentAlgorithm;

    // set -inf if there currently are no steps
    // user has not pressed play or has updated the graph
    let codeSection = -Infinity;
    let edgeWeights = [];
    let pathStyles = [];
    let prevStyles = [];
    if (steps[currentStep] && !updatedSincePlay) {
      codeSection = steps[currentStep].codeSection;
      edgeWeights = steps[currentStep].nodeWeights;
      if (steps[currentStep].path.length > 0) {
        if (steps[currentStep].prev.length > 0) {
          const prevEdges = convertPrev(steps[currentStep].prev, directed);
          prevStyles = genPathEdgeStles(prevEdges, directed, 'magenta', 2);
        }
        pathStyles = genPathEdgeStles(steps[currentStep].path, directed);
      } else if (currentStep >= steps.length - 1) { // for non-weighted algorithms
        const prevEdges = convertPrev(steps[currentStep].prev, directed);
        prevStyles = genPathEdgeStles(prevEdges, directed, 'magenta', 2);
      }
    }

    const matrix = directed ? directedMatrix : undirectedMatrix;
    const graphElements = buildGraphFromMatrix(matrix, weighted, newestNodePos);

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
            numNodes={matrix.length}
            source={sourceNode}
            dest={destNode}
            weight={weight}
            weighted={weighted}
            currentPreset={currentPreset}
          />
          <AlgorithmSelector
            currentAlgorithm={currentAlgorithm.name}
            algorithmObj={currentAlgorithm}
            selectAlgorithm={(i) => this.changeAlgorithm(i)}
            algorithms={algorithms.map((v) => v.name)}
            setDirected={(v) => this.setState({ directed: v })}
            directed={directed}
          />
          <Playback
            curSpeed={speed}
            setCurSpeed={(v) => this.setState({ speed: v })}
            playing={playing}
            setPlaying={() => this.setState({ playing: !playing })}
            stepBack={() => this.changeStep(-1)}
            stepForward={() => this.changeStep(1)}
            currentStep={currentStep}
            nSteps={steps.length}
            updatedSincePlay={updatedSincePlay}
            setUpdatedSincePlay={(v) => this.setState({ updatedSincePlay: v })}
            generateSteps={() => this.generateSteps()}
            runAnimation={(v) => this.runAnimation(v)}
          />
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
            graphElements={graphElements}
            source={sourceNode}
            dest={destNode}
            updated={updated}
            sourceSelected={sourceSelected}
            targetSelected={targetSelected}
            initialised={graphInitialised}
            directed={directed}
            animationStyles={animationStyles}
            edgeWeights={edgeWeights}
            pathStyles={[...prevStyles, ...pathStyles]}
          />
          <CodeViewer
            code={currentAlgorithm.pseudocode}
            codeSection={codeSection}
          />
          <Legend />
        </div>
      </div>
    );
  }
}

export default GraphBuilder;
