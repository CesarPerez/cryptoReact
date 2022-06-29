import { renderHook } from '@testing-library/react-hooks';
import useCoingecko from './useCoingecko';

import axiosMock from 'axios';

const fakeCrypto = {
  bitcoin: {
    eur: 5000,
  },
};

test('Should be able to get data with valid params', async () => {
  axiosMock.get.mockResolvedValueOnce({ data: fakeCrypto });
  const { result, waitForNextUpdate } = renderHook(() => useCoingecko({ name: 'bitcoin', currency: 'eur' }));
  await waitForNextUpdate();
  expect(result.current.loading).toBe(false);
  expect(result.current.value).toBe(5000);
});

test('Should be an error if there is an error calling to the api', async () => {
  axiosMock.get.mockImplementation(() => {
    throw new Error();
  });
  console.error = jest.fn();
  const { result } = renderHook(() => useCoingecko({ name: 'bitcoin', currency: 'eur' }));
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith('Error calling the api');
  expect(result.current.loading).toBe(false);
});
