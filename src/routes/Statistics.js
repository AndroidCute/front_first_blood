import React from 'react';
import { connect } from 'dva';
import { VictoryPie } from 'victory';


class PieChart extends React.Component {

  UNSAFE_componentWillMount() {
    this.props.dispatch({type: "student/piecount"});
  }

  render() {
    const { piecount } = this.props.student;
    console.log(piecount);
    
    return (
      <div>
        <h2 style={{ marginLeft: 50, }}>年龄统计</h2> 
        <VictoryPie 
          data = {piecount}
          origin = {{ x : 100, y : 70 }}
          padding = {170}
          colorScale = {["tomato", "orange", "gold", "cyan" ]}
        />
      </div>
    );
  }
}

export default connect((student)=>(student))(PieChart);
