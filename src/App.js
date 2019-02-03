import React, { Component } from 'react';

import CurrencyView from './components/CurrencyView';
import ChartView from './components/ChartView';
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCurrency: 1,
      secondCurrency: 1,  
    };

  }

  onCurrencyChanged = (e) => {
    if (e.target.name === 'firstCurrency') {
      const firstVal = e.target.value;
      this.setState({ 
        [e.target.name]: e.target.value,
        secondCurrency: firstVal * 5.21,
      }); //Sets the new value
    }
    else { //e.target.name === 'secondCurrency'
      const secondVal = e.target.value;
      this.setState({ 
        [e.target.name]: e.target.value,
        firstCurrency: secondVal * 0.19,
      }); //Sets the new value
    }

  };

  render() {
    return (
      <main className="container">
        <Header />
        <div className="currencyview-wrapper">
          <CurrencyView 
            name={'firstCurrency'}
            value={this.state.firstCurrency}
            handleChange={this.onCurrencyChanged} 
          />
          <CurrencyView 
            name={'secondCurrency'}
            value={this.state.secondCurrency}
            handleChange={this.onCurrencyChanged} 
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
