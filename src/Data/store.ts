import {
  bindActionCreators,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { tickerSlice } from './ticker/slice';
import { quoteSlice } from './quote/slice';
import { timelineSlice } from './timeline/slice';
import { schedulerSlice } from './scheduler/slice';

export type RootActions = any
export type Dispatch = typeof store.dispatch
export type CombinedReducerState = ReturnType<typeof combinedReducer>

const combinedReducer = combineReducers({
  ticker: persistReducer({ key: 'ticker', storage }, tickerSlice.reducer),
  quote: persistReducer({ key: 'quote', storage }, quoteSlice.reducer),
  scheduler: persistReducer({ key: 'scheduler', storage }, schedulerSlice.reducer),
  timeline: timelineSlice.reducer,
});

export const store = configureStore({
  reducer: combinedReducer,
});

export const TickerStore = bindActionCreators(
  tickerSlice.actions,
  store.dispatch,
);
export const QuoteStore = bindActionCreators(
  quoteSlice.actions,
  store.dispatch,
);
export const TimelineStore = bindActionCreators(
  timelineSlice.actions,
  store.dispatch,
);
export const SchedulerStore = bindActionCreators(
  schedulerSlice.actions,
  store.dispatch,
);
