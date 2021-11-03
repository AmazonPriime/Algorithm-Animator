import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
    };
  }

  render() {
    const { darkMode } = this.state;
    return (
      <div className="header">
        <span className="title">Algorithm Animator</span>
        <button type="button" className="link">About</button>
        <button type="button" className="link">Contact</button>
        <a
          className="link"
          href="https://github.com/AmazonPriime/Algorithm-Animator"
          target="__blank"
          rel="noopener noreferrer"
        >
          Source
        </a>
        <span className="mode-icons">
          <FontAwesomeIcon className={darkMode ? 'selected icon' : 'icon'} icon={faMoon} />
          <FontAwesomeIcon className={darkMode ? 'icon' : 'selected icon'} icon={faSun} />
        </span>
      </div>
    );
  }
}

export default Header;
