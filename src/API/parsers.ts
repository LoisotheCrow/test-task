export interface Quote {
  price: string,
  change: string,
  changePercentage: string,
}

export const parseQuote = (quote: any): Quote => {
  const price = quote['05. price'];
  const change = quote['09. change'];
  const changePercentage = quote['10. change percent'];

  const changeSign = change.slice(0, 1);
  const changeNeg = changeSign === '-';
  const changeOffset = changeNeg ? 1 : 0;
  const sign = changeNeg ? '-' : '+';

  return {
    price: `$${price.slice(0, price.length - 2)}`,
    change: `${sign}$${change.slice(changeOffset, change.length - 2)}`,
    changePercentage: `${sign}${changePercentage.slice(changeOffset, changePercentage.length - 3)}%`,
  }
}

export interface TickerData {
  name: string,
  symbol: string,
  exchange: string,
  type: string,
  sector: string,
  industry: string,
  target: string,
  marketCap: string,
  eps: string,
  pe: string,
  beta: string,
  yearHiLo: string,
  revenueGrowth: string,
}

export const parseTicker = (ticker: any): TickerData => {
  return {
    name: ticker['Name'],
    symbol: ticker['Symbol'],
    exchange: ticker['Exchange'],
    type: ticker['AssetType'],
    sector: ticker['Sector'],
    industry: ticker['Industry'],
    target: ticker['AnalystTargetPrice'],
    marketCap: ticker['MarketCapitalization'],
    eps: ticker['EPS'],
    pe: ticker['PERatio'],
    beta: ticker['Beta'],
    yearHiLo: `$${ticker['52WeekHigh']}/$${ticker['52WeekLow']}`,
    revenueGrowth: ticker['QuarterlyRevenueGrowthYOY']
  }
}

export interface TimelinePoint {
  date: string,
  open: string,
  high: string,
  low: string,
  close: string,
  volume: string,
}

export type Timeline = Array<TimelinePoint>;

export const parseTimeline = (timeline: any): Timeline => {
  const offsetString = timeline.slice(33, timeline.length);

  const points = offsetString.split('\r\n');

  const parsedPoints = points.map((point: string): TimelinePoint => {
    const values = point.split(',');
    return {
      date: values[0],
      open: values[1],
      high: values[2],
      low: values[3],
      close: values[4],
      volume: values[5],
    };
  })

  return parsedPoints;
}

export const QuoteErrors = {
  badApi: 'Looks like the last API call failed. You can try again:',
  noticker: 'Doesn\'t look like this quote exists. Maybe you want to look at another one?',
  nosymbol: 'Looks like the last API call failed. You can try again:',
  strange: 'Something went wrong, but we\'re not sure what. Maybe this time will be luckier?',
};
