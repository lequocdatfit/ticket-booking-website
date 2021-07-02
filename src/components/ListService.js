import React, { useState } from 'react';
import CardItem from './CardItem';
import SeatImage from '../img/Seat.png';
import Luggage from '../img/luggage.png';
import Plane from './Plane';

import { connect } from 'react-redux';

function ListService(props) {
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [showLuggageModal, setShowLuggageModal] = useState(false);
  
  const SeatsMapcontent = (
    <Plane airliner={props.airliner} cabinFuselage={props.flight.cabinFuselage}/>
  )

  const LuggageContent = (
    <p>Hãy chọn gói hành lý </p>
  )

  const SeatMapAction = () => {
    return (
      <button onClick={() => setShowSeatModal(!showSeatModal)} className="ui primary button">OK</button>
    )
  }
    
  const LuggageAction = () => {
    return (
      <button onClick={() => setShowLuggageModal(!showLuggageModal)} className="ui primary button">OK</button>
    )
  }

  const onSeatOutSideClick = () => {
    setShowSeatModal(!showSeatModal);
  }
  const onLuggageOutSideClick = () => {
    setShowLuggageModal(!showLuggageModal);
  }

  return (
    <div>
      <CardItem 
        src={SeatImage}
        heading="Chọn chỗ ngồi yêu thích"
        description="Hãy chọn chỗ ngồi yêu thích của bạn" 
        content={SeatsMapcontent}
        actions={SeatMapAction}
        showModal={showSeatModal}
        onOutSideClick={onSeatOutSideClick}
        />
      <CardItem 
        src={Luggage}
        heading="Chọn hành lý" 
        description="Hãy chọn gói hành lý phù hợp"
        content={LuggageContent}
        actions={LuggageAction}
        showModal={showLuggageModal}
        onOutSideClick={onLuggageOutSideClick} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    airliner : state.selectedFlight.airliner,
    flight: state.selectedFlight
  }
}

export default connect(mapStateToProps, {})(ListService)

