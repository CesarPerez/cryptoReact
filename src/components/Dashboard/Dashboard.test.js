import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import Dashboard from './Dashboard';
import renderer from 'react-test-renderer'; // ES6

test('Should show a button and a counter', () => {
  render(
    <Provider store={store}>
      <Dashboard />
    </Provider>,
  );
  const butt = screen.getByText('Add randomly');
  const txt = screen.getByTestId('msg');
  expect(butt).toBeInTheDocument();
  expect(txt).toBeInTheDocument();
});

test('Should match snapshot', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Dashboard />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
