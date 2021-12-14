import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import './AlgorithmSelector.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faInfo } from '@fortawesome/free-solid-svg-icons';

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
      <Button
        id="info"
        className="button"
      >
        <FontAwesomeIcon
          icon={faInfo}
        />
      </Button>
    </div>
  );
};

algorithmSelector.defaultProps = {
  currentAlgorithm: '',
  algorithms: [],
  selectAlgorithm: () => {},
};

export default algorithmSelector;
