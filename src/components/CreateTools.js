import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDice,
  faMapMarkerAlt,
  faSearch,
  faCaretDown,
  faSync,
  faWeightHanging,
} from '@fortawesome/free-solid-svg-icons';
import { randomMatix } from '../util/util';
import config from '../constant/config';
import './CreateTools.css';
import Guide from './Guide';

const ensureInteger = (v) => v.replace(/[^\d]+/, '');

class CreateTools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      error: '',
      maxNodes: null,
    };
  }

  handleClose() {
    this.setState({ modalShow: false });
  }

  handleShow() {
    this.setState({ modalShow: true });
  }

  onChangeInput(value, setFunc, ignoreCheck = false) {
    const { numNodes } = this.props;
    const newValue = ensureInteger(value);
    setFunc(newValue);
    let error = '';
    if (!ignoreCheck) {
      error = newValue >= numNodes ? config.invalidNodeError.replace('{numNodes}', numNodes) : '';
    } else {
      error = newValue === 0 ? config.invalidRandNodeError : '';
    }
    this.setState({ error });
  }

  genRandomMatix() {
    const { maxNodes } = this.state;
    const { setUpdated, updateMatrix } = this.props;
    let matrix;
    if (maxNodes > 0) {
      matrix = randomMatix(maxNodes);
    } else {
      matrix = randomMatix();
    }
    setUpdated();
    updateMatrix(matrix);
  }

  updatePreset(i) {
    const { setUpdated, selectPreset } = this.props;
    setUpdated();
    selectPreset(i);
  }

  renderPresetItems() {
    const { presets, currentPreset } = this.props;
    return presets.map((v, i) => (
      <Dropdown.Item
        className="selector-item"
        onClick={() => this.updatePreset(i)}
        active={v === currentPreset}
      >
        {v}
      </Dropdown.Item>
    ));
  }

  render() {
    const { maxNodes, error, modalShow } = this.state;
    const {
      source,
      dest,
      updateSource,
      updateDest,
      setUpdated,
      weight,
      weighted,
      setWeight,
    } = this.props;

    return (
      <div id="tools" className="tools">
        <div id="topRow" className="top-row">
          <Button
            id="guide"
            className="button"
            onClick={() => this.handleShow()}
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
              { this.renderPresetItems() }
            </Dropdown.Menu>
          </Dropdown>
          <Button
            id="random"
            className="button"
            onClick={() => this.genRandomMatix()}
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
            onChange={
              (e) => this.onChangeInput(
                e.target.value,
                (v) => this.setState({ maxNodes: v }),
                true,
              )
            }
          />
        </div>
        <div id="bottomRow" className="bottom-row">
          <div>
            <InputGroup>
              <div className="input-icon">
                <FontAwesomeIcon
                  id="sourceIcon"
                  icon={faMapMarkerAlt}
                  className="icon"
                />
              </div>
              <FormControl
                id="start"
                className="input-w-text number-input start"
                value={source}
                onChange={(e) => this.onChangeInput(e.target.value, updateSource)}
              />
            </InputGroup>
          </div>
          <div>
            <InputGroup>
              <div className="input-icon">
                <FontAwesomeIcon
                  id="searchIcon"
                  icon={faSearch}
                  className="icon"
                />
              </div>
              <FormControl
                id="search"
                className="input-w-text number-input search"
                value={dest}
                onChange={(e) => this.onChangeInput(e.target.value, updateDest)}
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
          <div>
            <InputGroup className={weighted ? '' : 'input-disabled'}>
              <div className="input-icon">
                <FontAwesomeIcon
                  id="weightIcon"
                  icon={faWeightHanging}
                  className="icon"
                />
              </div>
              <FormControl
                id="weight"
                className="input-w-text number-input weight"
                value={weight}
                onChange={(e) => this.onChangeInput(e.target.value, setWeight, true)}
                readOnly={!weighted}
              />
            </InputGroup>
          </div>
        </div>
        <span className="error">
          { error }
        </span>
        <Modal
          size="lg"
          show={modalShow}
          onHide={() => this.handleClose()}
        >
          <Guide onClose={() => this.handleClose()} />
        </Modal>
      </div>
    );
  }
}

CreateTools.propTypes = {
  updateMatrix: PropTypes.func,
  updateSource: PropTypes.func,
  updateDest: PropTypes.func,
  setUpdated: PropTypes.func,
  setWeight: PropTypes.func,
  selectPreset: PropTypes.func,
  presets: PropTypes.arrayOf(PropTypes.object),
  numNodes: PropTypes.number,
  source: PropTypes.number,
  dest: PropTypes.number,
  weight: PropTypes.number,
  weighted: PropTypes.bool,
  currentPreset: PropTypes.string,
};

CreateTools.defaultProps = {
  updateMatrix: () => {},
  updateSource: () => {},
  updateDest: () => {},
  setUpdated: () => {},
  setWeight: () => {},
  selectPreset: () => {},
  presets: [],
  numNodes: 0,
  source: 0,
  dest: 0,
  weight: 1,
  weighted: false,
  currentPreset: '',
};

export default CreateTools;
