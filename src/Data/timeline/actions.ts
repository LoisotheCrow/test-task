import { getTimeline } from '../../API/alphaVantage';
import { QuoteErrors } from '../../API/parsers';
import { schedulerActions } from '../scheduler/actions';
import { TimelineStore } from '../store';

export const timelineActions = {
  async fetchData(ticker: string) {
    if (!ticker) {
      TimelineStore.fail(QuoteErrors.nosymbol);
      return;
    }

    TimelineStore.requestData();

    try {
      const data = await getTimeline(ticker);

      TimelineStore.receiveData(data);

      schedulerActions.setScheduler(ticker);
    } catch (e) {
      const msg = (e as Error).message;
      TimelineStore.fail((QuoteErrors as Record<string, string>)[msg] || QuoteErrors.strange);
    }
  },
  clear() {
    TimelineStore.clear();
  },
};