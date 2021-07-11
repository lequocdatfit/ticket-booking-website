import React, {useEffect} from 'react';
import { Router as Router, Link, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './components/pages/Home';
import history from './history';
import SelectFlight from './components/SelectFlight';
import Passengers from './components/Passengers';
import SelectService from './components/SelectService';
import './App.css';
import BillingInfo from './components/BillingInfo';
import BookingSuccess from './components/BookingSuccess';
import SearchTicket from './components/pages/SearchTicket';
import Footer from './components/Footer';
import { fetchAirports } from './actions';
import { connect } from 'react-redux';


function App(props) {
  useEffect(() => {
    props.fetchAirports();
  }, [])
  return (
    <Router history={history} >
      <NavBar />
      <Route path="/" exact component={Home} />
      <Route path="/search-booking" exact component={SearchTicket} />
      <Route path="/select-flight" exact component={SelectFlight} />
      <Route path="/passengers" exact component={Passengers} />
      <Route path="/select-service" exact component={SelectService} />
      <Route path="/billing-info" exact component={BillingInfo} />
      <Route path="/booking-success" exact component={BookingSuccess} />
      <Footer />
    </Router>
  )
}


export default connect(null, {fetchAirports})(App);
