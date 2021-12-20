import { QuoteErrors } from '../../API/parsers';
import { quoteActions } from '../quote/actions';
import { SchedulerStore } from '../store';
import { tickerActions } from '../ticker/actions';
import { timelineActions } from '../timeline/actions';

export const schedulerActions = {
  async update(ticker: string) {
    if (!ticker) {
      SchedulerStore.fail(QuoteErrors.nosymbol);
      return;
    }

    SchedulerStore.requestUpdate();

    try {
      await tickerActions.fetchData(ticker);
      await timelineActions.fetchData(ticker);
      await quoteActions.fetchData(ticker);

      SchedulerStore.update(setTimeout(() => this.update(ticker), 60000));
    } catch (e) {
      SchedulerStore.fail('schedule');
    }
  },
  setScheduler(ticker: string) {
    SchedulerStore.update(setTimeout(() => this.update(ticker), 60000));
  },
  clear() {
    SchedulerStore.clear();
  }
};