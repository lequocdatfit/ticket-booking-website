import React from 'react';
import CardItem from './CardItem';
import SeatImage from '../img/Seat.png';
import Luggage from '../img/luggage.png';

function ListService() {

  const onItemClick = () => {
    // show dialog
    
  }
  return (
    <div>
      <CardItem 
        src={SeatImage}
        heading="Chọn chỗ ngồi yêu thích"
        description="Hãy chọn chỗ ngồi yêu thích của bạn" />
      <CardItem 
        src={Luggage}
        heading="Chọn hành lý" 
        description="Hãy chọn gói hành lý phù hợp" />
    </div>
  )
}

export default ListService

