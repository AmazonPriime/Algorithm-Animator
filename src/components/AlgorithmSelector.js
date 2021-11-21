import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './AlgorithmSelector.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const algorithmSelector = (props) => {
  const { currentAlgorithm, algorithms, selectAlgorithm } = props;

  const renderItems = (items) => items.map((item, i) => (
    <Dropdown.Item
      className="selector-item"
      onClick={() => selectAlgorithm(i)}
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
          { ' ' }
          <FontAwesomeIcon
            icon={faCaretDown}
            className="icon"
          />
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
