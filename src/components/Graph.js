import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import config from '../constant/config';
import './Graph.css';

Cytoscape.use(coseBilkent);

const graph = (props) => {
  const {
    graphElements,
    source,
    dest,
    updated,
    setSourceSelected,
    setTargetSelected,
    setUpdated,
    addNode,
    initialised,
    setInitialised,
    addEdge,
    removeEdge,
  } = props;

  let {
    sourceSelected,
    targetSelected,
  } = props;

  const deleteGraphStyle = (i) => {
    if (i !== -1) {
      config.graphStyles.splice(i, 1);
    }
  };

  const addGraphStyle = (id, colour) => {
    config.graphStyles.push({
      selector: `node[id = '${id}']`,
      style: {
        borderColor: colour,
        fontWeight: 'bold',
      },
    });
  };

  const selectors = config.graphStyles.map((v) => v.selector);
  for (let i = selectors.length - 1; i >= 0; i -= 1) {
    if (selectors[i].startsWith('node[id = ')) {
      deleteGraphStyle(i);
    }
  }

  addGraphStyle(source, 'green');
  addGraphStyle(dest, 'red');
  addGraphStyle(sourceSelected, 'orange');
  addGraphStyle(targetSelected, 'orange');

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

          if (!initialised) {
            cy.on('dbltap', (e) => {
              addNode(e.position);
            });

            cy.on('select', 'node', (e) => {
              const id = e.target.id();
              if (sourceSelected === id) {
                sourceSelected = '';
                setSourceSelected('');
              } else if (targetSelected === id) {
                targetSelected = '';
                setTargetSelected('');
              } else if (sourceSelected.length === 0) {
                sourceSelected = id;
                setSourceSelected(id);
              } else if (targetSelected.length === 0) {
                targetSelected = id;
                setTargetSelected(id);
              }
              if (sourceSelected.length > 0 && targetSelected.length > 0) {
                addEdge();
                sourceSelected = '';
                targetSelected = '';
              }
              e.target.unselect();
            });

            cy.on('taphold', 'edge', (e) => {
              const edge = e.target.json();
              removeEdge(edge.data.source, edge.data.target);
            });
          }

          if (!initialised) {
            setInitialised();
          }
        }}
      />
    </div>
  );
};

export default graph;
