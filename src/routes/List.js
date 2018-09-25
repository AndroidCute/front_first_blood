import { Select, Table, Input, Button, Row, Col, Cascader } from 'antd';
import { Modal } from 'antd';
import { connect } from 'dva';
import React from 'react';
import style from './List.css';

const Option = Select.Option;
const options = [{ 
  value: 'computer',
  label: '计算机系',
  children: [{
    value: 'science',
    label: '计算机科学与技术',
    children: [{
      value: 'sci-class1',
      label: '1401',
    }, {
      value: 'sci-class2',
      label: '1402',
    }]
  }, {
      value: 'software',
      label: '软件工程',
      children: [{
        value: 'soft-class1',
        label: '1501',
      }, {
        value: 'soft-class2',
        label: '1502',
      }]
  }]
}, {
  value: 'power',
  label: '电力系',
}, {
  value: 'automatic',
  label: '自动化系',
}];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
    this.columns = [
      {
        title: '学号',
        dataIndex: 'id',
        width: '10%',
        editable: true,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: '10%',
        editable: true,
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: '7%',
        editable: true,
        render: (text) => {
          return (
            text === 1 ? <span>女</span>:<span>男</span>
          )
        }
      },
      {
        title: '年龄',
        dataIndex: 'age',
        width: '7%',
        editable: true,
      },
      {
        title: '籍贯',
        dataIndex: 'native',
        width: '13%',
        editable: true,
      },
      {
        title: '系别',
        dataIndex: 'science',
        width: '13%',
        editable: true,
      },
      {
        title: '专业',
        dataIndex: 'specialty',
        width: '13%',
        editable: true, 
      },
      {
        title: '班级',
        dataIndex: 'class',
        width: '7%',
        editable: true, 
      },
      {
        title: '编辑',
        align: 'center',
        dataIndex: 'edit',
        width: '10%',
        render: (text, record) => {
          return (
            <div>
              <a onClick={()=>{this.handleClick(record)}} >编辑</a>
            </div>
          );
        },
      },
      {
        title: '删除',
        dataIndex: 'dele',
        width: '10%',
        render: (text, record) => {
          return (
            <div>
              <div>
                <a onClick={()=>{this.handleChange(record)}} >删除</a>
              </div>
            </div>
          );
        },
      }
    ];
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch({type: 'student/getList'})
  }

  handleClick = (e) => {
    this.setState({visible: true})
    console.log(e);
  }

  handleChange = (value) => {
    console.log(value);
  }

  handleCancel = (value) => {
    this.setState({visible: false}) 
  }

  render() {
    const { list } = this.props.student;

    return(
      <div className={style.listLayout} >
        <Row gutter={16} className={style.rowcss} >
          <Col span={4}>
            <Input addonBefore="学号" />
          </Col>
          <Col span={4}>
            <Input addonBefore="姓名" />
          </Col>
          <Col span={4}>
            <Select defaultValue="性别"  style={{ width: 95, marginRight: 20 }}>
              <Option value="women">女</Option>
              <Option value="men">男</Option>
            </Select>
            <Select defaultValue="年龄"  style={{ width: 95 }}>
              <Option value="21">21</Option>
              <Option value="22">22</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select defaultValue="籍贯"   style={{ width: 190 }}>
              <Option value="beijing">北京市</Option>
              <Option value="hebei">河北省</Option>
              <Option value="henen">河南省</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Cascader options={options} onChange={this.handleChange} placeholder="系别专业班级" style={{ width: 250 }} />
          </Col>
          <Col span={2}>
            <Button type='primary' shape='circle' icon='search' style={{ align: 'left' }} onClick={this.handleClick} />
          </Col>
        </Row>
        <Modal title="修改学籍信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          confirmLoading={this.state.confirmLoading}
        >
        </Modal>
        <Table
          bordered
          dataSource={list}
          columns={this.columns}
          rowClassName={style.editablerow}
          scroll={{ x: 1000}}
        />
      </div>
    );
  }
}

export default connect(({student})=>({student}))(List);

