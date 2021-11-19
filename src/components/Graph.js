import React from 'react';
import PropTypes from 'prop-types';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import { randomMatix, buildGraphFromMatrix } from '../util/util';
import './Graph.css';

cytoscape.use(coseBilkent);

const layout = {
  name: 'cose-bilkent',
  nodeDimensionsIncludeLabels: true,
  idealEdgeLength: 100,
};

const Graph = (props) => {
  const { matrix } = props;

  let graphElements;

  if (matrix.length !== 0) {
    graphElements = buildGraphFromMatrix(matrix);
  } else {
    graphElements = buildGraphFromMatrix(randomMatix(8));
  }

  return (
    <div className="graph-container">
      <CytoscapeComponent
        elements={graphElements}
        layout={layout}
        className="graph"
      />
    </div>
  );
};

Graph.propTypes = {
  matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};

Graph.defaultProps = {
  matrix: [],
};

export default Graph;
