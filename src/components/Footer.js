import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import About from './About';
import Contact from './Contact';
import config from '../constant/config';
import './Footer.css';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalContent: '',
      modalShow: false,
    };
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
    const { modalShow, modalContent } = this.state;
    return (
      <div className="footer" id="footer">
        <a
          className="developer"
          href={config.developerUrl}
          target="__blank"
          rel="noopener noreferrer"
          id="developer"
        >
          Luke Holland
        </a>
        { ' ' }
        <span className="year" id="year">
          2021-
          { new Date().getFullYear() }
        </span>
        { ' ' }
        <button
          type="button"
          className="link"
          onClick={() => this.handleShow('about')}
        >
          About
        </button>
        { ' ' }
        <button
          type="button"
          className="link"
          onClick={() => this.handleShow('contact')}
        >
          Contact
        </button>
        { ' ' }
        <a
          className="link"
          href={config.sourceCode}
          target="__blank"
          rel="noopener noreferrer"
          id="sourceCode"
        >
          Source Code
        </a>
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

export default Footer;
