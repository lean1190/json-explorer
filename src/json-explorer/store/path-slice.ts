import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Value } from '../types';
import { isPrimitiveValue } from '../functions/type';

export type PathState = Record<string, Value | undefined>;
export type SubscribePayload = PayloadAction<{
  path: string;
  value: Value | undefined;
}>;

const initialState: PathState = {};

export const pathSlice = createSlice({
  name: 'paths',
  initialState,
  reducers: {
    subscribe: (state, action: SubscribePayload) => {
      const stringifiedValue = isPrimitiveValue(action.payload.value) ? action.payload.value : undefined;
      state[action.payload.path] = stringifiedValue;
    },
    unsubscribe: (state, action: SubscribePayload) => {
      delete state[action.payload.path];
    }
  },
})


export const { subscribe, unsubscribe } = pathSlice.actions

export default pathSlice.reducer
