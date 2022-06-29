import authSlice, { authActions } from './auth';

test('should return the initial state', () => {
  expect(authSlice.reducer(undefined, {})).toEqual({ isAuth: false });
});

test('Should be able to login', () => {
  const previousState = { isAuth: false };
  expect(authSlice.reducer(previousState, authActions.login())).toEqual({
    isAuth: true,
  });
});

test('Should be able to logout', () => {
  let previousState = { isAuth: true };
  expect(authSlice.reducer(previousState, authActions.logout())).toEqual({
    isAuth: false,
  });
  previousState = { isAuth: false };
  expect(authSlice.reducer(previousState, authActions.logout())).toEqual({
    isAuth: false,
  });
});
