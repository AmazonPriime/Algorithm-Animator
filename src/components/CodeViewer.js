import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import './CodeViewer.css';

const codeViewer = (props) => {
  const [expanded, setExpanded] = useState(false);
  const { code } = props;

  return (
    <div className={expanded ? 'code-container expanded' : 'code-container'}>
      <pre>
        {code}
      </pre>
      <div className="toggle">
        <FontAwesomeIcon
          icon={faCaretDown}
          onClick={() => setExpanded(!expanded)}
          className="code-icon"
        />
      </div>
    </div>
  );
};

codeViewer.defaultProps = {
  code: '',
};

export default codeViewer;

// <div id="codeContainer" className="code-container">
//   <div id="code" className="code">
//     <pre>{ code }</pre>
//   </div>
// </div>
