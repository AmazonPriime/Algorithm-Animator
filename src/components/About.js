import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import config from '../constant/config';
import './About.css';

const about = (props) => (
  <div id="about">
    <Modal.Header closeButton>
      <span className="heading">
        Algorithm Animator
      </span>
    </Modal.Header>
    <Modal.Body>
      <div className="section">
        <span className="title">University Project</span>
        This project was completed as a Level 4 Individual Project which is a course
        at the University of Glasgow which all Computer Science and Software Engineering
        students are required to take in their 4th year of studies.
      </div>
      <div className="section">
        <span className="title">Motivation</span>
        The motivation behind this website is help people who are in the process of
        learning algorithms. The website will help students as it allows them to
        animate and walk through the algorithm visually which often can make it easier
        to learn and to gain a better understanding of a particular algorithm.
      </div>
      <div className="section">
        <span className="title">Contribute</span>
        Since the website is an open source project, any can contribute to the codebase.
        If you&apos;d like to contribute you can head to the source code linked below, if you
        think an alogirithm is missing or want to fix a bug (or even just report them)
        then you can check out the repository on GitHub!
        <br />
        <a
          className="link"
          href={config.sourceCode}
          target="__blank"
          rel="noopener noreferrer"
        >
          Algorithm Animator Repository
        </a>
      </div>
      <div className="section">
        <span className="title">Developer</span>
        My name is Luke Holland and I&apos;m a 4th year student at the University
        of Glasgow studying towards an BSc in Software Engineering.
        <div className="socials">
          <a
            className="plainLink"
            href={config.developerUrl}
            target="__blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            className="plainLink"
            href={config.linkedin}
            target="__blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            className="plainLink"
            href={config.developerWebsite}
            target="__blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faAt} />
          </a>
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button
        className="button"
        onClick={() => props.onClose()}
      >
        Close
      </Button>
    </Modal.Footer>
  </div>
);

export default about;
