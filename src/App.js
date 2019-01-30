import React, { Component } from 'react';

import CurrencyView from './components/CurrencyView';
import ChartView from './components/ChartView';
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';

class App extends Component {
  render() {
    return (
      <main className="container">
        <Header />
        <div className="currencyview-wrapper">
          <CurrencyView v={1}/>
          <CurrencyView v={2}/>
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
