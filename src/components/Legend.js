import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import config from '../constant/config';
import './Legend.css';

const renderLegend = (legends) => legends.map((legend) => (
  <span className="legend-item">
    •
    <span style={{ color: legend.colour }}>
      {` ${legend.name}`}
    </span>
  </span>
));

const legend = () => {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className={expanded ? 'legend-container expanded' : 'legend-container'}>
      <button
        className="legend-title"
        onClick={() => setExpanded(!expanded)}
        type="button"
      >
        Legend
        { ' ' }
        <FontAwesomeIcon
          icon={faCaretDown}
          className="caret-down"
        />
      </button>
      {renderLegend(config.legendDicts)}
    </div>
  );
};

export default legend;
