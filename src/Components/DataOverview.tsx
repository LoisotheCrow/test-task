import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CombinedReducerState } from '../Data/store';
import { timelineActions } from '../Data/timeline/actions';
import { KeyData } from './KeyData';
import { LineChart } from './LineChart';
import { QuoteHeader } from './QuoteHeader';

export const DataOverview = (props: { backToSearch: () => void }) => {
  const { ticker, quote, timeline } = useSelector((store: CombinedReducerState) => ({
    ticker: store.ticker,
    quote: store.quote,
    timeline: store.timeline,
  }));
  const { data: tickerData } = ticker;
  const { data: quoteData } = quote;
  const { data: timelineData } = timeline;

  useEffect(() => {
    timelineActions.fetchData(tickerData.symbol);
  }, [])

  return (
    <div className="overview overview__container">
      <QuoteHeader
        backToSearch={props.backToSearch}
        name={tickerData.name}
        type={tickerData.type}
        ticker={tickerData.symbol}
        change={quoteData.change}
        changePercentage={quoteData.changePercentage}
        price={quoteData.price}
      />
      <LineChart data={timelineData} />
      <KeyData data={tickerData} />
    </div>
  );
};
