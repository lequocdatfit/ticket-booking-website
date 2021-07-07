import React from 'react';
import './listFlights.css';
import { DataGrid } from '@material-ui/data-grid';
import { fetchFLights, deleteFlight, fetchBookings } from '../../action';
import { useEffect, useState } from 'react';
import { DeleteOutline, EventNote } from '@material-ui/icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Notification from '../notification/Notification';
import BookingList from '../bookingList/BookingList';
import Modal from '../modal/Modal';
import BookingModal from '../bookingModal/BookingModal';


function ListFlights(props) {
  const [showModal, setShowModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  useEffect(() => {
    props.fetchFLights();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'takeOffTime', headerName: 'Take-off time', width: 130 },
    { field: 'landingTime', headerName: 'landing time', width: 130 },
    { 
      field: 'startFrom', headerName: 'Start From', width: 130, 
      valueFormatter: ({value}) => value.name
    },
    { field: 'destination', headerName: 'Destination', width: 130, 
      valueFormatter: ({value}) => value.name
    },
    { field: 'type', headerName: 'Type', width: 110 },
    { field: 'airliner', headerName: 'Airliner', width: 130,
      valueFormatter: ({value}) => value.manufacturer + ' ' + value.model },
    { field: 'action', headerName: 'Actions', width: 200, renderCell : (params) => {
      return (
        <>
          <Link to={"/flights/" + params.row._id}>
            <button className="FlightListEdit">Edit</button>
          </Link>
          <EventNote className="FlightListBooking" onClick={() => onShowBooking(params.row)} />
          <DeleteOutline
           className="FlightListDelete" onClick={() => onDeleteFlight(params.row)} />
        </>
      )
    }}
  ];

  const onShowBooking = (flight) => {
    props.fetchBookings(flight._id);
    setShowBookingModal(true);
  }

  const onDeleteFlight = (flight) => {
    setSelectedFlight(flight);
    setShowModal(true);
  }

  const handleDelete = () => {
    props.deleteFlight(selectedFlight);
    setShowModal(false);
  }
  
  const actions = (
    <>
      <button onClick={() => handleDelete()} className="ui negative button">Confirm</button>
      <button onClick={() => setShowModal(false)} className="ui button">Back</button>
    </>
  )

  const bookingAction = (
    <>
      <button onClick={() => setShowBookingModal(false)} className="ui button">Cancel</button>
    </>
  )

  if(!props.flights) 
    return <div>Loading...</div>
  
  return (
    <div className="listFlights">
      <div className="flightTitleContainer">
        <h1 className="flightTitle">Flights</h1>
        <Link to="/flights/newFlight">
          <button className="flightAddButton">Create</button>
        </Link>
      </div>
      <DataGrid rows={props.flights} disableSelectionOnClick columns={columns} pageSize={9} checkboxSelection />
      <Notification notify={props.alert}/>
      {showModal ? <Modal redirect='/flights'
        actions={actions} header='Warning' content={`Do you want to delete flight with Id: ${selectedFlight.id} ?`} />: null}
      {
        showBookingModal ? <BookingModal redirect='/flights'
        actions={bookingAction} header="Booking List" content={BookingList} /> : null
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  const flights = Object.values(state.flights);
  flights.forEach((flight, index) => {
    flight.id = flight.flightId
    /* if(flight.takeOffTime) {
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
    } */
    
  });
  return {
    flights: flights,
    alert: state.alert
  }
}

export default connect(mapStateToProps, { fetchFLights, deleteFlight, fetchBookings })(ListFlights);
