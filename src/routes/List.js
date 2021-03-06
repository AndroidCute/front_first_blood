import { Select, Table, Input, Button, Row, Col, Cascader, } from 'antd';
import { Modal, Form, Popconfirm, message, Icon, Upload, AutoComplete } from 'antd';
import { connect } from 'dva';
import React from 'react';
import style from './List.css';
import { isArray } from 'util';

const Option = Select.Option;
const ButtonGroup = Button.Group;

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
for (let i = 0; i < 17; i++) {
  data.push({
    key: i.toString(),
    id: `20180${i}`,
    name: `学生 ${i}`,
    sex: `女`,
    age: 32,
    address: `地区 ${i}`,
    department: `计算机系`,
    major: `计算机科学与技术`,
    classes: `181`,
  });
}

const major = [{ 
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

const FormItem = Form.Item;

class SearchCom extends React.Component {
  render() {
    return(
      
        <Row type="flex" justify="center">
          <Col span={3} style={{ width: 120 }}>
            <Select defaultValue="and" style={{ width: 75 }}>
              <Option value="and">并且</Option>
              <Option value="or">或者</Option>
            </Select>
          </Col>
          <Col span={4} style={{ width: 120 }}>
            <Select defaultValue="card" style={{ width: 100 }}>
              <Option value="card">学号</Option>
              <Option value="name">姓名</Option>
              <Option value="science">系别</Option>
            </Select>
          </Col>
          <Col span={8} style={{ width: 500 }}>
            <Input />
          </Col>
        </Row>
    );
  }
}
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      card1: '',
      name1: '',
      sex1: 0,
      age1: 0,
      native1: '',
      currentIndex: 0,
      department1: [],
      currentindex: 0,
      rows: [],
      search: [],
    }
    this.columns = [
      {
        title: '学号',
        dataIndex: 'card',
        width: '10%',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: '10%',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: '7%',
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
      },
      {
        title: '籍贯',
        dataIndex: 'native',
        width: '13%',
        render: (text) => {
          let xi = '';
          switch (text) {
            case 'beijing':
              xi = '北京市';
              break;
            case 'henan':
              xi = '河南省';
              break;
            case 'hebei':
              xi = '河北省';
              break;
            case 'tianjin':
              xi = '天津市';
              break;
            default:
              xi = '天津市';
          }
          return (
            <div>
              <span>{xi}</span>
            </div>
          );
        },
      },
      {
        title: '系别',
        dataIndex: 'science',
        width: '13%',
        render: (text) => {
          let xi = '';
          switch (text) {
            case 'computer':
              xi = '计算机系';
              break;
            case 'power':
              xi = '电力系';
              break;
            case 'automatic':
              xi = '自动化系';
              break;
            default:
              xi = '自动化系';
          }
          return (
            <div>
              <span>{xi}</span>
            </div>
          );
        },
      },
      {
        title: '专业',
        dataIndex: 'specialty',
        width: '13%',
        render: (text) => {
          let xi = '';
          switch (text) {
            case 'science':
              xi = '计算机科学与技术';
              break;
            case 'software':
              xi = '软件工程';
              break;
            default:
              xi = '软件工程';
          }
          return (
            <div>
              <span>{xi}</span>
            </div>
          );
        },
      },
      {
        title: '班级',
        dataIndex: 'class',
        width: '7%',
        render: (text) => {
          let xi = '';
          switch (text) {
            case 'sci-class1':
              xi = '1401';
              break;
            case 'sci-class2':
              xi = '1402';
              break;
            case 'soft-class1':
              xi = '1501';
              break;
            case 'soft-class2':
              xi = '1502';
              break;
            default:
              xi = '1502';
          }
          return (
            <div>
              <span>{xi}</span>
            </div>
          );
        },
      },
      {
        title: '编辑',
        align: 'center',
        width: '10%',
        render: (text, record, index) => {
          return (
            <div>
              <a onClick={()=>{this.handleModify(record, index)}} >编辑</a>
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
            <Popconfirm title="确认删除这条学籍信息吗?" onConfirm={()=> this.handleConfirm(record.id)} okText="确认" cancelText="取消">
              <a>删除</a>
            </Popconfirm>
          );
        },
      }
    ];
  }

  handleAvatar = (info) => {
    if (info.file.status === 'uploading') {
        this.setState({loading: true});
        return;
    }
    if (info.file.status === 'done') {
        // Get this url from response in real world.
        // console.log(info.file.response.msg.url)
        this.setState({avatar: info.file.response.msg.url})
        this.getBase64(info.file.originFileObj, imageUrl => this.setState({imageUrl, loading: false}));
        console.log("avatar:", this.state.avatar)
    }
  }

  getBase64 = (img, callback) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
  }

  beforeUpload = (file) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
          message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
      }
      return isJPG && isLt2M;
  }

  handleConfirm = (id) => {
    this.props.dispatch({type: "student/delete", payload: {id}});
    this.setState({id})
    console.log("ID:", id);
  }
  
  handleModify = (record, index) => {
    let department = []
    department.push(record.science);
    department.push(record.specialty);
    department.push(record.class);
    record.department = department
    this.setState({...record, imageUrl: record.avatar, visible: true, currentindex: index})
    console.log("NaliChuWenTiLe...", this.state, department);
  }

  handleChange = (value) => {
    console.log(value);
  }

  handleCancel = (value) => {
    this.setState({visible: false}) 
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log("imageUrl:", this.state.avatar)
        this.props.dispatch({type: "student/modify", payload: {
          id: this.state.id,
          card: values.card,
          name: values.name,
          sex: values.sex,
          age: values.age,
          native: values.native,
          avatar: this.state.avatar,
          science: values.department[0],
          specialty: values.department[1] ? values.department[1]:'',
          class: values.department[2] ? values.department[2]:'',
        }})
      }
    });
    this.setState({visible: Boolean, avatat: ''});
  }

  handleSearch = (e) => {
    let mState = this.state
    let search = {}
    if (mState.card1 !== '') {
      search.card = mState.card1
    }

    if (mState.name1 !== '') {
      search.name = mState.name1
    }

    if (mState.sex1 !== 0) {
      search.sex = mState.sex1
    }

    if (mState.age1 !== 0) {
      search.age = mState.age1
    }

    if (mState.native1 !== '') {
      search.native = mState.native1
    }

    if (mState.department1 !== []) {
      if (mState.department1[0] !== '') {
        search.science = mState.department1[0]
      }
      if (mState.department1[1] !== '') {
        search.specialty = mState.department1[1]
      }
      if (mState.department1[2] !== '') {
        search.class = mState.department1[2]
      }
    }

    if (JSON.stringify(search) === "{}"){
      this.props.dispatch({type: "student/getList"})
      return
    }
    this.props.dispatch({type: "student/getSearchList", payload: {...search}})
  }

  handleChangeSearchName = (value ) => {
    this.setState({name1: value})
  }

  handleChangeSearchCard = (e) => {
    this.setState({card1: e.target.value})
  }

  handleChangeSearchSex = (value) => {
    console.log("Sex1:", value)
    this.setState({sex1: value})
  }

  handleChangeSearchAge = (value) => {
    this.setState({age1: value})
  }

  handleChangeSearchNative = (value) => {
    this.setState({native1: value})
  }

  handleChangeSearchDepartment = (value) => {
    this.setState({department1: value})
  }

  componentDidMount() {
    this.props.dispatch({type: "student/getList"});
  }

  handleAdd = () => {
    if(this.state.rows.length < 3) {
      let rows = this.state.rows;
      rows.push(1)
      this.setState({rows});
      console.log(rows);
    }
  }

  handleReduce = () => {
    if(this.state.rows.length > 0) {
      let rows = this.state.rows
      rows.pop()
      this.setState({rows});
      // rows.pop();
      console.log(rows);
    }
  }

  handleAddSearchCondName = (index, name) => {
    let search = this.state.search;
    let elem = search[index]
    if (elem) {
      elem.name = name;
    } else {
      elem = {name};
    }
    if (index == 0) {
      elem.relation = "and"
    }
    search[index] = elem;
    this.setState({search});
  }

  handleAddSearchCondRelation = (index, relation) => {
    let search = this.state.search;
    let elem = search[index]
    if (elem) {
      elem.relation = relation;
    } else {
      elem = {relation};
    }
    search[index] = elem;
    this.setState({search});
  }

  handleAddSearchCondValue = (index, value) => {
    let search = this.state.search;
    let elem = search[index]
    if (elem) {
      elem.value = value;
    } else {
      elem = {value};
    }
    search[index] = elem;
    this.setState({search});
  }

  render() {
    const { list } = this.props.student;
    const { getFieldDecorator } = this.props.form;

    let rows = this.state.rows.map((_, i) => {
      return (
        <Row key={i} type="flex" justify="center" className={style.searchcss}>
          <Col span={3} style={{ width: 120 }}>
            <Select defaultValue="and" style={{ width: 75 }} onChange={(v)=>{this.handleAddSearchCondRelation(i, v)}}>
              <Option value="and">并且</Option>
              <Option value="or">或者</Option>
            </Select>
          </Col>
          <Col span={4} style={{ width: 120 }}>
            <Select defaultValue="card" style={{ width: 100 }} onChange={(v)=>{this.handleAddSearchCondName(i, v)}}>
              <Option value="card">学号</Option>
              <Option value="name">姓名</Option>
              <Option value="science">系别</Option>
            </Select>
          </Col>
          <Col span={8} style={{ width: 500 }}>
            <Input onChange={(v)=>{this.handleAddSearchCondValue(i, v)}}/>
          </Col>
        </Row>
      );
    });

    console.log("ROWS:", rows)

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const uploadButton = (
      <div>
          <Icon
              type={this.state.loading
              ? 'loading'
              : 'plus'}/>
          <div className="ant-upload-text">Upload</div>
      </div>
    )
    
    const dataSource = [
      '安顶漂亮',
      '安大漂亮',
      '安地方',
      '安小漂亮',
    ]
    ;

    return(
      <div className={style.listLayout} >
        <Row type="flex" justify="center" className={style.searchcss} >
          <Col span={3} style={{ width: 120 }}>
            <Button size="small" style={{ marginRight: 10}} onClick={this.handleAdd}>
              <Icon type="plus-circle" theme="filled" />
            </Button>
            <Button size="small" onClick={this.handleReduce}>
              <Icon type="minus-circle" theme="filled" />
            </Button>
          </Col>
          <Col span={4} style={{ width: 120 }}>
            <Select defaultValue="card" style={{ width: 100 }} onChange={(v)=>{this.handleAddSearchCondName(0, v)}}>
              <Option value="card">学号</Option>
              <Option value="name">姓名</Option>
              <Option value="science">系别</Option>
            </Select>
          </Col>
          <Col span={8} style={{ width: 500 }} >
            <Input onChange={(v)=>{this.handleAddSearchCondValue(0, v)}}/>
          </Col>
        </Row>
        <div>
          {rows}
        </div>
        {/* <Row gutter={16} className={style.rowcss} >
          <Col span={4}>
            <Input addonBefore="学号" onChange={this.handleChangeSearchCard}/>
          </Col>
          <Col span={4}>
            <AutoComplete
              dataSource={dataSource}
              style={{ width: 200 }}
              onSelect={this.handleChangeSearchName}
              placeholder="姓名"
            />
          </Col>
          <Col span={4}>
            <Select placeholder="性别" allowClear style={{ width: 95, marginRight: 20 }} onChange={this.handleChangeSearchSex}>
              <Option value="1">女</Option>
              <Option value="2">男</Option>
            </Select>
            <Select placeholder="年龄" allowClear style={{ width: 95 }} onChange={this.handleChangeSearchAge}>
              <Option value="21">21</Option>
              <Option value="22">22</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select placeholder="籍贯" allowClear style={{ width: 190 }} onChange={this.handleChangeSearchNative}>
              <Option value="beijing">北京市</Option>
              <Option value="hebei">河北省</Option>
              <Option value="henan">河南省</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Cascader options={options} onChange={this.handleChangeSearchDepartment} placeholder="系别专业班级" style={{ width: 250 }} />
          </Col>
          <Col span={2}>
            <Button type='primary' shape='circle' icon='search' style={{ align: 'left' }} onClick={this.handleSearch} />
          </Col>
        </Row> */}
        <Modal destroyOnClose title="修改学籍信息"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          confirmLoading={this.state.confirmLoading}
        >
        <Col offset={10}>
          <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="http://127.0.0.1:7001/upload/avator"
          beforeUpload={this.beforeUpload}
          onChange={this.handleAvatar}>

          {this.state.avatar
              ? <img src={this.state.avatar} style={{width:138, height:178}} alt=""/>
              : uploadButton}

          </Upload>
        </Col>
        <Form>
          <FormItem
            {...formItemLayout}
            label="学号"
          >
            {getFieldDecorator('card', {
              rules: [{
                required: true, message: '请输入学号!',
              }],
              initialValue: this.state.card,
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="姓名"
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请输入姓名!',
              }],
              initialValue: this.state.name,
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="性别"
          >
            {getFieldDecorator('sex', {
              rules: [{
                required: true, message: '请选择性别!',
              }],
              initialValue: this.state.sex + '',
            })(
              <Select style={{ width: '50%'}}>
                <Option value="1">女</Option>
                <Option value="2">男</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="年龄"
          >
            {getFieldDecorator('age', {
              rules: [{
                required: true, message: '请选择年龄!',
              }],
              initialValue: this.state.age,
            })(
              <Select style={{ width: '50%'}} >
                <Option value="21">21</Option>
                <Option value="22">22</Option>
                <Option value="23">23</Option>
                <Option value="24">24</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="籍贯"
          >
            {getFieldDecorator('native', {
              rules: [{
                required: true, message: '请选择籍贯!',
              }],
              initialValue: this.state.native,
            })(
              <Select style={{ width: '50%'}} >
                <Option value="beijing">北京市</Option>
                <Option value="henan">河南省</Option>
                <Option value="hebei">河北省</Option>
                <Option value="tianjin">天津市</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="系别专业班级"
          >
            {getFieldDecorator('department', {
              rules: [{  required: true, message: '请选择系别专业班级!' }],
              initialValue: this.state.department,
            })(
              <Cascader options={major} />
            )}
          </FormItem>
        </Form>
        <Col offset={8}>
          <ButtonGroup>
            <Button  onClick={() => {
              let index = this.state.currentindex - 1;
              if (index < 0)
              {
                index = 0;
              }
              let record = list[index];
              this.handleModify(record,index);
            }}>
              <Icon type="left" />上一条
            </Button>
            <Button  onClick={() => {
              let index = this.state.currentindex + 1;
              if (index > list.length-1)
              {
                index = list.length-1;
              }
              let record = list[index];
              this.handleModify(record,index);
            }}>
              <Icon type="right" />下一条
            </Button>
          </ButtonGroup>
        </Col>
        </Modal>
        <Table
          bordered
          dataSource={list}
          columns={this.columns}
          scroll={{ x: 1000}}
        />
      </div>
    );
  }
}

export default connect((student)=>(student))(Form.create()(List));

