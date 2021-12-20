import { getQuote } from '../../API/alphaVantage';
import { QuoteErrors } from '../../API/parsers';
import { QuoteStore } from '../store';

export const quoteActions = {
  async fetchData(ticker: string) {
    if (!ticker) {
      QuoteStore.fail(QuoteErrors.nosymbol);
      return;
    }

    QuoteStore.requestData();

    try {
      const data = await getQuote(ticker)

      QuoteStore.receiveData(data);
    } catch (e) {
      const msg = (e as Error).message;
      QuoteStore.fail((QuoteErrors as Record<string, string>)[msg] || QuoteErrors.strange);
    }
  },
  clear() {
    QuoteStore.clear();
  },
};
