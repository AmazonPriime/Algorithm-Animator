import { render, cleanup, queryByAttribute } from '@testing-library/react';
import config from '../../constant/config';
import Footer from '../Footer';

afterEach(() => {
  cleanup();
});

test('check that the footer element gets rendered', () => {
  const { container } = render(<Footer />);
  const getById = queryByAttribute.bind(null, 'id');
  const footerElement = getById(container, 'footer');
  expect(footerElement).toBeInTheDocument();
});

test('has correct link for developer homepage', () => {
  const { container } = render(<Footer />);
  const getById = queryByAttribute.bind(null, 'id');
  const anchorElement = getById(container, 'developer');
  expect(anchorElement).toHaveAttribute('href', config.developerUrl);
});

test('start to current year displays correctly', () => {
  const { container } = render(<Footer />);
  const getById = queryByAttribute.bind(null, 'id');
  const spanElement = getById(container, 'year');
  expect(spanElement).toHaveTextContent(`2021-${new Date().getFullYear()}`);
});

test('has correct link for the source code', () => {
  const { container } = render(<Footer />);
  const getById = queryByAttribute.bind(null, 'id');
  const anchorElement = getById(container, 'sourceCode');
  expect(anchorElement).toHaveAttribute('href', config.sourceCode);
});

// TODO: write tests for about and contact buttons
