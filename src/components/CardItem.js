import React from 'react';
import './CardItem.css';


function CardItem(props) {
  return (
    <div className="CardItem">
      <div className="left-content">
        <img src={props.src} alt="seat" />
        <div className="header">
          <h3>{props.heading}</h3>
          <p>{props.description}</p>
        </div>
      </div>
      <div className="right-content">
        <i class="fas fa-chevron-right"></i>
      </div>
    </div>
  )
}

export default CardItem;
