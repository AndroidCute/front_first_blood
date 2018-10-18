import React from 'react';
import { Link, Route, Redirect, Switch } from 'dva/router'
import { Layout, Menu, Icon } from 'antd';
import Home from './Home';
import { isAbsolute } from 'path';
import List from '../routes/List';
import RegistrationForm from '../routes/Add';
import PieChart from '../routes/Statistics';
import BarChart from '../routes/VictoryBar';


const { Header, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

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
            <SubMenu title={<span><Icon type="pie-chart" />学籍统计</span>}>
              <MenuItemGroup>
                <Menu.Item key="setting:1">
                  <Link to="/Layout/Statistics">
                    年龄统计饼图
                  </Link> 
                </Menu.Item>
                <Menu.Item key="setting:2">
                  <Link to="/Layout/Bar">
                    柱状图
                  </Link> 
                </Menu.Item>
                <Menu.Item key="setting:3">
                  年级人数折线图
                </Menu.Item>
                {/* <Menu.Item key="setting:4">
                  Option 4
                </Menu.Item> */}
              </MenuItemGroup>
            </SubMenu>
          </Menu>
        </Header>
        <Content style={{minHeight: 600, margin: 20}}>
          <Switch>
            <Route exact path="/Layout/Home" component={Home} />
            <Route exact path="/Layout/List" component={List} />
            <Route exact path="/Layout/Add" component={RegistrationForm} />
            <Route exact path="/Layout/Statistics" component={PieChart} />
            <Route exact path="/Layout/Bar" component={BarChart} />
            <Redirect from="*" to='/Layout/Home' />
          </Switch>
        </Content>
        <Footer style={{textAlign: "center", position: isAbsolute }}>
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
