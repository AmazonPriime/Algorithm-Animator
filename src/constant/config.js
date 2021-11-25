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
  speeds: [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0],
  contentChars: 10,
  firstnameChars: 2,
  surnameChars: 2,
  defaultMatrixSize: 7,
  graphStyles: [
    {
      selector: 'node',
      style: {
        backgroundColor: 'white',
        borderWidth: 1,
        height: '1.25em',
        width: '1.25em',
        label: 'data(id)',
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
        textMarginY: '-0.7em',
        fontWeight: '200',
      },
    },
  ],
  graphLayout: {
    name: 'cose-bilkent',
    idealEdgeLength: 100,
    nodeRepulsion: 1000,
  },
};
