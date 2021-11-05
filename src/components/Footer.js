import React from 'react';
import config from '../constant/config';
import './Footer.css';

const footer = () => (
  <div className="footer" id="footer">
    <a
      className="developer"
      href={ config.developerUrl }
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
    <button type="button" className="link">About</button>
    { ' ' }
    <button type="button" className="link">Contact</button>
    { ' ' }
    <a
      className="link"
      href={ config.sourceCode }
      target="__blank"
      rel="noopener noreferrer"
      id="sourceCode"
    >
      Source Code
    </a>
  </div>
);

export default footer;
