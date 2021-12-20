import { getData } from '../../API/alphaVantage';
import { QuoteErrors } from '../../API/parsers';
import { TickerStore } from '../store';

export const tickerActions = {
  async fetchData(ticker: string) {
    if (!ticker) {
      TickerStore.fail(QuoteErrors.nosymbol);
      return;
    }

    TickerStore.requestData();

    try {
      const data = await getData(ticker);

      TickerStore.receiveData(data);
    } catch (e) {
      const msg = (e as Error).message;
      TickerStore.fail((QuoteErrors as Record<string, string>)[msg] || QuoteErrors.strange);
    }
  },
  clear() {
    TickerStore.clear();
  },
};
