import counterSlice, { counterActions } from './counter';

test('should return the initial state', () => {
  expect(counterSlice.reducer(undefined, {})).toEqual({ counter: 1 });
});

test('Shoudld be able to add and remove elems', () => {
  expect(counterSlice.reducer({ counter: 2 }, counterActions.increment())).toEqual({ counter: 3 });
  expect(counterSlice.reducer({ counter: 2 }, counterActions.remove())).toEqual({ counter: 1 });
});

test('Should be able to clear all elements', () => {
  expect(counterSlice.reducer({ counter: 5 }, counterActions.clear())).toEqual({ counter: 0 });
});
