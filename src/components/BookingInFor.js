import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

function BookingInFor(props) {
  console.log(props.passenger);
  const renderSelectFlight = () => {
    if (!props.selectedFlight) {
      return null;
    }
    return (
      <div>
        <div>Khởi hành lúc: {props.selectedFlight.takeOffTime}</div>
        <div>Hạ cánh lúc: {props.selectedFlight.landingTime}</div>
        <div className="ui content">
          Giá vé: <span className="ui header red">{props.selectedFlight.price.value} VNĐ</span>
        </div>
        <div className="ui content">
          Thuế: <span className="ui header red">{props.selectedFlight.price.tax} VNĐ</span>
        </div>
      </div>
    )
  }
  return (
    <div class="ui card">
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
                {props.passenger.passengerId && <p>CMND: {props.passenger.passengerId}</p> }
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
      <div class="extra content">
        <div class="header">
          Tổng tiền: {props.selectedFlight? <span className="ui header red">{props.selectedFlight.totalPrice} VNĐ</span> : null} 
        </div>
      </div>
    </div>
  )
}

const selector = formValueSelector('FormBooking');
const selectorPassenger = formValueSelector('passenger');

const mapStateToProps = (state) => {
  const selectedFlight = state.selectedFlight;
  if(selectedFlight) {
    const takeOffTime = new Date(selectedFlight.takeOffTime);
    selectedFlight.takeOffTime = takeOffTime.toLocaleString();
    const landingTime = new Date(selectedFlight.landingTime);
    selectedFlight.landingTime = landingTime.toLocaleString();
  }
  return {
    startFrom: selector(state, 'startFrom'),
    destination: selector(state, 'destination'),
    selectedFlight: selectedFlight,
    passenger: selectorPassenger(state, 'firstName', 'lastName', 'passengerId'),
  }
}

export default connect(mapStateToProps)(BookingInFor);
