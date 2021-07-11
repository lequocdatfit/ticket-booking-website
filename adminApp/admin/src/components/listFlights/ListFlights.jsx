import React from 'react';
import './listFlights.css';
import { DataGrid } from '@material-ui/data-grid';
import { 
  fetchFLights,
  deleteFlight,
  fetchBookings, 
  clearBookings, 
  deleteBooking 
} from '../../action';
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
    { field: 'takeOffTime', headerName: 'Take-off time', width: 140, 
      valueFormatter: ({value}) => new Date(value).toLocaleString() },
    { field: 'landingTime', headerName: 'landing time', width: 140, 
      valueFormatter: ({value}) => new Date(value).toLocaleString() },
    { 
      field: 'startFrom', headerName: 'Start From', width: 120, 
      valueFormatter: ({value}) => value.name
    },
    { field: 'destination', headerName: 'Destination', width: 120, 
      valueFormatter: ({value}) => value.name
    },
    { field: 'type', headerName: 'Type', width: 100 },
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
    props.clearBookings();
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
      <button onClick={() => setShowModal(false)} className="ui negative button">No</button>
      <button onClick={() => handleDelete()} className="ui positive button">Yes</button>
    </>
  )

  const bookingAction = (
    <>
      <button onClick={() => setShowBookingModal(false)} className="ui positive button">Done</button>
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
      {showModal ? <Modal redirect='/flights' type="tiny"
        actions={actions} header='Warning' content={`Do you want to delete flight with Id: ${selectedFlight.id} ?`} />: null}
      {
        showBookingModal ? <BookingModal redirect='/flights'
        actions={bookingAction} header="Booking List" content={<BookingList rows={props.bookings} onDelete={props.deleteBooking} />} /> : null
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  const flights = Object.values(state.flights);
  flights.forEach((flight, index) => {
    flight.id = flight.flightId;
    
  });
  const bookings = Object.values(state.bookings);
  bookings.forEach((booking, index) => {
    booking.id = index + 1;
  });
  return {
    flights: flights,
    bookings: bookings,
    alert: state.alert
  }
}

export default connect(mapStateToProps, { fetchFLights, deleteFlight, fetchBookings, clearBookings, deleteBooking })(ListFlights);
