import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Guide.css';

const guide = (props) => (
    <div id="about">
      <Modal.Header closeButton>
        Guide
      </Modal.Header>
      <Modal.Body>
        Guide content will go here!
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
);

export default guide;
