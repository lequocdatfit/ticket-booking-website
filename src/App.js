import React from 'react';
import { Router as Router, Link, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './components/pages/Home';
import history from './history';
import SelectFlight from './components/SelectFlight';
import Passengers from './components/Passengers';
import SelectService from './components/SelectService';
import './App.css';


function App() {
  return (
    <Router history={history} >
      <NavBar />
      <Route path="/" exact component={Home} />
      <Route path="/select-flight" exact component={SelectFlight} />
      <Route path="/passengers" exact component={Passengers} />
      <Route path="/select-service" exac component={SelectService} />
      
    </Router>
  )
}


export default App;
