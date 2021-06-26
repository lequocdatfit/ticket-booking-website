import React from 'react';
import './SideBar.css';
import { 
  LineStyle, 
  FlightTakeoff, 
  AirplanemodeActive, 
  EventNote,
  Group
} from '@material-ui/icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function SideBar(props) {
  if(!props.isSignedIn) return null;
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem active">
              <Link to="/">
                <LineStyle className="sidebarIcon" />
                Home
              </Link>
            </li>
            <Link to="/admins">
            <li className="sidebarListItem">
                <Group className="sidebarIcon" />
                Admins
            </li>
            </Link>
            <li className="sidebarListItem">
              <FlightTakeoff className="sidebarIcon" />
              Flights
            </li>
            <li className="sidebarListItem">
              <AirplanemodeActive className="sidebarIcon" />
              Planes
            </li>
            <li className="sidebarListItem">
              <EventNote className="sidebarIcon" />
              Booking
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}


export default connect(mapStateToProps)(SideBar);
