import { render, cleanup, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import config from '../../constant/config';
import AlgInfo from '../AlgInfo';

afterEach(() => {
  cleanup();
});

test('check that the algInfo element gets rendered', () => {
  const algorithm = {
    name: 'name',
    description: 'description',
  }
  const { container } = render(<AlgInfo algorithm={algorithm} />);
  const getById = queryByAttribute.bind(null, 'id');
  const algInfoModal = getById(container, 'about');
  expect(algInfoModal).toBeInTheDocument();
});
