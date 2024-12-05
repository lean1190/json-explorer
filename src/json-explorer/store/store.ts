import { configureStore } from '@reduxjs/toolkit';
import pathReducer from './path-slice';

export const store = configureStore({
  reducer: {
    paths: pathReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
