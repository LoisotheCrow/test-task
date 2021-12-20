import React from 'react'
import { UpdateTimer } from './UpdateTimer'

export interface QuoteHeaderProps {
  name: string,
  price: string,
  type: string,
  ticker: string,
  change: string,
  changePercentage: string,
  backToSearch: () => void,
}

export const QuoteHeader = (props: QuoteHeaderProps) => (
  <div className="quote-header quote-header__container">
    <div className="quote-header quote-header__left">
      <h1 className="quote-header quote-header__name">
        {props.name} ({props.ticker})
      </h1>
      <span className="quote-header quote-header__type">
        {props.type}
      </span>
    </div>
    <UpdateTimer returnToSearch={props.backToSearch} />
    <div className="quote-header quote-header__right">
      <h2 className="quote-header quote-header__price">
        {props.price}
      </h2>
      <span className="quote-header quote-header__change">
        {props.change} ({props.changePercentage})
      </span>
    </div>
  </div>
)