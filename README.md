# Algorithm Animator
![prod workflow](https://github.com/AmazonPriime/Algorithm-Animator/actions/workflows/prod.yml/badge.svg)
![dev workflow](https://github.com/AmazonPriime/Algorithm-Animator/actions/workflows/develop.yml/badge.svg)
![all workflow](https://github.com/AmazonPriime/Algorithm-Animator/actions/workflows/all.yml/badge.svg)

University of Glasgow Level 4 Individual Project: Algorithm Animator.

The project's deployed site can be accessed [here](https://amazonpriime.github.io/indproj).
* Hosted on Github pages @ `https://amazonpriime.github.io/indproj`
* Development version @ `https://amazonpriime.github.io/indproj-dev`

### Motivation for Algorithm Animator
The motivation behind the project is to aid learning of algorithms by providing and intuitive way to create and visualise particular algorithms. Playback and custom inputs should allow for a much more effective learning experience for those looking to see how algorithms work and gain a greater understanding to the innerworkings of many popular algorithms.

### Aim of Algorithm Animator
The main aim of the project is to build a system which can be used to animate/visualise the steps of particular algorithms. Such algorithms might include text compression, graph-based, list sorting etc.

Initially the project will focus on the animation of graph based algorithms, however, particular attention will be made during development such that extension of the platform to include other types of algorithm will not to be too difficult.

Some MVP features for the project include; playback features (play/pause/step/speed controls), visualisation

### Features (✓ *done* | ✘ *not done*)
* MVP Features
    * (✘) Playback Controls
      * (✘) play
      * (✘) pause
      * (✘) step forward
      * (✘) step backwards
      * (✘) speed multiplier
    * (✘) Code Animation
    * (✘) Pre-defined Inputs
    * (✘) Custom UI Input
      * (✘) add nodes
      * (✘) edit nodes
      * (✘) add edges
      * (✘) delete edges
    * (✘) Randomised Input
* Extra Features
    * (✘) Custom File Imports
    * (✘) Algorithm Details
      * (✘) general explanation
      * (✘) time complexity explanation
    * (✘) Animation of Additional Languages
      * (✘) python
      * (✘) java
    * (✘) Other Algorithms
      * (✘) sorting

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
