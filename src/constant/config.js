module.exports = {
  developerUrl: 'https://github.com/AmazonPriime',
  developerWebsite: 'https://amazonpriime.github.io/',
  sourceCode: 'https://github.com/AmazonPriime/Algorithm-Animator',
  linkedin: 'https://www.linkedin.com/in/luke-holland-/',
  minCharMessage: 'Requires at least {min} characters',
  contactFormSuccess: 'Message has been submitted!',
  contactFormFailure: 'Unable to submit message.',
  contactFormError: 'Errors in the form above.',
  emailMessage: 'Must be in the form \'name@example.com\'',
  formspreeEndpoint: 'https://formspree.io/f/xgerjqba',
  invalidNodeError: 'Invalid node, graph only contains {numNodes} nodes!',
  invalidNodeValue: 'Invalid node ID provided, must be a number!',
  speeds: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3],
  contentChars: 10,
  firstnameChars: 2,
  surnameChars: 2,
  defaultMatrixSize: 7,
  legendDicts: [
    { name: 'Current', colour: '--color-current' },
    { name: 'Visited', colour: '--color-visited' },
    { name: 'Previous', colour: '--color-previous' },
    { name: 'Path', colour: '--color-path' },
    { name: 'Source', colour: '--color-source' },
    { name: 'Target', colour: '--color-target' },
    { name: 'Cost', colour: '--color-cost' },
  ],
  graphStyles: [
    {
      selector: 'node',
      style: {
        backgroundColor: 'white',
        backgroundOpacity: 0,
        borderWidth: 1,
        height: '1.75em',
        width: '1.75em',
        content: 'data(label)',
        color: 'black',
        textValign: 'center',
        fontSize: '0.7em',
        fontWeight: '200',
      },
    },
    {
      selector: 'edge',
      style: {
        width: 2,
        lineColor: 'black',
        label: 'data(label)',
        textRotation: 'autorotate',
        fontSize: '0.7em',
        textOutlineOpacity: 1,
        textOutlineColor: 'black',
        textOutlineWidth: 1,
        textMarginY: '0',
        fontWeight: 'bold',
        color: 'white',
        targetArrowColor: 'black',
      },
    },
    {
      selector: 'node:parent',
      style: {
        textValign: 'bottom',
        textHalign: 'center',
        borderWidth: 0,
        content: 'data(label)',
        fontSize: '0.4em',
        fontWeight: 'bold',
        color: 'red',
        padding: 0,
        textMarginY: -10,
      },
    },
  ],
  graphLayout: {
    name: 'cose-bilkent',
    idealEdgeLength: 150,
    nodeRepulsion: 7000,
  },
};
