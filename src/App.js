import React from 'react';
import { Router as Router, Link, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './components/pages/Home';
import history from './history';
import SelectFlight from './components/SelectFlight';
import Passengers from './components/Passengers';
import './App.css';


function App() {
  return (
    <Router history={history} >
      <NavBar />
      <Route path="/" exact component={Home} />
      <Route path="/select-flight" component={SelectFlight} />
      <Route path="/passengers" exact component={Passengers} />
    </Router>
  )
}


export default App;
