import React from 'react';
import './Footer.css';

const footer = () => (
  <div className="footer" data-testid="footer">
    <a
      className="developer"
      href="https://github.com/AmazonPriime"
      target="__blank"
      rel="noopener noreferrer"
    >
      Luke Holland
    </a>
    { ' ' }
    <span className="year">
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
      href="https://github.com/AmazonPriime/Algorithm-Animator"
      target="__blank"
      rel="noopener noreferrer"
    >
      Source Code
    </a>
  </div>
);

export default footer;
