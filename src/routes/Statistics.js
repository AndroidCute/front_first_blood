import React from 'react';
import { connect } from 'dva';
import { VictoryPie } from 'victory';


class PieChart extends React.Component {

  componentDidMount() {
    this.props.dispatch({type: "student/piecount"});
  }

  render() {
    const { piedata } = this.props.student;
    console.log(piedata);
    
    return (
      <div>
        <h2 style={{ margin: 0, textAlign: "center" }}>饼图统计</h2>
        <VictoryPie 
        origin = {{ y : 100 }}
        padding = {150}

        />
      </div>
    );
  }
}

export default connect((student)=>(student))(PieChart);
