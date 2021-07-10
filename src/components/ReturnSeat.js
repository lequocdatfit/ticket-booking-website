import React from 'react';
import { connect } from 'react-redux';
import { selectReturnSeat, removeReturnSeat } from '../actions';

function Seat(props) {
  const seat = props.seat;

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
      <input type="checkbox" id={seat.id} 
        checked={props.selectedReturnSeat && props.selectedReturnSeat[seat.id]
           && props.selectedReturnSeat[seat.id].id === seat.id}
        disabled={seat.occupied}
        onChange={onClickReturnSeat} />
      <label htmlFor={seat.id}>{seat.id}</label>
    </li>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedReturnSeat: state.selectedReturnSeat
  }
}

export default connect(mapStateToProps, { selectReturnSeat, removeReturnSeat })(Seat)