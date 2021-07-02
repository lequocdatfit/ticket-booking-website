import React from 'react';

import Seat from './Seat';

import './Plane.css';

function Plane(props) {
  
  const renderSeats = props.cabinFuselage.map(cabin => {
    return (
      <ol className="cabin fuselage" key={cabin.index}>
        {
          cabin.rows.map(row => 
            <li className="row" key={row.rowIndex}>
              <ol className="seats" type="A">
              {row.seats.map(seat => {
                return (
                  <Seat seat={seat} />
                )
              })}
              </ol>
            </li>)
        }
      </ol>
      
    )
  });
  
  return (
    <div className="plane">
      <div className="cockpit">
        <h1>{props.airliner.manufacturer} {props.airliner.model}</h1>
      </div>
      <div className="exit exit--front fuselage">
      </div>
      {renderSeats}
      <div className="exit exit--back fuselage">

      </div>
    </div>
  )
}

export default Plane;