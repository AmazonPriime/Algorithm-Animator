import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import MarkdownIt from 'markdown-it';
import './AlgInfo.css';

const algInfo = (props) => {
  const { algorithm } = props;
  const { name, description } = algorithm;
  const md = new MarkdownIt();
  return (
    <div id="about">
      <Modal.Header closeButton>
        { name }
      </Modal.Header>
      <Modal.Body>
        {/* eslint-disable-next-line */}
        <div dangerouslySetInnerHTML={{ __html: md.render(description) }} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          id="closeButton"
          className="button"
          onClick={() => props.onClose()}
        >
          Close
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default algInfo;
