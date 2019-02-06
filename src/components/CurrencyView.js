import React from 'react';

import CurrencyInputText from './CurrencyInputText';
import CurrencySelectList from './CurrencySelectList';

import '../styles/CurrencyView.css';

export default class CurrencyView extends React.Component {
  render() {
    return(
      <div className="currency-container">
        <CurrencyInputText 
          name={this.props.name}
          value={this.props.value}
          handleChange={this.props.handleChange} 
        />
        <CurrencySelectList 
          listName={this.props.listName}
          currencies={this.props.currencies}
          selectedCurrency={this.props.selectedCurrency}
          currencySelectEvent={this.props.currencySelectEvent}
        />
      </div>
    );
  }
}