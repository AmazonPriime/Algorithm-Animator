import React from 'react';
import PropTypes from 'prop-types';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import config from '../constant/config';
import './Graph.css';

cytoscape.use(coseBilkent);

const graph = (props) => {
  const { graphElements, source, dest } = props;

  config.graphStyles.push({
    selector: `node[id = '${source}']`,
    style: {
      borderColor: 'green',
      color: 'green',
      fontWeight: 'bold',
    },
  });

  config.graphStyles.push({
    selector: `node[id = '${dest}']`,
    style: {
      borderColor: 'red',
      color: 'red',
      fontWeight: 'bold',
    },
  });

  return (
    <div className="graph-container">
      <CytoscapeComponent
        elements={graphElements}
        layout={config.graphLayout}
        stylesheet={config.graphStyles}
        className="graph"
        cy={(cy) => {
          const layout = cy.makeLayout(config.graphLayout);
          layout.run();
        }}
      />
    </div>
  );
};

graph.propTypes = {
  graphElements: PropTypes.arrayOf(PropTypes.object),
  source: PropTypes.number,
  dest: PropTypes.number,
};

graph.defaultProps = {
  graphElements: [],
  source: -1,
  dest: -1,
};

export default graph;
