import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDice,
  faMapMarkerAlt,
  faSearch,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import config from '../constant/config';
import './CreateTools.css';

const createTools = () => {
  const [error, setError] = useState('');
  const [startValue, setStartValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const ensureInteger = (v) => v.replace(/[^\d]+/, '');

  const onChangeInput = (value, setFunc) => {
    const newValue = ensureInteger(value);
    setFunc(newValue);
    setError(newValue > 10 ? config.invalidNodeError : '');
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
        <Button
          id="addEdge"
          className="button"
        >
          + Edge
        </Button>
        <Button
          id="presets"
          className="button"
        >
          Presets
          { ' ' }
          <FontAwesomeIcon
            icon={faCaretDown}
            className="icon"
          />
        </Button>
        <Button
          id="random"
          className="button"
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
              value={startValue}
              onChange={(e) => onChangeInput(e.target.value, setStartValue)}
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
              value={searchValue}
              onChange={(e) => onChangeInput(e.target.value, setSearchValue)}
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
