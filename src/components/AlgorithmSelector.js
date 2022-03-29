import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './AlgorithmSelector.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faInfo } from '@fortawesome/free-solid-svg-icons';
import AlgInfo from './AlgInfo';

class AlgorithmSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
    };
  }

  handleClose() {
    this.setState({ modalShow: false });
  }

  handleShow() {
    this.setState({ modalShow: true });
  }

  renderItems(items) {
    const { currentAlgorithm, selectAlgorithm } = this.props;

    return items.map((item, i) => (
      <Dropdown.Item
        className="selector-item"
        onClick={() => selectAlgorithm(i)}
        active={item === currentAlgorithm}
      >
        { item }
      </Dropdown.Item>
    ));
  }

  render() {
    const { modalShow } = this.state;
    const {
      currentAlgorithm,
      algorithms,
      algorithmObj,
      directed,
      setDirected,
    } = this.props;

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
            { this.renderItems(algorithms) }
          </Dropdown.Menu>
        </Dropdown>
        <Button
          id="info"
          className="button"
          onClick={() => this.handleShow()}
        >
          <FontAwesomeIcon
            icon={faInfo}
          />
        </Button>
        <br />
        <Form.Group
          className="checkbox"
          controlId="formBasicCheckbox"
        >
          <Form.Check
            type="checkbox"
            label="directed"
            checked={directed}
            disabled={algorithmObj ? algorithmObj.notDirectional : false}
            onClick={() => setDirected(!directed)}
          />
        </Form.Group>
        <Modal
          size="lg"
          show={modalShow}
          onHide={() => this.handleClose()}
        >
          <AlgInfo
            algorithm={algorithmObj}
            onClose={() => this.handleClose()}
          />
        </Modal>
      </div>
    );
  }
}

AlgorithmSelector.propTypes = {
  currentAlgorithm: PropTypes.string,
  selectAlgorithm: PropTypes.func,
  algorithms: PropTypes.arrayOf(PropTypes.object),
  algorithmObj: PropTypes.objectOf(PropTypes.object),
  directed: PropTypes.bool,
  setDirected: PropTypes.func,
};

AlgorithmSelector.defaultProps = {
  currentAlgorithm: '',
  algorithms: [],
  selectAlgorithm: () => {},
  directed: false,
  setDirected: () => {},
  algorithmObj: null,
};

export default AlgorithmSelector;
