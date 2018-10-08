import React from 'react';
import { connect } from 'dva';
import { VictoryPie } from 'victory';


class PieChart extends React.Component {

  UNSAFE_componentWillMount() {
    this.props.dispatch({type: "student/piecount"});
  }

  render() {
<<<<<<< Updated upstream
    const { piecount } = this.props.student;
    console.log(piecount);
    
    return (
      <div>
        <h2 style={{ margin: 0, textAlign: "center" }}>饼图统计</h2>
        <VictoryPie data = {piecount}/>
=======
    const { piedata } = this.props.student;
    console.log(piedata);

    return (
      <div>
        <h2 style={{ margin: 0, textAlign: "center" }}>饼图统计</h2>
        <VictoryPie 
        origin = {{ y : 100 }}
        padding = {170}
        colorScale={["tomato", "orange", "gold", "cyan" ]}
        />
>>>>>>> Stashed changes
      </div>
    );
  }
}

export default connect((student)=>(student))(PieChart);
