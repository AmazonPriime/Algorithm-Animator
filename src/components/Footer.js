import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
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
          onClick={() => this.handleShow(<p>about modal</p>)}
        >
          About
        </button>
        { ' ' }
        <button
          type="button"
          className="link"
          onClick={() => this.handleShow(<p>contact modal</p>)}
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
        <Modal show={modalShow} onHide={() => this.handleClose()}>
          { modalContent }
        </Modal>
      </div>
    );
  }
}

export default Footer;
