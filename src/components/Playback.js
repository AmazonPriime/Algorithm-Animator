import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import config from '../constant/config';
import 'rc-slider/assets/index.css';
import './Playback.css';

const playback = (props) => {
  const { curSpeed } = props;
  const [speed, setSpeed] = useState(curSpeed);

  const onChange = (value) => setSpeed(parseFloat(value));

  const renderSpeedOptions = () => config.speeds.map((s) => (
    <Dropdown.Item
      onClick={() => setSpeed(s)}
      active={s === speed}
    >
      { s.toFixed(2) }
      x
    </Dropdown.Item>
  ));

  return (
    <div id="playback" className="playback">
      <Button
        id="stepBack"
        className="button"
      >
        <FontAwesomeIcon
          icon={faCaretLeft}
        />
        { ' ' }
        step
      </Button>
      <Button
        id="playPause"
        className="button"
      >
        play
      </Button>
      <Button
        id="stepForward"
        className="button"
      >
        step
        { ' ' }
        <FontAwesomeIcon
          icon={faCaretRight}
        />
      </Button>
      <div id="speedControl" className="speed-control">
        <input
          type="range"
          min="0.1"
          max="2"
          step="0.05"
          value={speed}
          onChange={(e) => onChange(e.target.value)}
        />
        <Dropdown className="speed-dropdown">
          <Dropdown.Toggle className="speed-toggle-btn">
            { speed.toFixed(2) }
            { 'x ' }
            <FontAwesomeIcon
              icon={faCaretDown}
            />
          </Dropdown.Toggle>
          <Dropdown.Menu className="speed-dropdown-menu">
            { renderSpeedOptions() }
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

playback.defaultProps = {
  curSpeed: 1.0,
};

export default playback;
