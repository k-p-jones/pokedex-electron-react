import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

test('it renders correctly', () => {
  const { container } = render(<LoadingSpinner />);
  expect(container).toMatchSnapshot();
});
