import React from 'react'
import { createHashHistory } from 'history'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import routes from '../route/routes'

import './App.less'
// import 'antd/dist/antd.css'

const App = () => {
  return (
    <div className="gov-container">
      <Router history={createHashHistory()}>
        <Switch>
          <Redirect exact from="/" to="/home" />
          {routes.map(route => (
            <Route
              exact
              key={route.path}
              path={route.path}
              render={props => <route.component {...props} routes={route.routes} />}
            />
          ))}
        </Switch>
      </Router>
    </div>
  )
}

export default App
