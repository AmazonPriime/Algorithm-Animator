export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomMatix(n = -1) {
  const matrix = [];
  let nNodes = n;
  if (nNodes === -1) {
    nNodes = randomNumber(4, 15);
  }
  for (let i = 0; i < nNodes; i += 1) {
    matrix.push([]);
    for (let j = 0; j < nNodes; j += 1) {
      if (i !== j) {
        // 66% chance of edge
        matrix[i].push(randomNumber(0, 3) % 2);
      } else {
        matrix[i].push(0);
      }
    }
  }
  return matrix;
}

export function buildGraphFromMatrix(matrix, weighted = false, newestPos = null) {
  const graphElements = [];
  // add nodes to the graph
  for (let i = 0; i < matrix.length; i += 1) {
    if (i !== matrix.length - 1) {
      graphElements.push({
        data: {
          id: `${i}`,
          label: `${i}`,
          parent: `${i}p`,
        },
      }, {
        data: {
          id: `${i}p`,
          label: '',
        },
      });
    } else {
      graphElements.push({
        data: {
          id: `${i}`,
          label: `${i}`,
          parent: `${i}p`,
        },
        position: newestPos,
      },
      {
        data: {
          id: `${i}p`,
          label: '',
        },
      });
    }
  }
  // add edges to the graph
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[i].length; j += 1) {
      if (matrix[i][j] >= 1) {
        graphElements.push({
          data: {
            id: `${i} ${j}`,
            source: `${i}`,
            target: `${j}`,
            label: weighted ? matrix[i][j] : '',
          },
        });
      }
    }
  }
  return graphElements;
}

export function createStep(
  visNodes,
  trvEdges,
  curNode,
  curEdge,
  codeSec,
  logMsg,
  prev,
  weights = [],
  path = [],
) {
  return {
    visitedNodes: visNodes.slice(),
    traversedEdges: trvEdges.slice(),
    currentNode: curNode,
    currentEdge: curEdge,
    codeSection: codeSec,
    logMessage: logMsg,
    nodeWeights: weights.slice(),
    path: path.slice(),
    prev: prev.slice(),
  };
}

export function parseCodeSections(code) {
  const lines = code.split(/\n/);
  const sections = []; // array of objects; sectNum: int, code: string
  let sectNum = -1;
  let inSection = false;
  let multiLines = '';
  for (let i = 0; i < lines.length; i += 1) {
    // start of section
    if (lines[i].match(/{{\d}}/)) {
      // increment sectNum
      sectNum += 1;
      inSection = true;
    // end of section
    } else if (lines[i].match(/{{\/\d}}/)) {
      // add multiline to the sections array
      sections.push({ sectNum, code: multiLines });
      multiLines = '';
      inSection = false;
    // inside of section so add to multiline
    } else if (inSection) {
      // if theres already content then append line prefixed with newline
      multiLines = multiLines ? `${multiLines}${lines[i]}\n` : `${lines[i]}\n`;
    // not currently inside of section
    } else {
      sections.push({ sectNum: -1, code: `${lines[i]}\n` });
    }
  }
  return sections;
}

export function highlightGraph(step) {
  const styles = []; // array to store the new edge and node styles
  const rs = getComputedStyle(document.querySelector(':root'));
  const visited = rs.getPropertyValue('--color-visited').substring(1);
  const current = rs.getPropertyValue('--color-current').substring(1);
  // add node styles
  for (let i = 0; i < step.visitedNodes.length; i += 1) {
    if (step.visitedNodes[i]) {
      styles.push({
        selector: `node[id = '${i}']`,
        style: {
          borderColor: visited,
          borderWidth: 1,
        },
      });
    }
  }
  if (step.currentNode !== '') {
    styles.push({
      selector: `node[id = '${step.currentNode}']`,
      style: {
        borderColor: current,
        fontWeight: 'bold',
        borderWidth: 2,
      },
    });
  }
  // add edge styles
  for (let i = 0; i < step.traversedEdges.length; i += 1) {
    if (step.traversedEdges[i]) {
      styles.push({
        selector: `edge[id = '${step.traversedEdges[i]}']`,
        style: {
          lineColor: visited,
        },
      });
    }
  }
  if (step.currentEdge !== '') {
    styles.push({
      selector: `edge[id = '${step.currentEdge}']`,
      style: {
        lineColor: current,
        width: 3,
      },
    });
  }
  return styles;
}

export function extractMin(queue, dist) {
  let u = queue[0];
  let min = dist[u];
  for (let i = 0; i < queue.length; i += 1) {
    const v = queue[i];
    if (dist[v] < min) {
      u = v;
      min = dist[v];
    }
  }
  return u;
}

export function genPathEdgeStles(path, directed, colour = '--color-path', width = 3) {
  const styles = [];
  const rs = getComputedStyle(document.querySelector(':root'));
  const colourStr = rs.getPropertyValue(colour).substring(1);
  if (path.length > 0) {
    for (let i = 0; i < path.length; i += 1) {
      const pathVertices = path[i].split(' ');
      styles.push({
        selector: `edge[id = '${path[i]}']`,
        style: {
          lineColor: colourStr,
          width,
        },
      });
      console.log(styles);
      if (!directed) {
        styles.push({
          selector: `edge[id = '${pathVertices[1]} ${pathVertices[0]}']`,
          style: {
            lineColor: colourStr,
            width,
          },
        });
      }
    }
  }
  return styles;
}

export function flattenMatrix(matrix) {
  const flatMatrix = JSON.parse(JSON.stringify(matrix)); // copy of matrix
  const edges = []; // list of edges
  for (let i = 0; i < flatMatrix.length; i += 1) {
    for (let j = 0; j < flatMatrix[i].length; j += 1) {
      if (flatMatrix[i][j] > 0) { // edge exists
        if (edges.indexOf(`${j} ${i}`) !== -1) {
          flatMatrix[i][j] = 0;
        } else {
          edges.push(`${i} ${j}`);
        }
      }
    }
  }
  return flatMatrix;
}

export function convertPrev(prev, directed) {
  const edges = [];
  if (prev.filter((x) => x !== null).length > 0) {
    for (let v = 0; v < prev.length; v += 1) {
      if (prev[v] !== null) {
        edges.push(`${prev[v]} ${v}`);
        if (!directed) {
          edges.push(`${v} ${prev[v]}`);
        }
      }
    }
  }
  return edges;
}

export default {
  randomNumber,
  randomMatix,
  buildGraphFromMatrix,
  createStep,
  parseCodeSections,
  highlightGraph,
  extractMin,
  genPathEdgeStles,
  flattenMatrix,
  convertPrev,
};
