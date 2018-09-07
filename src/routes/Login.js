import React from 'react';
import { connect } from 'dva';
import { Form, Input, Icon, Button } from 'antd';
import styles from './Login.css';

const FormItem = Form.Item

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({type: "login/login", payload: {nickname: values.userName, password: values.password}})
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { username } = this.props.login;
    console.log("<username>", username)
    return (
      <div className={styles.login}>
        <Form onSubmit={this.handleSubmit} >
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {/* {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <br />
            <a className="login-form-forgot" href="">Forgot password</a>
            <br /> */}
            <Button type="primary" htmlType="submit" className="login-form-button" block >
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
};

export default connect(({login})=>({login}))(Form.create()(Login));
