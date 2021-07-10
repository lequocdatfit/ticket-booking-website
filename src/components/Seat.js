import React from 'react';
import { connect } from 'react-redux';
import { selectSeat, removeSeat } from '../actions';

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

  return (
    <li class="seat" key={seat.id}>
      <input type="checkbox" id={seat.id} 
        checked={props.selectedSeat && props.selectedSeat[seat.id] 
          && props.selectedSeat[seat.id].id === seat.id}
        disabled={seat.occupied}
        onChange={onClickSeat} />
      <label htmlFor={seat.id}>{seat.id}</label>
    </li>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedSeat : state.selectedSeat,
  }
}

export default connect(mapStateToProps, { selectSeat, removeSeat })(Seat)