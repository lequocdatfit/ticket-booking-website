import React from 'react';
import history from './history';
import Login from './components/pages/Login';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import TopBar from './components/topbar/TopBar';
import SideBar from './components/sidebar/SideBar';
import Home from './components/pages/Home.jsx';
import './App.css';
import store from './myStore';
import UserList from './components/userList/UserList';
import User from './components/user/User';
import NewUser from './components/newUser/NewUser';
import ListFlights from './components/listFlights/ListFlights';
import AirlinerList from './components/airlinerList/AirlinerList';
import AirportList from './components/airportList/AirportList';
import NewFlight from './components/newFlight/NewFlight';
import NewAirport from './components/newAirport/NewAirport';
import NewAirliner from './components/newAirliner/NewAirliner';
import EditFlight from './components/editFlight/EditFlight';
import EditAirport from './components/editAirport/EditAirport';
import EditAirliner from './components/editAirliner/EditAirliner';

const PrivateRoute = ({ component: Component, ...rest }) => 
(  
  <Route {...rest} render={props => 
  (
    store.getState().auth.isSignedIn ? <Component {...props} /> : <Redirect to={{pathname: '/login'}}/>
  )}/>
);


function App() {

  return (
    <div>
      <Router history={history}>
          <TopBar/>
          <div className="container">
            <SideBar />
            <Switch>
              <PrivateRoute path="/flights/newFlight" exact component={NewFlight} />
              <PrivateRoute path="/airports" exact component={AirportList} />
              <PrivateRoute path="/airports/newAirport" exact component={NewAirport} />
              <PrivateRoute path="/airliners/newAirliner" exact component={NewAirliner} />
              <PrivateRoute path="/admins/newAdmin" exact component={NewUser} />
              <PrivateRoute path="/" exact component={Home} />
              <PrivateRoute path="/admins" exact component={UserList} />
              <PrivateRoute path="/flights" exact component={ListFlights} />
              <PrivateRoute path="/airliners" exact component={AirlinerList} />
              <Route path="/login" exact>
                <Login />
              </Route>
              <PrivateRoute path="/airports/:id" exact component={EditAirport} />
              <PrivateRoute path="/flights/:id" exact component={EditFlight} />
              <PrivateRoute path="/airliners/:id" exact component={EditAirliner} />
              <PrivateRoute path="/admins/:id" exact component={User} />
              
            </Switch>
          </div>
      </Router>
    </div>
  )
}

export default App;
