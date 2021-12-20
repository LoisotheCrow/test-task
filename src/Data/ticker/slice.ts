import { createSlice } from '@reduxjs/toolkit';
import { TickerData } from '../../API/parsers';

export interface TickerState {
  loading: boolean,
  data: TickerData,
  error: string | null,
  success: boolean,
}

export const initialState: TickerState = {
  loading: false,
  data: {} as TickerData,
  error: null,
  success: false,
};

export const tickerSlice = createSlice({
  name: 'ticker',
  initialState,
  reducers: {
    requestData(state) {
      state.loading = true;
      state.data = {} as TickerData;
      state.error = null;
      state.success = false;
    },
    receiveData(state, { payload }) {
      state.loading = false;
      state.data = payload;
      state.error = null;
      state.success = true;
    },
    fail(state, { payload }) {
      state.loading = false;
      state.data = {} as TickerData;
      state.error = payload;
      state.success = false;
    },
    clear(state) {
      state.loading = initialState.loading;
      state.data = initialState.data;
      state.error = initialState.error;
      state.success = initialState.success;
    },
  },
});
