import React from 'react';
import './CodeViewer.css';

const codeViewer = (props) => {
  const { code } = props;
  console.log(code);

  return <div />;
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
