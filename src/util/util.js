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
        },
      });
    } else {
      graphElements.push({
        data: {
          id: `${i}`,
          label: `${i}`,
        },
        position: newestPos,
      });
    }
  }
  // add edges to the graph
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[i].length; j += 1) {
      if (matrix[i][j] >= 1) {
        graphElements.push({
          data: {
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

export default {
  randomNumber,
  randomMatix,
  buildGraphFromMatrix,
};
