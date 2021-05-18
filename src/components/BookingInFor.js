import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

function BookingInFor(props) {

  const renderSelectFlight = () => {
    if (!props.selectedFlight) {
      return null;
    }
    return (
      <div>
        <p>{props.selectedFlight.takeOffTime}</p>
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
                <a>Elliot Fu</a> added <a>Jenny Hess</a> to the project
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
                {props.startFrom}
                <i style={{ marginLeft: 20, marginRight: 20 }} class="fas fa-plane"></i>
                {props.destination}
                {renderSelectFlight()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="extra content">
        <div class="header">Tổng tiền: </div>
      </div>
    </div>
  )
}

const selector = formValueSelector('FormBooking');

const mapStateToProps = (state) => {
  return {
    startFrom: selector(state, 'startFrom'),
    destination: selector(state, 'destination'),
    selectedFlight: state.selectedFlight
  }
}

export default connect(mapStateToProps)(BookingInFor);
