import notifSlice, { notifActions } from './notif';

test('Should be able to set status with payload text', () => {
  expect(notifSlice.reducer(undefined, {})).toEqual({ level: '', msg: '', active: false });
  const fakeMsg = 'fakeMsg';
  expect(notifSlice.reducer(undefined, notifActions.success(fakeMsg))).toEqual({
    level: 'success',
    msg: fakeMsg,
    active: true,
  });
  expect(notifSlice.reducer(undefined, notifActions.warning(fakeMsg))).toEqual({
    level: 'warning',
    msg: fakeMsg,
    active: true,
  });
  expect(notifSlice.reducer(undefined, notifActions.error(fakeMsg))).toEqual({
    level: 'error',
    msg: fakeMsg,
    active: true,
  });
});

test('Should be able to clear status', () => {
  expect(notifSlice.reducer(undefined, notifActions.clear())).toEqual({
    level: '',
    msg: '',
    active: false,
  });
});
