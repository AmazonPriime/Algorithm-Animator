import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './AlgorithmSelector.css';

const algorithmSelector = (props) => {
  const { currentAlgorithm, algorithms, selectAlgorithm } = props;

  const renderItems = (items) => items.map((item) => (
    <Dropdown.Item
      className="selector-item"
      onClick={() => selectAlgorithm(item)}
      active={item === currentAlgorithm}
    >
      { item }
    </Dropdown.Item>
  ));

  return (
    <div id="algorithmSelector" className="algorithm-selector">
      <Dropdown>
        <Dropdown.Toggle
          className="dropdown-toggle"
        >
          { currentAlgorithm }
        </Dropdown.Toggle>
        <Dropdown.Menu
          className="dropdown-menu"
        >
          { renderItems(algorithms) }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

algorithmSelector.defaultProps = {
  currentAlgorithm: '',
  algorithms: [],
  selectAlgorithm: () => {},
};

export default algorithmSelector;
