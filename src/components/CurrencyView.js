import React from 'react';

import CurrencyInputText from './CurrencyInputText';
import CurrencySelectList from './CurrencySelectList';

import '../styles/CurrencyView.css';

export default class CurrencyView extends React.Component {
  render() {
    return(
      <div className="currency-container">
        <h2>CurrencyView({this.props.v})</h2>
        <CurrencyInputText />
        <CurrencySelectList />
      </div>
    );
  }
}