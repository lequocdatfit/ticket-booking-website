import React from 'react';
import BtnIcon from './BtnIcon';
import './SelectFlight.css'

function SelectFlight() {
  return (
    <div>
      <div className="ui container wrapper">
        <div className="search__info">
          <h3>CHUYẾN BAY MỘT CHIỀU | 1 Người lớn</h3>
          <div className="desciption">
            <p><i class="fas fa-map-marker-alt"></i>Điểm Khởi hành</p>
            <p><i class="fas fa-map-marker-alt"></i>Điểm đến</p>
          </div>
        </div>
        <div className="icons">
          <i style={{color: '#fff', fontSize: '32px'}} class="fas fa-user-circle"></i>
          
        </div>
      </div>
    </div>
  )
}

export default SelectFlight
