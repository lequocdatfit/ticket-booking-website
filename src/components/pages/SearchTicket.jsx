import React from 'react';
import './searchTicket.css';
import SearchBookingImg from '../../public/images/searchBooking.jpg';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';


const renderTextField = ({ input, label, meta }) => {
  return (
    <TextField
      {...input}
      label={label}
      error={meta.touched && meta.invalid}
      id="outlined-size-small"
      defaultValue="Small"
      variant="outlined"
      size="small"
      style={{ width: '100%', marginBottom: '20px'}}
    />
  )
}

function SearchTicket(props) {

  const onSubmit = (formValues) => {

  }

  return (
    <div className="searchTicket">
      <div className="searchTicketContainer">
        <div className="searchTicketCard">
          <div className="formLeft">
            <h2 className="searchTicketHeading">CHUYẾN BAY CỦA TÔI</h2>
            <p>Bạn muốn xem chuyến bay đã đặt vui lòng điền thông tin bên dưới:
            </p>
            <form onSubmit={props.handleSubmit(onSubmit)} style={{marginTop: '30px', textAlign: 'center'}}>
              <Field name="pnr" component={renderTextField} label="Mã đặt chỗ" />
              <Field name="firstName" component={renderTextField} label="Họ"/>
              <Field name="lastName" component={renderTextField} label="Tên đệm & tên" />
              <button className="searchTicketButton">Tìm kiếm</button>
            </form>
          </div>
          <div className="cardRight">
          </div>
        </div>
      </div>
    </div>
  )
}

const SearchTicketForm = reduxForm({
  form: 'searchTicketForm',
})(SearchTicket);

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(SearchTicketForm)
