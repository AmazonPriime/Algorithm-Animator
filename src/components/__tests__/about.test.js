import { render, cleanup, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import config from '../../constant/config';
import About from '../About';

afterEach(() => {
  cleanup();
});

test('check that the about element gets rendered', () => {
  const spy = jest.fn();
  const { container } = render(<About onClose={spy} />);
  const getById = queryByAttribute.bind(null, 'id');
  const aboutModal = getById(container, 'about');
  expect(aboutModal).toBeInTheDocument();
});

test('check that the onClose prop is called on close button press', () => {
  const spy = jest.fn();
  const { container } = render(<About onClose={spy} />);
  const getById = queryByAttribute.bind(null, 'id');
  const closeButton = getById(container, 'closeButton');
  userEvent.click(closeButton);
  expect(spy).toHaveBeenCalled();
});

test('has correct link to source code', () => {
  const spy = jest.fn();
  const { container } = render(<About onClose={spy} />);
  const getById = queryByAttribute.bind(null, 'id');
  const sourceCode = getById(container, 'sourceCode');
  expect(sourceCode).toHaveAttribute('href', config.sourceCode);
});

test('has correct link to github', () => {
  const spy = jest.fn();
  const { container } = render(<About onClose={spy} />);
  const getById = queryByAttribute.bind(null, 'id');
  const github = getById(container, 'github');
  expect(github).toHaveAttribute('href', config.developerUrl);
});

test('has correct link to linkedin', () => {
  const spy = jest.fn();
  const { container } = render(<About onClose={spy} />);
  const getById = queryByAttribute.bind(null, 'id');
  const linkedin = getById(container, 'linkedin');
  expect(linkedin).toHaveAttribute('href', config.linkedin);
});

test('has correct link to developer website', () => {
  const spy = jest.fn();
  const { container } = render(<About onClose={spy} />);
  const getById = queryByAttribute.bind(null, 'id');
  const website = getById(container, 'website');
  expect(website).toHaveAttribute('href', config.developerWebsite);
});

test('check that the project section appears', () => {
  const spy = jest.fn();
  const { container } = render(<About onClose={spy} />);
  const getById = queryByAttribute.bind(null, 'id');
  const project = getById(container, 'project');
  expect(project).toBeInTheDocument();
});

test('check that the motivation section appears', () => {
  const spy = jest.fn();
  const { container } = render(<About onClose={spy} />);
  const getById = queryByAttribute.bind(null, 'id');
  const motivation = getById(container, 'motivation');
  expect(motivation).toBeInTheDocument();
});

test('check that the contribute section appears', () => {
  const spy = jest.fn();
  const { container } = render(<About onClose={spy} />);
  const getById = queryByAttribute.bind(null, 'id');
  const contribute = getById(container, 'contribute');
  expect(contribute).toBeInTheDocument();
});

test('check that the developer section appears', () => {
  const spy = jest.fn();
  const { container } = render(<About onClose={spy} />);
  const getById = queryByAttribute.bind(null, 'id');
  const developer = getById(container, 'developer');
  expect(developer).toBeInTheDocument();
});
