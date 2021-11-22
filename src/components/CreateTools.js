import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDice,
  faMapMarkerAlt,
  faSearch,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { randomMatix } from '../util/util';
import config from '../constant/config';
import './CreateTools.css';

const ensureInteger = (v) => v.replace(/[^\d]+/, '');

const createTools = (props) => {
  const [error, setError] = useState('');

  const {
    numNodes,
    updateMatrix,
    updateSource,
    updateDest,
    setUpdated,
  } = props;

  const onChangeInput = (value, setFunc) => {
    const newValue = ensureInteger(value);
    setFunc(newValue);
    setError(newValue > numNodes ? config.invalidNodeError : '');
  };

  const genRandomMatix = () => {
    const matrix = randomMatix();
    setUpdated();
    updateMatrix(matrix);
  };

  return (
    <div id="tools" className="tools">
      <div id="topRow" className="top-row">
        <Button
          id="guide"
          className="button"
        >
          Guide
        </Button>
        <Button
          id="addNode"
          className="button"
        >
          + Node
        </Button>
        <Dropdown>
          <Dropdown.Toggle
            className="dropdown-toggle presets"
          >
            Presets
            { ' ' }
            <FontAwesomeIcon
              icon={faCaretDown}
              className="icon"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu
            className="dropdown-menu"
          >
            <Dropdown.Item>
              Preset 1
            </Dropdown.Item>
            <Dropdown.Item>
              Preset 2
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button
          id="random"
          className="button"
          onClick={() => genRandomMatix()}
        >
          <FontAwesomeIcon
            icon={faDice}
          />
        </Button>
      </div>
      <div id="bottomRow" className="bottom-row">
        <div>
          <InputGroup>
            <div className="input-icon">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="icon"
              />
            </div>
            <FormControl
              id="start"
              placeholder="Start"
              className="input-w-text number-input start"
              onChange={(e) => onChangeInput(e.target.value, updateSource)}
            />
          </InputGroup>
        </div>
        <div>
          <InputGroup>
            <div className="input-icon">
              <FontAwesomeIcon
                id="random"
                icon={faSearch}
                className="icon"
              />
            </div>
            <FormControl
              id="search"
              placeholder="Search Value"
              className="input-w-text number-input search"
              onChange={(e) => onChangeInput(e.target.value, updateDest)}
            />
          </InputGroup>
        </div>
      </div>
      <span className="error">
        { error }
      </span>
    </div>
  );
};

export default createTools;
