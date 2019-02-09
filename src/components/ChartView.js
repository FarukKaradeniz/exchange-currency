import React from 'react';
import { Line } from 'react-chartjs-2';

import '../styles/ChartView.css';

export default class ChartView extends React.Component {
  render() {
    return(
      <div className="chart-container">
        <Line 
          maxWidth={360}
          maxHeight={180}
          data={this.props.data} />
      </div>
    );
  }
}