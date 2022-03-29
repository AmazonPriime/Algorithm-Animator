import { render, cleanup, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import config from '../../constant/config';
import CodeViewer from '../CodeViewer';

afterEach(() => {
  cleanup();
});

test('check that the codeViewer element gets rendered', () => {
  const { container } = render(<CodeViewer />);
  const getById = queryByAttribute.bind(null, 'id');
  const codeViewerModal = getById(container, 'codeviewer');
  expect(codeViewerModal).toBeInTheDocument();
});
