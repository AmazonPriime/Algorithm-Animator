import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './AlgInfo.css';

const algInfo = (props) => {
  const { algorithm } = props;
  const { name, description } = algorithm;
  return (
    <div id="about">
      <Modal.Header closeButton>
        { name }
      </Modal.Header>
      <Modal.Body>
        { description }
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
