import { render, cleanup, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import config from '../../constant/config';
import Header from '../Header';

afterEach(() => {
  cleanup();
});

test('check that the header element gets rendered', () => {
  const { container } = render(<Header />);
  const getById = queryByAttribute.bind(null, 'id');
  const footerElement = getById(container, 'header');
  expect(footerElement).toBeInTheDocument();
});

test('has correct link for the source code', () => {
  const { container } = render(<Header />);
  const getById = queryByAttribute.bind(null, 'id');
  const anchorElement = getById(container, 'sourceCode');
  expect(anchorElement).toHaveAttribute('href', config.sourceCode);
});

test('check that clicking on the moon icon changes state', () => {
  const { container } = render(<Header />);
  const getById = queryByAttribute.bind(null, 'id');
  const darkModeButton = getById(container, 'darkModeBtn');
  userEvent.click(darkModeButton);
  expect(darkModeButton).toHaveClass('selected');
});

test('check that clicking on the sun icon changes state', () => {
  const { container } = render(<Header />);
  const getById = queryByAttribute.bind(null, 'id');
  const lightModeButton = getById(container, 'lightModeBtn');
  userEvent.click(lightModeButton);
  expect(lightModeButton).toHaveClass('selected');
});

// TODO: write tests for about and contact buttons
