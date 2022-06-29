import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import store from '../../store';
import Login from './Login';

jest.mock('react-router-dom');

test('Should be empty by default', () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>,
  );
  const name = screen.getByLabelText(/Name/);
  const pass = screen.getByLabelText(/Pass/);
  expect(name).toBeEmptyDOMElement();
  expect(pass).toBeEmptyDOMElement();
});

test('Should be able to log when credentials are ok', async () => {
  const mockedNav = jest.fn();
  useNavigate.mockReturnValue(mockedNav);
  render(
    <Provider store={store}>
      <Login />
    </Provider>,
  );
  userEvent.type(screen.getByLabelText(/Name/), 'cesar');
  userEvent.type(screen.getByLabelText(/Pass/), 'password');
  userEvent.click(screen.getByRole('button'));
  await waitFor(() => {
    expect(mockedNav).toHaveBeenCalledTimes(1);
  });
});

test('Should not be able to log when credentials are not ok', async () => {
  const mockedNav = jest.fn();
  useNavigate.mockReturnValue(mockedNav);
  render(
    <Provider store={store}>
      <Login />
    </Provider>,
  );
  userEvent.type(screen.getByLabelText(/Name/), 'fake');
  userEvent.type(screen.getByLabelText(/Pass/), 'passMal');
  userEvent.click(screen.getByRole('button'));
  await waitFor(() => {
    expect(mockedNav).toHaveBeenCalledTimes(0);
  });
});

test('Should show an error when the name is homer', () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>,
  );
  userEvent.type(screen.getByLabelText(/Name/), 'Homer');
  let txtError = screen.getByText(/Lo siento, tu no homer/);
  expect(txtError).toBeInTheDocument();
});
