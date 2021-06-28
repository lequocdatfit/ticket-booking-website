import React from 'react';
import './listFlights.css';
import { DataGrid } from '@material-ui/data-grid';
import { fetchFLights } from '../../action';
import { useEffect } from 'react';
import { DeleteOutline } from '@material-ui/icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function ListFlights(props) {

  useEffect(() => {
    props.fetchFLights();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'takeOffTime', headerName: 'Take-off time', width: 130 },
    { field: 'landingTime', headerName: 'landing time', width: 130 },
    { 
      field: 'startFrom', headerName: 'Start From', width: 130, 
      valueFormatter: ({value}) => value.name
    },
    { field: 'destination', headerName: 'Destination', width: 130, 
      valueFormatter: ({value}) => value.name
    },
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'airliner', headerName: 'Airliner', width: 130,
      valueFormatter: ({value}) => value.manufacturer + ' ' + value.model },
    { field: 'action', headerName: 'Actions', width: 200, renderCell : (params) => {
      return (
        <>
          <Link to={"/flights/" + params.row._id}>
            <button className="FlightListEdit">Edit</button>
          </Link>
          <DeleteOutline className="FlightListDelete" />
        </>
      )
    }}
  ];
  
  if(!props.flights) 
    return <div>Loading...</div>
  return (
    <div className="listFlights">
        <DataGrid rows={props.flights} disableSelectionOnClick columns={columns} pageSize={9} checkboxSelection />
    </div>
  )
}

const mapStateToProps = (state) => {
  const flights = Object.values(state.flights);
  flights.forEach((flight, index) => {
    flight.id = flight.flightId
    if(flight.takeOffTime) {
      let d = new Date(flight.takeOffTime);
      let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
      let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
      let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
      flight.takeOffTime = `${ye}-${mo}-${da}`;
    }
    if(flight.landingTime) {
      let d = new Date(flight.landingTime);
      let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
      let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
      let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
      flight.landingTime = `${ye}-${mo}-${da}`;
    }
    
  });
  return {
    flights: flights
  }
}

export default connect(mapStateToProps, { fetchFLights })(ListFlights);
