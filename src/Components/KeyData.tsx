import React from 'react';
import { TickerData } from '../API/parsers';
import { DataField } from './DataField';

const nameStrings: Record<string, string> = {
  exchange: 'Echange',
  sector: 'Sector',
  industry: 'Industry',
  target: '1 Year Target',
  marketCap: 'Market Capitalization',
  eps: 'Earnings Per Share (EPS)',
  pe: 'P/E Ratio',
  beta: 'Beta',
  yearHiLo: '52 Week High/Low',
  revenueGrowth: 'Quarterly Revenue Growth YOY',
}

export interface KeyDataProps {
  data: TickerData,
}

export const KeyData = (props: KeyDataProps) => (
  <div className="key-data key-data__container">
    <h2 className="key-data key-data__header">Key Data</h2>
    <div className="key-data key-data__inner">
      {Object.keys(nameStrings).map(key => {
        const value = (props.data as Record<string, any>)[key];
        const nameString = nameStrings[key];

        return <DataField name={nameString} value={value} key={key} />
      })}
    </div>
  </div>
)