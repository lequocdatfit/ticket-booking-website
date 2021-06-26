import React from 'react';
import { Field, reduxForm } from 'redux-form';
import './newUser.css';

function NewUser() {

  const onSubmit = (formValues) => {

  }

  const renderInput = ({ input, label, meta}) => {
    const className = `field ${meta.error && meta.touched ? 'error': ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {renderError(meta)}
      </div>
    )
  }

  const renderError = ({ error, touched}) => {
    if(touched && error) {
      return <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    }
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Admin</h1>
      <div className="formCard">
        <form onSubmit={onSubmit} className="ui form error">
          <Field name="email" component={renderInput} label="Email" />
          <Field name="fullName" component={renderInput} label="Full Name" />
          <Field name="phoneNumber" component={renderInput} label="Phone Number" />
          <button className="ui button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

const validate = formValues => {
  const error = {};
  if(!formValues.email) {
    error.email = 'You must enter email';
  }
  if(!formValues.fullName) {
    error.fullName = 'You must enter full name';
  }
  if(!formValues.phoneNumber) {
    error.phoneNumber = 'You must enter phone number';
  }
  return error;
}

export default reduxForm({
  form: 'newUserForm',
  validate: validate
})(NewUser)
