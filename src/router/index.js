import React from 'react';
import { Switch, Route,HashRouter } from 'react-router-dom';
import {Spin } from 'antd';
import '../index.css'
const Home = React.lazy(() => import('../pages/index'));

// 组件加载优化
const SuspenseComponent = (Component) => (
    (props) => (
      <React.Suspense fallback={<Spin id="component-loading-spinning"/>}>
        <Component {...props} />
      </React.Suspense>
    )
  )

const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={SuspenseComponent(Home)}/>
        </Switch>
    </HashRouter>
);


export default BasicRoute;