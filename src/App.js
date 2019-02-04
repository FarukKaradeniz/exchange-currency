import React, { Component } from 'react';
import Axios from 'axios';

import CurrencyView from './components/CurrencyView';
import ChartView from './components/ChartView';
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';


const baseCurrency = {
	value: 1,
	currency: 'EUR'
}; 

const currencies = [ //burada sadece base currency olacak, digerleri API isteginden sonra eklenecek
  baseCurrency,
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: currencies,
      firstCurrencyIndex: 0, //ilk input listede seçilen kur. default 0 olacak
      secondCurrencyIndex: 0,  //ikinci input listede seçilen kur. default 0 olacak
      firstCurrencyValue: 1, //ilk inputtaki değer. default 1 olacak
      secondCurrencyValue: 1, //ikinci inputtaki değer. default 1 olacak
    };

  }

  onCurrencyValueChanged = (e) => {
    if (e.target.name === 'firstCurrencyValue') {
      const newValue = e.target.value;
      const selectedCurrency = this.state.secondCurrencyIndex;
      this.setState({ 
        [e.target.name]: e.target.value,
        secondCurrencyValue: (newValue * currencies[selectedCurrency].value),
      }); //Sets the new value
    }
    else { //e.target.name === 'secondCurrencyValue'
      const newValue = e.target.value;
      const selectedCurrency = this.state.secondCurrencyIndex;
      this.setState({ 
        [e.target.name]: e.target.value,
        firstCurrencyValue: (newValue / currencies[selectedCurrency].value),
      }); //Sets the new value
    }

  };

  componentWillMount = () => {
    Axios({
      method: 'get',
      url:'https://api.exchangeratesapi.io/latest'
    }).then(reponse => {
      const rates = reponse.data.rates;
      Object.keys(reponse.data.rates).map(key => {
        return {name: key, value: rates[key]};
      }).forEach(rate => currencies.push(rate));
      
      this.setState({
        currencies: currencies
      });
    }).catch(err => console.log(err));
  }


  render() {
    return (
      <main className="container">
        <Header />
        <div className="currencyview-wrapper">
          <CurrencyView 
            name={'firstCurrencyValue'}
            value={this.state.firstCurrencyValue}
            handleChange={this.onCurrencyValueChanged} 
          />
          <CurrencyView 
            name={'secondCurrencyValue'}
            value={this.state.secondCurrencyValue}
            handleChange={this.onCurrencyValueChanged} 
          />
          <div className="chartview-wrapper">
            <ChartView />
          </div>
        </div>        
        <Footer />
      </main>
    );
  }
}

export default App;
