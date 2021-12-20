import { createSlice } from '@reduxjs/toolkit';

import { Timeline } from '../../API/parsers';

export interface TimelineState {
  loading: boolean,
  data: Timeline,
  error: string | null,
  success: boolean,
}

export const initialState: TimelineState = {
  loading: false,
  data: [] as Timeline,
  error: null,
  success: false,
};

export const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    requestData(state) {
      state.loading = true;
      state.data = [] as Timeline;
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
      state.data = [] as Timeline;
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