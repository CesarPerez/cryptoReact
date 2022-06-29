import { createSlice } from '@reduxjs/toolkit';

const initialState = { level: '', msg: '', active: false };

const notifSlice = createSlice({
  name: 'notif',
  initialState,
  reducers: {
    warning(state, action) {
      state.level = 'warning';
      state.msg = action.payload;
      state.active = true;
    },
    error(state, action) {
      state.level = 'error';
      state.msg = action.payload;
      state.active = true;
    },
    success(state, action) {
      state.level = 'success';
      state.msg = action.payload;
      state.active = true;
    },
    clear(state) {
      state.level = '';
      state.msg = '';
      state.active = false;
    },
  },
});

export const notifActions = notifSlice.actions;

export default notifSlice;
