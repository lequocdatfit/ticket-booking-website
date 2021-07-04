import React from 'react';
import './bookingSuccess.css';
import { connect } from 'react-redux'


function BookingSuccess(props) {
  const { ticket, flight } = props;
  return (
    <div className="bookingSuccess">
      <div className="ui card ticket">
        <div className="content">
          <div className="header header--green">Đặt vé thành công!</div>
        </div>
        <div className="content">
          <h4 className="ui sub header">Thông tin đặt vé</h4>
          <div className="ui small feed ticket-info">
            <div className="event">
              <div className="content">
                <div className="summary center">
                  
                  <span>Mã đặt chỗ: {ticket.pnr}</span>
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="summary center">
                  <span>Hành khách: {ticket.buyerName}</span>
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="summary center">
                  {flight.startFrom.name}
                  <i style={{ marginLeft: 20, marginRight: 20 }} class="fas fa-plane"></i>
                  {flight.destination.name}
                  <div>
                    <span>Khởi hành lúc: {flight.takeOffTime}</span>
                    <div> Hạ cánh lúc: {flight.landingTime}</div>
                    <div className="ui content">
                      Giá vé: <span className="ui header red">{ticket.totalPrice} VNĐ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const flight = state.selectedFlight;
  const takeOffTime = new Date(flight.takeOffTime);
  const landingTime = new Date(flight.landingTime);
  flight.takeOffTime = takeOffTime.toLocaleString();
  flight.landingTime = landingTime.toLocaleString();
  return {
    ticket: state.ticket,
    flight: flight,
  }
}

export default connect(mapStateToProps)(BookingSuccess)
