import { render, screen } from '@testing-library/react';
import Error from './Error';

test('Should show an error by default as not exists', () => {
  render(<Error />);
  const msg = screen.getByText("This page doesn't exists");
  expect(msg).toBeInTheDocument();
});

test('Should show an error by permissions if the type is 403', () => {
  render(<Error type="403" />);
  const msg = screen.getByText('You dont have permissions to access to this page');
  expect(msg).toBeInTheDocument();
});

// test('Should ', () => {
// });
