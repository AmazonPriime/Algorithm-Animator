import { render, cleanup, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import config from '../../constant/config';
import CreateTools from '../CreateTools';

afterEach(() => {
  cleanup();
});

test('check that the codeViewer element gets rendered', () => {
  const { container } = render(<CreateTools />);
  const getById = queryByAttribute.bind(null, 'id');
  const createToolsModal = getById(container, 'tools');
  expect(createToolsModal).toBeInTheDocument();
});
