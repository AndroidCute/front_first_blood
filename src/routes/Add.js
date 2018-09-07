import { Form, Input, Cascader, Select, Button, } from 'antd';
import React from 'react';
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option;

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

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }



  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="学号"
        >
          {getFieldDecorator('id', {
            rules: [{
              required: true, message: '请输入学号!',
            }],
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
          })(
            <Select style={{ width: '20%'}} >
              <Option value="woman">女</Option>
              <Option value="man">男</Option>
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
          })(
            <Select style={{ width: '20%'}} >
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
          {getFieldDecorator('address', {
            rules: [{
              required: true, message: '请选择籍贯!',
            }],
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
          })(
            <Cascader options={major} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    );
  }
}

export default connect()(Form.create()(RegistrationForm));
