import React from 'react';
import CardItem from './CardItem';
import SeatImage from '../img/Seat.png';
import Luggage from '../img/luggage.png';
import Plane from './Plane';

import { connect } from 'react-redux';

function ListService(props) {

  const onItemClick = () => {
    // show dialog 
  }

  const SeatsMapcontent = (
    <Plane airliner={props.airliner} cabinFuselage={props.flight.cabinFuselage}/>
  )

  const LuggageContent = (
    <p>Hãy chọn gói hành lý </p>
  )

  const SeatMapAction = (
    <>
      <button className="ui primary button">Chọn</button>
      <button className="ui button">Thoát</button>
    </>
  )

  const LuggageAction = (
    <>
      <button className="ui primary button">Chọn</button>
      <button className="ui button">Thoát</button>
    </>
  )

  return (
    <div>
      <CardItem 
        src={SeatImage}
        heading="Chọn chỗ ngồi yêu thích"
        description="Hãy chọn chỗ ngồi yêu thích của bạn" 
        content={SeatsMapcontent}
        actions={SeatMapAction}
        />
      <CardItem 
        src={Luggage}
        heading="Chọn hành lý" 
        description="Hãy chọn gói hành lý phù hợp"
        content={LuggageContent}
        actions={LuggageAction} />
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

