import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import config from '../constant/config';
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
      <div className="header" id="header">
        <span className="title">Algorithm Animator</span>
        <button type="button" className="link">About</button>
        <button type="button" className="link">Contact</button>
        <a
          className="link"
          href={config.sourceCode}
          target="__blank"
          rel="noopener noreferrer"
          id="sourceCode"
        >
          Source
        </a>
        <span data-tip data-for="notFunctional" className="mode-icons">
          <FontAwesomeIcon
            className={darkMode ? 'selected icon' : 'icon'}
            icon={faMoon}
            onClick={() => this.setState({ darkMode: true })}
            id="darkModeBtn"
          />
          <FontAwesomeIcon
            className={darkMode ? 'icon' : 'selected icon'}
            icon={faSun}
            onClick={() => this.setState({ darkMode: false })}
            id="lightModeBtn"
          />
        </span>
        <ReactTooltip id="notFunctional" effect="solid">
          Feature in development
        </ReactTooltip>
      </div>
    );
  }
}

export default Header;
