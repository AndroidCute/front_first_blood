import React from 'react';
import { connect } from 'dva';
import { VictoryPie, VictoryLabel } from 'victory';


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
          padding = {{ top: 20, bottom: 60, left: 170, right: 150 }}
          height={400}
          colorScale = {["tomato", "orange", "gold", "cyan" ]}
          labels = {(data) => data.x}
          style = { {labels: { fontSize: 7 } } }
          //labelComponent={<VictoryLabel angle={0}/>}
        />
      </div>
    );
  }
}

export default connect((student)=>(student))(PieChart);
