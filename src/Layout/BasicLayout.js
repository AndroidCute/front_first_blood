import React from 'react';
import { Link, Route } from 'dva/router'
import { Layout, Menu, Icon } from 'antd';
import Home from './Home';
import { isAbsolute } from 'path';
import List from '../routes/List';
import RegistrationForm from '../routes/Add';

const { Header, Content, Footer } = Layout;

class BasicLayout extends React.Component {
  // state = {
  //   current: 'mail',
  // };

  // handleClick = (e) => {
  //   console.log('click ', e);
  //   this.setState({
  //     current: e.key,
  //   });
  // }


  render() {
    return (
      <Layout style={{padding: 0, margin: 0}}>
        <Header style={{ backgroundColor: 'white', position: isAbsolute, zIndex: 1, width: '100%' }}>
          <Menu
            //theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['Home']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="Logo" disabled>
              <Icon type="appstore" />
            </Menu.Item>
            <Menu.Item key="Home">
              <Link to="/Layout/Home">
                <Icon type="home" />
                首页
              </Link>
            </Menu.Item>
            <Menu.Item key="List">
              <Link to="/Layout/List">
                <Icon type="profile" />
                学籍列表和查询
              </Link>
            </Menu.Item>
            <Menu.Item key="Add">
              <Link to="/Layout/Add">
                <Icon type="form" />
                增加学籍
              </Link>
            </Menu.Item>
            <Menu.Item key="Statistics">
              <Icon type="pie-chart" />学籍统计
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{minHeight: 720, margin: 20}}>
          <Route path="/Layout/Home" component={Home} />
          <Route path="/Layout/List" component={List} />
          <Route path="/Layout/Add" component={RegistrationForm} />
        </Content>
        <Footer style={{textAlign: "center"}}>
          student-status ©2018 Created by CuteAndroid
        </Footer>
      </Layout>
  )
  };
}
//
// const Home = () => (
//   <div>
//     <h2>Home</h2>
//   </div>
// );
//
// const Page1 = () => (
//   <div>
//     <h2>Page</h2>
//   </div>
// );


export default BasicLayout;
/**
 * Created by cuteandroid on 2018/8/14.
 */
