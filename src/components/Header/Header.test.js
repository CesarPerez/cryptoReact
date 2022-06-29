import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import Header from './Header';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

test.skip('Should show the header elems if auth', () => {
  render(
    <Provider store={store}>
      <Header />
    </Provider>,
  );
});

test.skip('Should be able to logout', () => {});
test.skip('Should  be able to show routes based on a json', () => {});
