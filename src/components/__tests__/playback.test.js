import { render, cleanup, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import config from '../../constant/config';
import Playback from '../Playback';

test('check that the Playback element gets rendered', () => {
  const { container } = render(<Playback />);
  const getById = queryByAttribute.bind(null, 'id');
  const playbackModal = getById(container, 'playback');
  expect(playbackModal).toBeInTheDocument();
});
