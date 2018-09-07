import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Products from './routes/Products';
import BasicLayout from './Layout/BasicLayout';
import Login from './routes/Login';
import RegistrationForm from './routes/Add';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/products" component={Products} />
        <Route path="/Layout" component={BasicLayout} />
        <Route path="/Login" component={Login} />
        <Route path="/Add" component={RegistrationForm} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;