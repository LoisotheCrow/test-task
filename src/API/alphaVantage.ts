import axios, { AxiosRequestConfig } from 'axios';
import { parseQuote, parseTicker, parseTimeline, Quote, TickerData, Timeline } from './parsers';

const apiUrl = 'https://www.alphavantage.co/';
const apiKey = 'HNAZMIBDBQE41C5P';

const errors = {
  badApi: 'badApi',
  badRequest: 'badRequest',
  nosymbol: 'nosymbol',
};

const requestAPI = async (method: string, params: Record<string, string | number>) => {
  const query = `query?${new URLSearchParams({
    function: method,
    ...params,
    apikey: apiKey,
  })}`;
  const config = {
    method: 'get',
    url: `${apiUrl}${query}`,
  } as AxiosRequestConfig;

  let response = null;

  try {
    response = await axios.request(config);
  } catch (e) {
    throw new Error(errors.badApi);
  }

  if (!response.data || response.data['Error Message']) {
    throw new Error(errors.badRequest);
  }

  return response;
};

export const getData = async (ticker: string): Promise<TickerData> => {
  const data = await requestAPI('OVERVIEW', { symbol: ticker });

  const { data: symbolMetaData } = data;

  if (Object.keys(symbolMetaData).length <= 0) {
    throw new Error(errors.nosymbol);
  }

  return parseTicker(symbolMetaData);
};

export const getQuote = async (ticker: string): Promise<Quote> => {
  const data = await requestAPI('GLOBAL_QUOTE', { symbol: ticker });

  const { data: quoteData } = data;

  if (!quoteData || !quoteData['Global Quote']) {
    throw new Error(errors.nosymbol);
  }

  return parseQuote(quoteData['Global Quote']);
}

export const getTimeline = async (ticker: string): Promise<Timeline> => {
  const data = await requestAPI('TIME_SERIES_INTRADAY_EXTENDED', {
    symbol: ticker,
    interval: '30min',
    slice: 'year1month1',
  });

  const { data: timelineData } = data;

  if (!timelineData || timelineData.length <= 32) {
    throw new Error(errors.nosymbol);
  }

  return parseTimeline(timelineData);
}
