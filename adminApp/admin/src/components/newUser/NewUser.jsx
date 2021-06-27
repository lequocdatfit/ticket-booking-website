import React from 'react';

import { connect } from 'react-redux';
import { createAdmin } from '../../action';
import NewUserForm from '../newUserForm/NewUserForm.jsx';
import Notification from '../notification/Notification';
import './newUser.css';


function NewUser(props) {
  const handleSubmit = (formValues) => {
    props.createAdmin({...formValues, checkpass: undefined});
  }

  return (
    <>
    <div className="newUser">
      <h1 className="newUserTitle">New Admin</h1>
      <div className="formCard">
        <NewUserForm onSubmit={handleSubmit} />
      </div>
    </div>
    <Notification 
    notify={props.alert} />
  </>
  )
}

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
  }
}


export default connect(mapStateToProps, { createAdmin })(NewUser)
