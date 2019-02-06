import React from 'react';

import '../styles/CurrencySelectList.css';

export default class CurrencySelectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
    }
  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  onListItemClick = (index) => {
    this.toggleList();
    this.props.currencySelectEvent(index, this.props.listName);
  }

  currencyList = () => {
    const currencies = this.props.currencies.map((currency, index) => {
      return <li 
              className="currency-item"
              onClick={() => this.onListItemClick(index)}
              key={index} >
                {currency.name}
              </li>
    });

    return <ul className={`currency-list ${this.state.listOpen ? '' : ' hidden'}`}>{currencies}</ul>
  }
  
  render() {
    return(
      <div className="currency-select-list-wrapper">
        <div className="currency-select-list">
          <div 
            onClick={() => this.toggleList()}
            className="currency-list-header">
            {this.props.currencies[this.props.selectedCurrency].name}
          </div>
          {this.currencyList()}
        </div>
      </div>
    );
  }
}