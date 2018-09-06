import { Select, Table, Input, Button, Row, Col, Cascader } from 'antd';
import { InputNumber, Popconfirm, Form } from 'antd';
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
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `请输入${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data, editingKey: '' };
    this.columns = [
      {
        title: '学号',
        dataIndex: 'id',
        width: '12%',
        editable: true,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: '8%',
        editable: true,
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: '7%',
        editable: true,
      },
      {
        title: '年龄',
        dataIndex: 'age',
        width: '7%',
        editable: true,
      },
      {
        title: '籍贯',
        dataIndex: 'address',
        width: '13%',
        editable: true,
      },
      {
        title: '系别',
        dataIndex: 'department',
        width: '13%',
        editable: true,
      },
      {
        title: '专业',
        dataIndex: 'major',
        width: '13%',
        editable: true, 
      },
      {
        title: '班级',
        dataIndex: 'classes',
        width: '7%',
        editable: true, 
      },
      {
        title: '编辑',
        align: 'center',
        dataIndex: 'edit',
        width: '10%',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        //href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <a onClick={() => this.edit(record.key)}>Edit</a>
              )}
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
            this.state.data.length > 1
              ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                  <a 
                  //href="javascript:;"
                  >Delete</a>
                </Popconfirm>
              ) : null
          );
        },
      }
    ];
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.data];
    this.setState({ data: dataSource.filter(item => item.key !== key) });
  }

  isEditing = (record) => {
    return record.key === this.state.editingKey;
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <Table
        components={components}
        bordered
        dataSource={this.state.data}
        columns={columns}
        rowClassName={style.editablerow}
        scroll={{ x: 1000}}
      />
    );
  }
}

class List extends React.Component {

  handleClick = (e) => {
    console.log("test");
  }

  handleChange = (value) => {
    console.log(value);
  }

  render() {
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
        <EditableTable />
      </div>
    );
  }
}

export default connect()(List);

