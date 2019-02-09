import React, { Component } from 'react';
import Axios from 'axios';
import moment from 'moment';

import CurrencyView from './components/CurrencyView';
import ChartView from './components/ChartView';
import Header from './components/Header';

import './App.css';


const baseCurrency = {
	value: 1,
	name: 'EUR'
}; 

const currencies = [ //burada sadece base currency olacak, digerleri API isteginden sonra eklenecek
  baseCurrency,
];

let data = {}; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: currencies,
      firstCurrencyIndex: 0, //ilk input listede seçilen kur. default 0 olacak
      secondCurrencyIndex: 0,  //ikinci input listede seçilen kur. default 0 olacak
      firstCurrencyValue: 1, //ilk inputtaki değer. default 1 olacak
      secondCurrencyValue: 1, //ikinci inputtaki değer. default 1 olacak
      weekDataExist: false, // chartview ilk başta görünmeyecek
      weekData: [], //weekdata saklanacagi yer
      labels: [], //weekdata labellar
    };

  }

  getDataForDate = (date) => {
    const firstCurrency = this.state.firstCurrencyIndex;
    const secondCurrency = this.state.secondCurrencyIndex;
    const dataForDate = data[date];
    let rate = 0;
    if (firstCurrency === 0 && secondCurrency === 0) {
      rate = 1;
    }
    else if (firstCurrency === 0 && secondCurrency !== 0) {
      rate = dataForDate[this.state.currencies[secondCurrency].name];
    }
    else if (firstCurrency !== 0 && secondCurrency === 0) {
      rate = 1 / dataForDate[this.state.currencies[firstCurrency].name];
    }
    else {
      rate = dataForDate[this.state.currencies[secondCurrency].name] / dataForDate[this.state.currencies[firstCurrency].name];
    }
    return rate;
  };

  updateChart = () => {
    const labels = this.state.labels;
    const weekData = [];
    labels.forEach(label => {
      const rate = this.getDataForDate(label);
      weekData.push(rate);
    });
    this.setState({
      weekData: weekData,
    });
  }

  getWeekCurrencyData = () => {
    const dateFrom = moment().subtract(6,'days').format('YYYY-MM-DD');
    const dateTo = moment().format('YYYY-MM-DD');

    Axios({
      method: 'get',
      url: 'https://api.exchangeratesapi.io/history',
      params: {
        start_at: dateFrom,
        end_at: dateTo
      }
    }).then(response => {
      data = response.data.rates;
      const weekLabels = [];
      const weekData = [];
      Object.keys(data).sort().forEach(label => {
        weekLabels.push(label);
        const rate = this.getDataForDate(label);
        weekData.push(rate);
      });

      this.setState({
        weekDataExist: true,
        labels: weekLabels.sort(),
        weekData: weekData,
      });
    }).catch(err => console.log(err));
  }

  onCurrencyValueChanged = (e) => {
    if (e.target.name === 'firstCurrencyValue') {
      const newValue = e.target.value;
      const selectedCurrency = this.state.secondCurrencyIndex;
      this.setState({ 
        [e.target.name]: e.target.value,
        secondCurrencyValue: (newValue * (currencies[selectedCurrency].value / currencies[this.state.firstCurrencyIndex].value)).toFixed(4),
      }); //Sets the new value
    }
    else { //e.target.name === 'secondCurrencyValue'
      const newValue = e.target.value;
      const selectedCurrency = this.state.firstCurrencyIndex;
      this.setState({ 
        [e.target.name]: e.target.value,
        firstCurrencyValue: (newValue * (currencies[selectedCurrency].value / currencies[this.state.secondCurrencyIndex].value)).toFixed(4),
      }); //Sets the new value
    }
  };

  onCurrencySelected = (index, listName) => {
    if (this.state[listName] === index) { // not changing the selected currencies
      return;
    }
    if(listName === 'firstCurrencyIndex') {
      const secondCurrencyValue = this.state.firstCurrencyValue * (currencies[this.state.secondCurrencyIndex].value / currencies[index].value);
      this.setState({
        [listName]: index,
        secondCurrencyValue: secondCurrencyValue
      }, () => this.updateChart());
    }
    else { // listName === 'secondCurrencyIndex'
      const secondCurrencyValue = this.state.firstCurrencyValue * (currencies[index].value / currencies[this.state.firstCurrencyIndex].value);
      this.setState({
        [listName]: index,
        secondCurrencyValue: secondCurrencyValue
      }, () => this.updateChart());
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
      }, () => {
        this.getWeekCurrencyData();
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
            listName={"firstCurrencyIndex"}
            currencies={this.state.currencies}
            selectedCurrency={this.state.firstCurrencyIndex}
            currencySelectEvent={this.onCurrencySelected}
          />
          <CurrencyView 
            name={'secondCurrencyValue'}
            value={this.state.secondCurrencyValue}
            handleChange={this.onCurrencyValueChanged} 
            listName={"secondCurrencyIndex"}
            currencies={this.state.currencies}
            selectedCurrency={this.state.secondCurrencyIndex}
            currencySelectEvent={this.onCurrencySelected}
          />
          <div className="chartview-wrapper">
            <ChartView data={{
              labels: this.state.labels, // tarih bilgileri
              datasets: [
                {
                  backgroundColor: "rgba(157, 227, 255, 0.4)",
                  borderColor: "rgba(157, 227, 255, 1)",
                  pointBackgroundColor: "rgba(107, 127, 255, 1)",
                  fill: false,
                  lineTension: 0.1,
                  data: this.state.weekData, // oranların datası
                  label: `${this.state.currencies[this.state.firstCurrencyIndex].name}/${this.state.currencies[this.state.secondCurrencyIndex].name}`,
                }
              ],
            }} />
          </div>
        </div>
      </main>
    );
  }
}

export default App;
