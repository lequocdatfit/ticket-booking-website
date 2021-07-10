import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import BookingInFor from './BookingInFor';
import ListService from './ListService';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import Modal from './Modal';
import './selectService.css'


function SelectService(props) {
  const renderServices = () => {
    return (
      <div className="ui container grid" style={{ marginTop: 20 }}>
        <div className="eleven wide column">
          <ListService />
          <div className="div" style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '35px' }}>
            <Link to="/passengers" className="ui button">
              Quay lại
            </Link>
            <Link to="/billing-info" className="ui button primary">
              Tiếp tục
            </Link>
          </div>
        </div>
        <div className="five wide column">
          <BookingInFor />
        </div>
      </div>
    )
  }
  if(!props.startFrom) 
    return <Redirect to="/" />

  return (
    <div className="serviceBackground">
      <div className="ui container wrapper">
        <div className="search__info">
          {props.type === 'oneway' && <h3>CHUYẾN BAY MỘT CHIỀU | 1 Người lớn</h3>}
          {props.type === 'roundtrip' && <h3>CHUYẾN BAY KHỨ HỒI | 1 Người lớn</h3>}
          <div className="desciption">
            <p style={{ marginRight: 20 }}>
              <i style={{ marginRight: 10 }} className="fas fa-map-marker-alt"></i>
              Điểm Khởi hành: <span>{props.startFrom.name}</span>
            </p>
            <p>
              <i style={{ marginRight: 10 }} className="fas fa-map-marker-alt"></i>
              Điểm đến: <span>{props.destination.name}</span>
            </p>
          </div>
        </div>
        <div className="icons">
          <i style={{ color: '#fff', fontSize: '32px' }} className="fas fa-user-circle"></i>
        </div>
      </div>
      {renderServices()}

    </div>
  )
}

const selector = formValueSelector('FormBooking');
const mapStateToProps = (state) => {
  return {
    startFrom: selector(state, 'startFrom'),
    destination: selector(state, 'destination'),
    type: selector(state, 'type'),
    flights: Object.values(state.flights)
  }
}

export default connect(mapStateToProps)(SelectService);
