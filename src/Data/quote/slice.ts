import { createSlice } from '@reduxjs/toolkit';
import { Quote } from '../../API/parsers';

export interface QuoteState {
  loading: boolean,
  data: Quote,
  error: string | null,
  success: boolean,
}

export const initialState: QuoteState = {
  loading: false,
  data: {} as Quote,
  error: null,
  success: false,
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    requestData(state) {
      state.loading = true;
      state.data = {} as Quote;
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
      state.data = {} as Quote;
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