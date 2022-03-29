import { render, cleanup, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import config from '../../constant/config';
import Guide from '../Guide';

test('check that the Guide element gets rendered', () => {
  const { container } = render(<Guide />);
  const getById = queryByAttribute.bind(null, 'id');
  const guideModal = getById(container, 'guide');
  expect(guideModal).toBeInTheDocument();
});
