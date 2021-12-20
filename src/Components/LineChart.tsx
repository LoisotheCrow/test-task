import { ChartDataset } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import { Timeline } from '../API/parsers';

export interface LineChartProps {
  data: Timeline,
}

export interface LineData {
  labels: Array<string>,
  datasets: Array<ChartDataset<'line'>>, 
}

export const LineChart = (props: LineChartProps) => {
  const [data, setData] = useState<LineData>({} as LineData);

  useEffect(() => {
    if (!props.data || props.data.length <= 0) {
      setData({} as LineData)
    }

    setData({
      labels: props.data.map(point => point.date.split(' ')[0]),
      datasets: [{
        label: 'Price',
        data: props.data.map(point => parseFloat(point.close)),
        fill: false,
        borderColor: '#f27011',
        backgroundColor: '#f27011',
      }],
    });
  }, [props.data]);

  if (Object.keys(data).length <= 0) {
    return null;
  }

  return (
    <Line
      style={{ marginBottom: '1rem', marginTop: '1rem' }}
      options={{
        responsive: true,
        plugins: { title: { display: false }, legend: { display: false } },
        interaction: { mode: 'nearest' },
        scales: {
          x: {
            ticks: {
              callback: function(val, index) {
                return index % 8 === 0 ? data.labels[index] : '';
              },
              color: 'white',
            }
          }
        }
      }}
      data={data}
    />
  );
}
