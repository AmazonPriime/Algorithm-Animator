import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-bootstrap/Modal';
import About from './About';
import Contact from './Contact';
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

  handleShow(content) {
    let modalContent;
    if (content === 'about') {
      modalContent = <About onClose={() => this.handleClose()} />;
    } else if (content === 'contact') {
      modalContent = <Contact onClose={() => this.handleClose()} />;
    }
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
          onClick={() => this.handleShow('about')}
        >
          About
        </button>
        <button
          type="button"
          className="link"
          onClick={() => this.handleShow('contact')}
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
        <Modal
          size="lg"
          show={modalShow}
          onHide={() => this.handleClose()}
        >
          { modalContent }
        </Modal>
      </div>
    );
  }
}

export default Header;
