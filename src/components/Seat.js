import React from 'react';
import { connect } from 'react-redux';
import { selectSeat, removeSeat, selectReturnSeat, removeReturnSeat } from '../actions';

function Seat(props) {
  const seat = props.seat;

  function onClickSeat() {
    let isSelected = false;
    console.log(props.selectedSeat);
    if(props.selectedSeat[seat.id] != undefined) {
      isSelected = true;
    }
    console.log(isSelected);
    if(isSelected) {
      props.removeSeat(seat);
    } else {
      props.selectSeat(seat);
    }
  }

  function onClickReturnSeat() {
    let isSelected = false;
    console.log(props.selectedReturnSeat);
    if(props.selectedReturnSeat[seat.id] != undefined) {
      isSelected = true;
    }
    console.log(isSelected);
    if(isSelected) {
      props.removeReturnSeat(seat);
    } else {
      props.selectReturnSeat(seat);
    }
  }

  return (
    <li class="seat" key={seat.id}>
      <input type="checkbox" disabled={seat.occupied} id={seat.id} />
      <label onClick={props.return ? onClickReturnSeat : onClickSeat} htmlFor={seat.id}>{seat.id}</label>
    </li>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedSeat : state.selectedSeat,
    selectedReturnSeat: state.selectedReturnSeat
  }
}

export default connect(mapStateToProps, { selectSeat, removeSeat, selectReturnSeat, removeReturnSeat })(Seat)