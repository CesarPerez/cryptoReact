import { render, screen, waitFor } from '@testing-library/react';
import Crypto from './Crypto';

import axiosMock from 'axios';

const fakeCrypto = {
  ethereum: {
    eur: 1000,
  },
};

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

test('Should be loading if we are waiting the api', () => {
  jest.spyOn(global.console, 'error');
  render(<Crypto />);
  const elem = screen.getByTestId('loading');
  expect(elem).toBeInTheDocument();
});

test('Should be able to show the value of the crypto', async () => {
  axiosMock.get.mockResolvedValueOnce({ data: fakeCrypto });
  render(<Crypto name="ethereum" />);
  const elem = await waitFor(() => screen.findByTestId('resolved'));
  expect(elem).toBeInTheDocument();
  expect(elem).toHaveTextContent('1 ethereum1000 eur');
  expect(axiosMock.get).toHaveBeenCalledTimes(1);
});
