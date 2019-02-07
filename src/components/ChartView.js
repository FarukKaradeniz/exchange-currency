import React from 'react';
import { Line } from 'react-chartjs-2';

import '../styles/ChartView.css';

export default class ChartView extends React.Component {
  render() {
    return(
      <div className="chart-container">
        <Line data={this.props.data} />
      </div>
    );
  }
}