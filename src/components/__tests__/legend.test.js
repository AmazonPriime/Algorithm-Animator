import { render, cleanup, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import config from '../../constant/config';
import Legend from '../Legend';

test('check that the Legend element gets rendered', () => {
  const { container } = render(<Legend />);
  const getById = queryByAttribute.bind(null, 'id');
  const legendModal = getById(container, 'legend');
  expect(legendModal).toBeInTheDocument();
});
