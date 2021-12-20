import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { CombinedReducerState } from '../Data/store';
import { Loader } from './Loader';

export interface TickerSearchProps {
  onChange?: (value: string) => void,
  onSubmit: (value: string) => void,
  loading: boolean,
}

export const TickerSearch = (props: TickerSearchProps) => {
  const { onChange = () => {}, onSubmit, loading } = props;
  const [value, setValue] = useState('');

  const { ticker, quote } = useSelector((store: CombinedReducerState) => ({
    ticker: store.ticker,
    quote: store.quote,
  }));
  const { error: tickerError } = ticker;
  const { error: quoteError } = quote;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value: newValue } = target as HTMLInputElement

    setValue(newValue);
    onChange(newValue);
  };

  const failed = tickerError || quoteError;

  return (
    <div className="ticker ticker__container">
      <h1 className="ticker ticker__header">
        What stock are you interested in?
      </h1>
      <div className="ticker ticker__inner">
        {loading && <Loader />}
        {!loading && (
          <>
            <label htmlFor="ticker" className="ticker ticker__label">
              {failed || 'Just tell us, and we will do the rest:'}
            </label>
            <input
              disabled={loading}
              name="ticker"
              className="ticker ticker__input"
              type="text"
              placeholder="TSLA"
              autoComplete="off"
              value={value}
              onChange={handleChange}
            />
            <button
              disabled={loading || !value}
              className="ticker ticker__button"
              type="submit"
              onClick={() => onSubmit(value)}
            >
              Get data
            </button>
          </>
        )}
      </div>
    </div>
  );
};
