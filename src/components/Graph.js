import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import './Graph.css';

const graph = () => {
  const elements = [
    { data: { id: 'one', label: 'Node 1' }, position: { x: 200, y: 200 } },
    { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 100 } },
    { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } },
  ];

  return (
    <div className="graph-container">
      <CytoscapeComponent
        elements={elements}
        className="graph"
      />
    </div>
  );
};

export default graph;
