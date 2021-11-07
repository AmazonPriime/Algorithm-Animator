import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Contact.css';

const about = () => (
  <div>
    <Modal.Header closeButton>
      <span className="heading">
        Contact
      </span>
    </Modal.Header>
    <Modal.Body>
      <span className="info">
        Use the form below to send me an message, this can be anything about the website
        a suggestion, bug report or anything else you can think of.
      </span>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary">Close</Button>
    </Modal.Footer>
  </div>
);

export default about;
