import React from 'react';
import { useSelector } from 'react-redux';
import { CombinedReducerState } from '../Data/store';

export interface UpdateTimerProps {
  returnToSearch: () => void,
}

export const UpdateTimer = (props: UpdateTimerProps) => {
  const scheduler = useSelector((store: CombinedReducerState) => store.scheduler);

  const { loading, lastUpdate } = scheduler

  return (
    <div className="scheduler scheduler__container">
      <span className="scheduler scheduler__container">
        {(loading || !lastUpdate) && 'Performing update...'}
        {(!loading && lastUpdate) && `Data from ${new Date(lastUpdate).toLocaleTimeString()}`}
      </span>
      <h4 className="scheduler scheduler__back" onClick={props.returnToSearch}>
        Return to search
      </h4>
    </div>
  )
}