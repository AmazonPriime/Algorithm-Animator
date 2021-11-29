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
  faSync,
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
    source,
    dest,
    presets,
    selectPreset,
    currentPreset,
  } = props;

  const [maxNodes, setMaxNodes] = useState();

  const onChangeInput = (value, setFunc, setValueFunc = () => {}, isNodes = false) => {
    const newValue = ensureInteger(value);
    setFunc(newValue);
    setValueFunc(newValue);
    if (!isNodes) {
      return setError(newValue >= numNodes ? config.invalidNodeError.replace('{numNodes}', numNodes) : '');
    }
    return setError(newValue === 0 ? config.invalidRandNodeError : '');
  };

  const genRandomMatix = () => {
    let matrix;
    if (maxNodes > 0) {
      matrix = randomMatix(maxNodes);
    } else {
      matrix = randomMatix();
    }
    setUpdated();
    updateMatrix(matrix);
  };

  const updatePreset = (i) => {
    setUpdated();
    selectPreset(i);
  };

  const renderPresetItems = () => presets.map((v, i) => (
    <Dropdown.Item
      className="selector-item"
      onClick={() => updatePreset(i)}
      active={v === currentPreset}
    >
      {v}
    </Dropdown.Item>
  ));

  return (
    <div id="tools" className="tools">
      <div id="topRow" className="top-row">
        <Button
          id="guide"
          className="button"
        >
          Guide
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
            { renderPresetItems() }
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
        <FormControl
          id="nodeCount"
          placeholder="#nodes"
          className="input-w-text number-input num-nodes"
          value={maxNodes}
          onChange={(e) => onChangeInput(e.target.value, () => {}, setMaxNodes, true)}
        />
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
              value={source}
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
              placeholder="Search"
              className="input-w-text number-input search"
              value={dest}
              onChange={(e) => onChangeInput(e.target.value, updateDest)}
            />
          </InputGroup>
        </div>
        <div>
          <Button
            id="refresh"
            className="button refresh"
            onClick={() => setUpdated()}
          >
            <FontAwesomeIcon
              icon={faSync}
            />
          </Button>
        </div>
      </div>
      <span className="error">
        { error }
      </span>
    </div>
  );
};

export default createTools;
