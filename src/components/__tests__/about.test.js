import { render, cleanup, queryByAttribute } from '@testing-library/react';
import config from '../../constant/config';
import About from '../About';

afterEach(() => {
  cleanup();
});

test('check that the about element gets rendered', () => {
  const { container } = render(<About onClose={() => {}} />);
  const getById = queryByAttribute.bind(null, 'id');
  const footerElement = getById(container, 'about');
  expect(footerElement).toBeInTheDocument();
});
