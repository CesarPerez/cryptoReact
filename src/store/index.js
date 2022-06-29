// import { composeWithDevTools } from "redux-devtools-extension";
import counterSlice from './reducers/counter';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './reducers/auth';
import notifSlice from './reducers/notif';

const allReducers = combineReducers({
  counter: counterSlice.reducer,
  auth: authSlice.reducer,
  notif: notifSlice.reducer,
});

export const store = configureStore({
  reducer: allReducers,
});

export default store;
