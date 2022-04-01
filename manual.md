# Algorithm Animator
![prod workflow](https://github.com/AmazonPriime/Algorithm-Animator/actions/workflows/prod.yml/badge.svg)
![dev workflow](https://github.com/AmazonPriime/Algorithm-Animator/actions/workflows/develop.yml/badge.svg)
![all workflow](https://github.com/AmazonPriime/Algorithm-Animator/actions/workflows/all.yml/badge.svg)

University of Glasgow Level 4 Individual Project: Algorithm Animator.

The project's deployed site can be accessed [here](https://amazonpriime.github.io/indproj).
* Hosted on Github pages @ `https://amazonpriime.github.io/indproj`
* Development version @ `https://amazonpriime.github.io/indproj-dev`

### Setup Website
**Pre-requisite**: [Node.js](https://nodejs.org/) required to run the website
1. Clone the project repository
    * run command `git clone https://github.com/AmazonPriime/Algorithm-Animator`
2. Install dependencies
    * run command `npm i` or `yarn`*
3. Run the project locally
    * run command `npm run start` or `yarn start`*
    * if the browser doesn't open automatically navigate to [`http://localhost:3000`](http://localhost:3000)
4. [OPTIONAL] Lint project code
    * run command `npm run lint` or `yarn lint`*
5. [OPTIONAL] Test project code
    * run command `npm run test` or `yarn test`*
6. [OPTIONAL] Build static version of the website
    * run command `npm run build` or `yarn build`*

**installation of [Yarn Package Manager](https://yarnpkg.com/) is required*

### Adding Algorithm
To add an algorithm first create a JavaScript and copy in the template below.
* The description string supports the use of [markdown syntax](https://www.markdownguide.org/cheat-sheet/)
* Preset graphs as formatted as [adjacency matrices](https://www.geeksforgeeks.org/graph-and-its-representations/)
* Creating the pseudocode you can encapsulate differnt sections with `{{0}} {{/0}}`
   * This allows for them to be highlighted during animation as a section number can be provided to a step
```JavaScript
import { createStep } from '../util/util';

export default {
  name: '',
  weighted: false,
  notDirectional: false,
  presets: [
    {
      name: '5 Nodes',
      matrix: [
        [0, 1, 0, 0, 0], // eslint-disable-line
        [0, 0, 1, 0, 0], // eslint-disable-line
        [0, 0, 0, 1, 0], // eslint-disable-line
        [0, 0, 0, 0, 1], // eslint-disable-line
        [1, 0, 0, 0, 0], // eslint-disable-line
      ],
    },
  ],
  description: ``,
  pseudocode: ``,
  algorithm: (graph, source, dest, directed) => {
    const steps = []; // list to store each 'step' of the algorithm
    //
    // algorithm goes here
    // create steps using the createStep() function
    //
    return steps;
  },
};
```

### Technologies
* Node.js
    * JavaScript runtime environment that allows you run JavaScript code outside of the web browser
    * https://nodejs.org/
* React.js
    * Front-end JavaScript library for building user interfaces
    * https://reactjs.org/
* ESLint - *AirBnB* style
    * Static code analysis tool for identifying issues in JavaScript code, can be configured with a set of rules that the code being analysed must follow
    * https://eslint.org/
* Jest via `testing-library/react`
    * JavaScript testing framework which is designed with simplicity in mind and to make tests easier to write
    * https://jestjs.io/
* GitHub Actions
    * Allows automation of software workflows and makes it easy to setup a CI/CD pipeline all from GitHub directly
    * https://github.com/features/actions
* GitHub Pages
    * Free static site hosting service which is hosted directly from a GitHub repository
    * https://pages.github.com/
