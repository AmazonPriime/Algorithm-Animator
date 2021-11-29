import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import config from '../constant/config';
import './Graph.css';

cytoscape.use(coseBilkent);

const graph = (props) => {
  const {
    graphElements,
    source,
    dest,
    updated,
    setUpdated,
    addNode,
    addedNode,
  } = props;

  const [oneSelected, setOneSelected] = useState(null);
  const [twoSelected, setTwoSelected] = useState(null);

  if (config.graphStyles.at(-1).selector.startsWith('node')) {
    config.graphStyles.pop();
    if (config.graphStyles.at(-1).selector.startsWith('node')) {
      config.graphStyles.pop();
    }
  }

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

  console.log(config.graphStyles);

  return (
    <div className="graph-container">
      <CytoscapeComponent
        elements={graphElements}
        layout={config.graphLayout}
        stylesheet={config.graphStyles}
        className="graph"
        cy={(cy) => {
          if (updated) {
            const layout = cy.makeLayout(config.graphLayout);
            layout.run();
            setUpdated();
          }
          cy.style().fromJson(config.graphStyles);

          cy.on('dbltap', (e) => {
            if (!addedNode) {
              addNode(e.position);
            }
          });

          cy.on('select', 'node', (e) => {
            const id = e.target.id();
            if (oneSelected === null) {
              // select source
              setOneSelected(id);
              config.graphStyles.push({
                selector: `node[id = '${id}']`,
                style: {
                  borderColor: 'blue',
                  color: 'black',
                  fontWeight: 'bold',
                },
              });
            } else if (oneSelected === id) {
              // deselect source
              setOneSelected(null);
            } else if (twoSelected === null) {
              // select target
              setTwoSelected(id);
            } else if (twoSelected === id) {
              setTwoSelected(null);
            }
            cy.style().fromJson(config.graphStyles);
          });
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
