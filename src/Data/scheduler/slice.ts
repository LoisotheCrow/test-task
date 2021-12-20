import { createSlice } from '@reduxjs/toolkit';

export interface SchedulerState {
  lastUpdate: number | null,
  loading: boolean,
  success: boolean,
  error: string | null,
  schedule: number | null,
}

export const initialState: SchedulerState = {
  loading: false,
  lastUpdate: null,
  error: null,
  success: false,
  schedule: null,
};

export const schedulerSlice = createSlice({
  name: 'scheduler',
  initialState,
  reducers: {
    requestUpdate(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    update(state, { payload }) {
      state.success = true;
      state.loading = false;
      state.error = null;
      state.lastUpdate = Date.now();
      state.schedule = payload;
    },
    fail(state, { payload }) {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    clear(state) {
      state.loading = initialState.loading;
      state.lastUpdate = initialState.lastUpdate;
      state.error = initialState.error;
      state.success = initialState.success;
      state.schedule = initialState.schedule;
    },
  },
});
