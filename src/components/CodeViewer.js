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

const renderLog = (log) => log.map((msg) => (
  <span>
    {`>> ${msg}`}
  </span>
));

const changeTab = (e, tabName) => {
  const evt = e;
  // Get all elements with class='tabcontent' and hide them
  const tabcontent = document.getElementsByClassName('tabcontent');
  for (let i = 0; i < tabcontent.length; i += 1) {
    tabcontent[i].style.display = 'none';
  }

  // Get all elements with class='tablinks' and remove the class 'active'
  const tablinks = document.getElementsByClassName('tablinks');
  for (let i = 0; i < tablinks.length; i += 1) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  // Show the current tab, and add an 'active' class to the button that opened the tab
  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.className += ' active';
};

const codeViewer = (props) => {
  const [expanded, setExpanded] = useState(false);
  const {
    code,
    codeSection,
    log,
  } = props;

  const parsedCode = parseCodeSections(code);
  const logMessages = log && log.length > 0 ? renderLog(log) : '';

  return (
    <div className={expanded ? 'code-container-expanded expanded' : 'code-container'}>
      <div className="tab">
        <button type="button" className="tablinks active" onClick={(e) => changeTab(e, 'pseudo')}>Pseudo</button>
        <button type="button" className="tablinks" onClick={(e) => changeTab(e, 'log')}>Log</button>
      </div>

      <div id="pseudo" className="tabcontent">
        <pre>
          <code>
            {renderCode(parsedCode, codeSection)}
          </code>
        </pre>
      </div>

      <div id="log" className="tabcontent">
        <pre>
          <code>
            {logMessages}
          </code>
        </pre>
      </div>

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
