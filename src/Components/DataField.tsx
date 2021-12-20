import React from 'react';

export interface DataPoint {
  name: string,
  value: string,
}

export const DataField = (props: DataPoint) => (
  <div className="data-field data-field__container">
    <h4 className="data-field data-field__name">
      {props.name}
    </h4>
    <span className="data-field data-field__value">
      {props.value}
    </span>
  </div>
)