import { render, cleanup, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import config from '../../constant/config';
import AlgorithmSelector from '../AlgorithmSelector';

afterEach(() => {
  cleanup();
});

test('check that the algorithmSelector element gets rendered', () => {
  const { container } = render(<AlgorithmSelector />);
  const getById = queryByAttribute.bind(null, 'id');
  const algInfoModal = getById(container, 'algorithmSelector');
  expect(algInfoModal).toBeInTheDocument();
});
