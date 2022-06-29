import { createSlice } from '@reduxjs/toolkit';

const initialState = { counter: 1 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    clear(state) {
      state.counter = 0;
    },
    remove(state) {
      state.counter--;
    },
  },
});

export const counterActions = counterSlice.actions;

export default counterSlice;
