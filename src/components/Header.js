import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-bootstrap/Modal';
import config from '../constant/config';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
      modalContent: '',
      modalShow: false,
    };
  }

  handleClose() {
    this.setState({ modalShow: false });
  }

  handleShow(modalContent) {
    this.setState({
      modalShow: true,
      modalContent,
    });
  }

  render() {
    const { darkMode, modalShow, modalContent } = this.state;
    return (
      <div className="header" id="header">
        <span className="title">Algorithm Animator</span>
        <button
          type="button"
          className="link"
          onClick={() => this.handleShow(<p>about modal</p>)}
        >
          About
        </button>
        <button
          type="button"
          className="link"
          onClick={() => this.handleShow(<p>contact modal</p>)}
        >
          Contact
        </button>
        <a
          className="link"
          href={config.sourceCode}
          target="__blank"
          rel="noopener noreferrer"
          id="sourceCode"
        >
          Source
        </a>
        <span data-tip data-for="notFunctional" className="mode-icons">
          <FontAwesomeIcon
            className={darkMode ? 'selected icon' : 'icon'}
            icon={faMoon}
            onClick={() => this.setState({ darkMode: true })}
            id="darkModeBtn"
          />
          <FontAwesomeIcon
            className={darkMode ? 'icon' : 'selected icon'}
            icon={faSun}
            onClick={() => this.setState({ darkMode: false })}
            id="lightModeBtn"
          />
        </span>
        <ReactTooltip id="notFunctional" effect="solid">
          Feature in development
        </ReactTooltip>
        <Modal show={modalShow} onHide={() => this.handleClose()}>
          { modalContent }
        </Modal>
      </div>
    );
  }
}

export default Header;
