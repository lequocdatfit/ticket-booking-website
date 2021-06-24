import React from 'react';
import history from './history';
import Login from './components/pages/Login';
import { Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router history={history}>

        <Route path="/login" exact component={Login} />
      </Router>
    </div>
  )
}

export default App
