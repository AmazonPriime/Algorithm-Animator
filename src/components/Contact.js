import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import config from '../constant/config';
import './Contact.css';

const emailRegex = new RegExp('^(([^<>()[\\]\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$', 'i');
const validateFirstname = (firstname) => firstname.length >= 3;
const validateSurname = (surname) => surname.length >= 3;
const validateEmail = (email) => emailRegex.test(email);
const validateContent = (content) => content.length >= config.contactChars;

const postForm = async (firstname, surname, email, content) => {
  const requestOptions = {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: JSON.stringify({
      firstname,
      surname,
      email,
      content,
    }),
  };
  const resp = await fetch(config.formspreeEndpoint, requestOptions)
    .then((response) => response.json());
  return resp.ok;
};

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      firstnameMessage: '',
      surname: '',
      surnameMessage: '',
      email: '',
      emailMessage: '',
      content: '',
      contentMessage: '',
      submitMessage: '',
      failedPost: false,
      loading: false,
    };
  }

  async handleSubmit(e, firstname, surname, email, content) {
    e.preventDefault();
    this.setState({ loading: true });
    if (this.validateForm(firstname, surname, email, content)) {
      const formPosted = await postForm(firstname, surname, email, content);
      this.setState({
        submitMessage: formPosted ? 'Message has been submitted!' : 'Unable to submit message.',
        emailMessage: '',
        contentMessage: '',
        failedPost: !formPosted,
      });
    } else {
      this.setState({ submitMessage: 'Errors in the form above.' });
    }
    this.setState({ loading: false });
  }

  onFirstnameChange(value) {
    const firstnameValid = validateFirstname(value);
    this.setState({
      firstname: value,
      firstnameMessage: !firstnameValid ? 'First name must be at least 3 characters' : '',
      submitMessage: !firstnameValid ? 'Errors in the form above.' : '',
    });
  }

  onSurnameChange(value) {
    const surnameValid = validateSurname(value);
    this.setState({
      surname: value,
      surnameMessage: !surnameValid ? 'Surname must be at least 3 characters' : '',
      submitMessage: !surnameValid ? 'Errors in the form above.' : '',
    });
  }

  onEmailChange(value) {
    const emailValid = validateEmail(value);
    this.setState({
      email: value,
      emailMessage: !emailValid ? 'Email must be in form \'name@example.com\'' : '',
      submitMessage: !emailValid ? 'Errors in the form above.' : '',
    });
  }

  onContentChange(value) {
    const contentValid = validateContent(value);
    this.setState({
      content: value,
      contentMessage: !contentValid ? `Requires at least ${config.contactChars} characters` : '',
      submitMessage: !contentValid ? 'Errors in the form above.' : '',
    });
  }

  validateForm(firstname, surname, email, content) {
    const firstnameValid = validateFirstname(firstname);
    const surnameValid = validateSurname(surname);
    const emailValid = validateEmail(email);
    const contentValid = validateContent(content);
    this.setState({
      firstnameMessage: !firstnameValid ? 'First name must be at least 3 characters' : '',
      surnameMessage: !surnameValid ? 'Surname must be at least 3 characters' : '',
      emailMessage: !emailValid ? 'Email must be in form \'name@example.com\'' : '',
      contentMessage: !contentValid ? `Requires at least ${config.contactChars} characters` : '',
    });
    return emailValid && contentValid;
  }

  render() {
    const {
      firstname,
      firstnameMessage,
      surname,
      surnameMessage,
      email,
      emailMessage,
      content,
      contentMessage,
      submitMessage,
      failedPost,
      loading,
    } = this.state;

    const { onClose } = this.props;

    const success = !(firstnameMessage || surnameMessage || emailMessage || contentMessage);

    return (
      <div id="contact">
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
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>First name</Form.Label>
                <Form.Control onChange={(e) => this.onFirstnameChange(e.target.value)} />
                <span className="error">{ firstnameMessage }</span>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Surname</Form.Label>
                <Form.Control onChange={(e) => this.onSurnameChange(e.target.value)} />
                <span className="error">{ surnameMessage }</span>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e) => this.onEmailChange(e.target.value)}
              />
              <span className="error">{ emailMessage }</span>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => this.onContentChange(e.target.value)}
              />
              <span className="error">{ contentMessage }</span>
            </Form.Group>
            <div className="submit-container">
              <Button
                className="button submit"
                type="submit"
                onClick={(e) => this.handleSubmit(e, firstname, surname, email, content)}
              >
                { loading ? 'Loading...' : 'Submit' }
              </Button>
              <div className="statusMessage">
                <span className={success && !failedPost ? 'success' : 'error'}>{ submitMessage }</span>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="button"
            onClick={() => onClose()}
          >
            Close
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

About.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default About;
