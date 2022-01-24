import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { parseCodeSections } from '../util/util';
import './CodeViewer.css';

const renderCode = (sections, codeSecNum) => sections.map((sec) => (
  <span className={sec.sectNum === codeSecNum ? 'highlighed' : ''}>
    {sec.code}
  </span>
));

const codeViewer = (props) => {
  const [expanded, setExpanded] = useState(false);
  const {
    code,
    codeSection,
  } = props;

  const parsedCode = parseCodeSections(code);

  return (
    <div className={expanded ? 'code-container expanded' : 'code-container'}>
      <pre>
        <code>
          {renderCode(parsedCode, codeSection)}
        </code>
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
  codeSection: -1,
};

export default codeViewer;
