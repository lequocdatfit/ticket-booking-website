import React from 'react';
import './SideBar.css';
import { 
  LineStyle, 
  FlightTakeoff, 
  AirplanemodeActive, 
  EventNote,
  Group,
  LocationOn
} from '@material-ui/icons';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function SideBar(props) {
  const [selectedItem, setSelectedItem] = useState(1);
  if(!props.isSignedIn) return null;
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/">
            <li onClick={() => setSelectedItem(1)} className={`sidebarListItem ${selectedItem === 1 ? 'active' : ''}`}>
              
                <LineStyle className="sidebarIcon" />
                Home
              
            </li>
            </Link>
            <Link to="/admins">
            <li onClick={() => setSelectedItem(2)} className={`sidebarListItem ${selectedItem === 2 ? 'active' : ''}`}>
                <Group className="sidebarIcon" />
                Admins
            </li>
            </Link>
            <Link to="/flights">
            <li onClick={() => setSelectedItem(3)} className={`sidebarListItem ${selectedItem === 3 ? 'active' : ''}`}>
                <FlightTakeoff className="sidebarIcon" />
                Flights
            </li>
            </Link>
            <Link to="/airliners">
              <li onClick={() => setSelectedItem(4)} className={`sidebarListItem ${selectedItem === 4 ? 'active' : ''}`}>
                <AirplanemodeActive className="sidebarIcon" />
                Airliners
              </li>
            </Link>
            <Link to="/airports">
              <li onClick={() => setSelectedItem(5)} className={`sidebarListItem ${selectedItem === 5 ? 'active' : ''}`}>
                <LocationOn className="sidebarIcon" />
                Airports
              </li>
            </Link>
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
