import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { TickerSearch } from './Components/TickerSearch';
import './styles.css';
import { CombinedReducerState } from './Data/store';
import { DataOverview } from './Components/DataOverview';
import { tickerActions } from './Data/ticker/actions';
import { quoteActions } from './Data/quote/actions';
import { schedulerActions } from './Data/scheduler/actions';
import { timelineActions } from './Data/timeline/actions';

export default () => {
  const [shouldDisplayData, setShouldDisplayData] = useState(false);
  const { ticker, quote, scheduler } = useSelector((store: CombinedReducerState) => ({
    ticker: store.ticker,
    quote: store.quote,
    scheduler: store.scheduler,
  }));

  const { success: tickerSuccess, loading: tickerLoading } = ticker;
  const { success: quoteSuccess, loading: quoteLoading } = quote;
  const { loading: schedulerLoading } = scheduler;

  const handleSubmit = (value: string) => {
    schedulerActions.clear();
    tickerActions.fetchData(value);
    quoteActions.fetchData(value);
  };

  const handleBack = () => {
    schedulerActions.clear();
    tickerActions.clear();
    quoteActions.clear();
    timelineActions.clear();
  };

  useEffect(() => {
    const allDataFetched = tickerSuccess && quoteSuccess;
    const localUpdate = schedulerLoading;
    const shouldDisplay = allDataFetched || localUpdate;
    setShouldDisplayData(shouldDisplay);
  }, [tickerSuccess, quoteSuccess, schedulerLoading]);

  return (
    <div className="App">
      {shouldDisplayData && <DataOverview backToSearch={handleBack} />}
      {!shouldDisplayData && (
        <TickerSearch onSubmit={handleSubmit} loading={tickerLoading || quoteLoading} />
      )}
    </div>
  );
};