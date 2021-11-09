import { render, cleanup, queryByAttribute } from '@testing-library/react';
import config from '../../constant/config';
import Contact from '../Contact';

afterEach(() => {
  cleanup();
});

test('check that the about element gets rendered', () => {
  const { container } = render(<Contact onClose={() => {}} />);
  const getById = queryByAttribute.bind(null, 'id');
  const footerElement = getById(container, 'contact');
  expect(footerElement).toBeInTheDocument();
});
