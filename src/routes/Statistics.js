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
        <h2 style={{ margin: 0, textAlign: "center" }}>饼图统计</h2>
        <VictoryPie data = {piecount}/>
      </div>
    );
  }
}

export default connect((student)=>(student))(PieChart);
