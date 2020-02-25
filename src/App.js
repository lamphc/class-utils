import React, { lazy, Suspense } from 'react';
// import { Button } from 'antd-mobile';

import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './pages/Home';


const NotFound = () => <center><h2>404...</h2></center>
function App() {
  return (
    <Router>
      <Suspense fallback={<center><h1>Loading...</h1></center>}>
        <div className="app">
          <Switch>
            {/* 一级路由 */}
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/home" component={Home} />

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
