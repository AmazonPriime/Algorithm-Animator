import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
    const { currentAlgorithm, algorithms, algorithmObj } = this.props;

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
};

AlgorithmSelector.defaultProps = {
  currentAlgorithm: '',
  algorithms: [],
  selectAlgorithm: () => {},
  algorithmObj: null,
};

export default AlgorithmSelector;
