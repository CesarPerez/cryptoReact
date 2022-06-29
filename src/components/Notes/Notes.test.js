import { findByText, render, screen, waitFor } from '@testing-library/react';
import Notes from './Notes';
import userEvent from '@testing-library/user-event';
import { Provider, useDispatch } from 'react-redux';
import store from '../../store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

test.skip('Should show one note by default', async () => {
  render(
    <Provider store={store}>
      <Notes />
    </Provider>,
  );
  const items = screen.getAllByTestId(/elem/);
  expect(items.length).toEqual(1);
});

test('Should be able to add new notes if input elem not empty', async () => {
  const mockedDispatch = jest.fn();
  useDispatch.mockReturnValue(mockedDispatch);
  render(
    <Provider store={store}>
      <Notes />
    </Provider>,
  );
  const input = screen.getByTestId('noteinput');
  userEvent.type(input, 'sisar');
  const buttonAdd = screen.getByText('Add note');
  userEvent.click(buttonAdd);
  const items = screen.getAllByTestId(/elem/);
  expect(items.length).toEqual(2); //by default there are one element
});

test.skip('Should be able to remove all notes', async () => {
  const mockedDispatch = jest.requireActual('react-redux').useDispatch;
  useDispatch.mockReturnValue(mockedDispatch);
  render(
    <Provider store={store}>
      <Notes />
    </Provider>,
  );
  const buttonRemoveAll = screen.getByText('Remove all notes');
  userEvent.click(buttonRemoveAll);
  const msg = await screen.findByText(/There are no notes/);
  expect(msg).toBeInTheDocument(msg);
});
