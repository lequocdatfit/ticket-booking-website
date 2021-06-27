import React from 'react'

import { useState } from "react";
import { connect } from 'react-redux';
import Notification from "../notification/Notification";

function UserForm(props) {
  const [fullName, setFullName] = useState(props.admin.fullName);
  const [email, setEmail] =useState(props.admin.email);
  const [phoneNumber, setPhoneNumber] = useState(props.admin.phoneNumber);
  //const [notify, setNotify] = useState({ isOpen: false, message: '', type: ''});

  const onSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit({fullName, email, phoneNumber});
    //setNotify({ isOpen: true, message: 'Update infomation success!', type: 'success'});
  }

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    switch(name) {
      case "fullName":
        setFullName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  }

  return (
    <>
    <form onSubmit={onSubmit} className="userUpdateForm">
      <div className="userUpdateLeft">
        <div className="userUpdateItem">
          <label>Full Name</label>
          <input
            name="fullName"
            type="text"
            value={fullName}
            onChange={handleInputChange}
            className="userUpdateInput"
          />
        </div>
        <div className="userUpdateItem">
          <label>Email</label>
          <input
            name="email"
            type="text"
            value={email}
            onChange={handleInputChange}
            className="userUpdateInput"
          />
        </div>
        <div className="userUpdateItem">
          <label>Phone</label>
          <input
            name="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={handleInputChange}
            className="userUpdateInput"
          />
        </div>
        <button type="submit" className="userUpdateButton">Update</button>
      </div>

    </form>
    <Notification 
      notify={props.alert} />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    alert: state.alert
  }
}

export default connect(mapStateToProps)(UserForm)
