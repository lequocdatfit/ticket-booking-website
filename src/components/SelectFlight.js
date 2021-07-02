import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BookingInFor from './BookingInFor';
import { formValueSelector } from 'redux-form';
import { Link } from 'react-router-dom';
import { searchFlights } from '../actions';
import ListFlight from './ListFlight';
import './SelectFlight.css'

function SelectFlight(props) {
  useEffect(() => {
    props.searchFlights({
      date: props.departureDay,
      start: props.startFrom._id,
      destination: props.destination._id,
      passenger: 1 
    });
  }, []);

  const renderFlights = () => {
    if (!props.flights) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="ui container grid" style={{ marginTop: 20 }}>
          <div className="ten wide column">
            <ListFlight flights={props.flights} />
            <div className="div" style={{ textAlign: 'center' }}>
              <Link to="/passengers" className="ui button primary">
                Tiếp tục
              </Link>

            </div>
          </div>
          <div className="six wide column">
            <BookingInFor />
          </div>

        </div>
      )
    }
  }
  return (
    <div>
      <div className="ui container wrapper">
        <div className="search__info">
          <h3>CHUYẾN BAY MỘT CHIỀU | 1 Người lớn</h3>
          <div className="desciption">
            <p style={{ marginRight: 20 }}>
              <i style={{ marginRight: 10 }} className="fas fa-map-marker-alt"></i>
              Điểm Khởi hành <span>{props.startFrom.name}</span>
            </p>
            <p>
              <i style={{ marginRight: 10 }} className="fas fa-map-marker-alt"></i>
              Điểm đến <span>{props.destination.name}</span>
            </p>
          </div>
        </div>
        <div className="icons">
          <i style={{ color: '#fff', fontSize: '32px' }} className="fas fa-user-circle"></i>
        </div>
      </div>
      {renderFlights()}

    </div>
  )
}

const selector = formValueSelector('FormBooking');
const mapStateToProps = (state) => {
  return {
    startFrom: selector(state, 'startFrom'),
    destination: selector(state, 'destination'),
    departureDay: selector(state, 'departureDay'),
    type: selector(state, 'type'),
    flights: Object.values(state.flights)
  }
}

export default connect(mapStateToProps, { searchFlights })(SelectFlight);
