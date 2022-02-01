import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeightHanging, faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import addingNodes from '../assets/adding_nodes.gif';
import removingNodes from '../assets/removing_nodes.gif';
import addingRemovingEdges from '../assets/adding_removing_edges.gif';
import updatingWeight from '../assets/updating_edge_weight.gif';
import config from '../constant/config';
import './Guide.css';

const guide = (props) => (
  <div id="guide" className="guide">
    <Modal.Header closeButton>
      Guide
    </Modal.Header>
    <Modal.Body>
      <p>
        Below are some snippets which explain
        how to use the website and its different features.
      </p>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Interacting with the graph</Accordion.Header>
          <Accordion.Body>
            <p>
              This section will show you all the ways
              you can interact with the graph!
            </p>

            <b>Adding nodes to the graph</b>
            <p>Double click on any empty space on the graph to add a node.</p>

            <img src={addingNodes} alt="Example of adding nodes to graph as a gif." />

            <b>Removing nodes from the graph</b>
            <p>Click and hold on any node to remove it from the graph.</p>

            <img src={removingNodes} alt="Example of removing nodes from a graph as a gif." />

            <b>Adding edges between nodes</b>
            <p>Click on one node to select as a source, then another as the target.</p>

            <img src={addingRemovingEdges} alt="Example of adding and removing edges from a graph as a gif." />
            <span style={{ display: 'block' }}>* shows adding and removing edges</span>

            <b>Removing an edge between nodes</b>
            <p>Click and hold on any edge to remove it form the graph</p>

            <b>Updating the weight of an edge</b>
            <p>
              For a weighted algorithm, choose the value in the top left
              { ' ' }
              <FontAwesomeIcon
                icon={faWeightHanging}
                className="icon"
              />
              { ' ' }
              field then double click on an edge.
            </p>

            <img src={updatingWeight} alt="Example of updating edge weight on graph as a gif." />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Graph tools</Accordion.Header>
          <Accordion.Body>
            <p>
              This section will show you what each of the buttons
              that live on the left above the graph do.
            </p>

            <b>The guide button</b>
            <p>
              This button will open up a pop-up which shows the user how
              to use different aspects of the website.
            </p>

            <b>Presets dropdown</b>
            <p>
              This dropdown provides you with some presets that are specifically
              designed for the algorithm, these could be for educational purposes
              or some might even just be cool graph designs.
            </p>

            <b>Random graph button</b>
            <p>
              This button is used to generate a random graph button it uses the input
              to its right to know how large of a graph to generate. If the input is
              left empty then the default matrix size of
              { ' ' }
              {config.defaultMatrixSize}
              { ' ' }
              is used.
            </p>

            <b>Random graph size input</b>
            <p>
              This input is used to support the random matrix button, it&apos;ll tell it
              how large of a matrix to generate. If left empty it defaults to
              { ' ' }
              {config.defaultMatrixSize}
              { ' ' }
              and has no maximum. (large graphs WILL have performance penalties)
            </p>

            <b>Source input</b>
            <p>
              This
              { ' ' }
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="icon"
              />
              { ' ' }
              input is used to specify what source node is used for the
              algorithms when you run them. The node will be highlighted according to
              the legend colour for &apos;Source&apos;.
            </p>

            <b>Target input</b>
            <p>
              This
              { ' ' }
              <FontAwesomeIcon
                icon={faSearch}
                className="icon"
              />
              { ' ' }
              input is used to specify what target node is used for the
              algorithms when you run them. The node will be highlighted according to
              the legend colour for &apos;Target&apos;. (this is generall the node
              you are searching for in the algorithm)
            </p>

            <b>Refresh layout button</b>
            <p>
              This button is used to re-run the layout algorithm which is responsible
              for choosing where to put each of the nodes in the graph such that it
              looks nice and is legible. You can use this graph if you have created
              a graph or modified one and want to re-arrange it to look better.
            </p>

            <b>Weight input</b>
            <p>
              This
              { ' ' }
              <FontAwesomeIcon
                icon={faWeightHanging}
                className="icon"
              />
              { ' ' }
              input is used when giving a updating a weight value of an edge,
              you would type in a value into the box (any positive integer &gt; 0)
              and then the edge you create or double click will be given this value.
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Playback controls</Accordion.Header>
          <Accordion.Body>
            <p>
              This section will show you what each of the buttons
              that live on the right above the graph do.
            </p>

            <b>Step backwards button</b>
            <p>
              This button can be used once you have pressed play and started the
              animation of an algorithm, it allows you to precisely step backwards
              by 1 step. This can be used to help better understand the algorithm by
              seeing each line of code being executed step by step.
            </p>

            <b>Play / pause button</b>
            <p>
              Once you click this button it&apos;ll begin the animation of your graph.
              This should be almost instant, however if you have a very large complex
              graph it might take a few momements. Upon pressing the play the algorithm begins
              and the button morphs into a pause button. When pressed again it&apos;ll stop the
              animation - but can be resumed by pressing play once more.
            </p>

            <b>Step forwards button</b>
            <p>
              This button can be used once you have pressed play and started the
              animation of an algorithm, it allows you to precisely step forwards
              by 1 step. This can be used to help better understand the algorithm by
              seeing each line of code being executed step by step.
            </p>

            <b>Speed slider</b>
            <p>
              The slider can be used to increase or decrease the speed at which
              the algorithm is running. Sliding towards the right will increase the
              speed and then to the left will decrease the speed.
            </p>

            <b>Speed dropdown</b>
            <p>
              This dropdown is linked to the slider and might be an easier way for
              you to choose a precise speed setting.
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Code viewer & logger</Accordion.Header>
          <Accordion.Body>
            <p>
              This section will show you what the box that lives inside
              of the graph is for and what the tabs mean.
            </p>

            <b>Pseudo tab</b>
            <p>
              This tab is for showing the pseudocode of an algorithm, while it is running
              an animation the block of code which is currently being executed in the animation
              is highlighted in red so you can see exactly what code is being run.
            </p>

            <b>Logging (Log) tab</b>
            <p>
              This tab is for printing out the logger messages which can let you as a user see
              exactly what is going on when the website is running. The logger will tell you what
              each step of the animation is in English. Additionally any user action - adding nodes,
              removing edges, etc. - will also be logged to the logger. This can be used to keep
              track of what you have done and what the algorithm is doing.
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Modal.Body>
    <Modal.Footer>
      <Button
        id="closeButton"
        className="button"
        onClick={() => props.onClose()}
      >
        Close
      </Button>
    </Modal.Footer>
  </div>
);

export default guide;
