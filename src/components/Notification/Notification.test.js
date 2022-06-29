import { render, screen, waitFor } from '@testing-library/react';
import Notification from './Notification';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from '../../store';
import React from 'react';
import { notifActions } from '../../store/reducers/notif';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const dummyTxt = 'Sisar';

beforeEach(() => {
  useSelector.mockImplementation(callback => {
    return callback({ notif: { active: true, msg: dummyTxt, level: 'success' } });
  });
});
afterEach(() => {
  useSelector.mockClear();
});

test('Should show an alert if active with the level and msg', () => {
  render(
    <Provider store={store}>
      <Notification />
    </Provider>,
  );
  const msg = screen.getByText(dummyTxt);
  expect(msg).toBeInTheDocument();
  expect(useSelector).toHaveBeenCalledTimes(1);
});

test('Should disappear the alert after some seconds', async () => {
  const mockedDispatch = jest.fn();
  useDispatch.mockReturnValue(mockedDispatch);
  render(
    <Provider store={store}>
      <Notification />
    </Provider>,
  );
  const msg = screen.getByText(dummyTxt);
  expect(msg).toBeInTheDocument();
  await waitFor(
    () => {
      expect(mockedDispatch).toHaveBeenCalledTimes(1);
    },
    { timeout: 4000 },
  );
  expect(mockedDispatch).toHaveBeenCalledWith(notifActions.clear());
});

test('Should be hidden the alert if not active', () => {
  useSelector.mockClear().mockImplementation(callback => {
    return callback({ notif: { active: '', msg: '', level: '' } });
  });
  render(
    <Provider store={store}>
      <Notification />
    </Provider>,
  );
  const msg = screen.queryByText(dummyTxt);
  expect(msg).not.toBeInTheDocument();
  expect(useSelector).toHaveBeenCalledTimes(1);
});
