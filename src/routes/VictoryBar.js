import React from 'react';
import { connect } from 'dva';
import { VictoryChart, VictoryBar, VictoryTheme } from 'victory';

class BarChart extends React.Component {

  render () {
    return (
      <div>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 15 }}
        >
          <VictoryBar
            cornerRadius={10}
            style={{
              data: {
              fill: "#c43a31",
              width: 25
              }
            }}
            //data={sampleData}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default connect()(BarChart);