import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import './bookingInfo.css';

function BookingInFor(props) {
  const renderSelectFlight = () => {
    if (!props.selectedFlight) {
      return null;
    }
    return (
      <div>
        <div>Khởi hành lúc: {props.selectedFlight.takeOffTime}</div>
        <div>Hạ cánh lúc: {props.selectedFlight.landingTime}</div>
        <div>Loại vé: {props.selectedFlight.type}</div>
        <div className="ui content">
          Giá vé: <span className="ui header red">{parseInt(props.selectedFlight.price.value).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
        </div>
        <div className="ui content">
          Thuế: <span className="ui header red">{parseInt(props.selectedFlight.price.tax).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
        </div>
      </div>
    )
  }

  const renderSelectedReturnFlight = () => {
    if (!props.selectedReturnFlight) 
      return null;
    return (
      <div>
        <div>Khởi hành lúc: {props.selectedReturnFlight.takeOffTime}</div>
        <div>Hạ cánh lúc: {props.selectedReturnFlight.landingTime}</div>
        <div>Loại vé: {props.selectedReturnFlight.type}</div>
        <div className="ui content">
          Giá vé: <span className="ui header red">{parseInt(props.selectedReturnFlight.price.value).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
        </div>
        <div className="ui content">
          Thuế: <span className="ui header red">{parseInt(props.selectedReturnFlight.price.tax).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
        </div>
      </div>
    )
  }

  let totalPrice = 0;
  if(props.selectedFlight) {
    totalPrice += props.selectedFlight.totalPrice;
  }
  if(props.selectedReturnFlight) {
    totalPrice += props.selectedReturnFlight.totalPrice;
  }
  return (
    <div class="ui card customCard">
      <div class="content">
        <div class="header">Thông tin đặt chỗ</div>
      </div>
      <div class="content">
        <h4 class="ui sub header">Thông tin hành khách</h4>
        <div class="ui small feed">
          <div class="event">
            <div class="content">
              <div class="summary">
                {props.passenger.firstName && <span>Họ và tên: {props.passenger.firstName}</span>}
                {props.passenger.lastName && <span>{' ' + props.passenger.lastName}</span>}
                {props.passenger.passengerId && <p>CMND: {props.passenger.passengerId}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <h4 class="ui header">Chuyến đi</h4>
        <div class="ui small feed">
          <div class="event">
            <div class="content">
              <div class="summary">
                {props.startFrom.name}
                <i style={{ marginLeft: 20, marginRight: 20 }} class="fas fa-plane"></i>
                {props.destination.name}
                {renderSelectFlight()}
              </div>
            </div>
          </div>
        </div>
      </div>
      {props.type === 'roundtrip' &&
        <div className="content">
          <h4 class="ui header">Chuyến về</h4>
          <div class="ui small feed">
            <div class="event">
              <div class="content">
                <div class="summary">
                  {props.destination.name}
                  <i style={{ marginLeft: 20, marginRight: 20 }} class="fas fa-plane"></i>
                  {props.startFrom.name}
                  {renderSelectedReturnFlight()}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <div class="extra content">
        <div class="header">
          Tổng tiền:  <span className="ui header red">{totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
        </div>
      </div>
    </div>
  )
}

const selector = formValueSelector('FormBooking');
const selectorPassenger = formValueSelector('passenger');

const mapStateToProps = (state) => {
  const selectedFlight = state.selectedFlight;
  if (selectedFlight) {
    const takeOffTime = new Date(selectedFlight.takeOffTime);
    selectedFlight.takeOffTime = takeOffTime.toLocaleString();
    const landingTime = new Date(selectedFlight.landingTime);
    selectedFlight.landingTime = landingTime.toLocaleString();
  }
  const selectedReturnFlight = state.selectedReturnFlight;
  if(selectedReturnFlight) {
    const takeOffTime = new Date(selectedReturnFlight.takeOffTime);
    selectedReturnFlight.takeOffTime = takeOffTime.toLocaleString();
    const landingTime = new Date(selectedReturnFlight.landingTime);
    selectedReturnFlight.landingTime = landingTime.toLocaleString();
  }
  return {
    startFrom: selector(state, 'startFrom'),
    destination: selector(state, 'destination'),
    selectedFlight: selectedFlight,
    selectedReturnFlight: selectedReturnFlight,
    type: selector(state, 'type'),
    passenger: selectorPassenger(state, 'firstName', 'lastName', 'passengerId'),
  }
}

export default connect(mapStateToProps)(BookingInFor);
