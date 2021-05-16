import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Route path="/" exact component={Home} />
    </Router>
  )
}

const Home = () => {
  return <h1>Home</h1>
}

export default App;
