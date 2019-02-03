import React from 'react';

import '../styles/CurrencyInputText.css';

export default class CurrencyInputText extends React.Component {  
  render() {
    return(
      <div className="currency-input-text-wrapper">
        <input 
          type="number"
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.handleChange} 
          className="currency-input-text" 
          placeholder="Enter a currency value"
          step="0.01"
        />
      </div>
    );
  }
}