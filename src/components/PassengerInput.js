import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, Dropdown } from 'semantic-ui-react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const countryOptions = [
  { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
  { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
  { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
  { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
  { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
  { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
  { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
  { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
  { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
  { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
  { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
  { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
  { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
  { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
  { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
  { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
  { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
  { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
  { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
  { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
  { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
  { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
  { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
  { key: 'vn', value: 'vn', flag: 'vn', text: 'Viet Nam' }
]


const renderTextField = ({ input, placeholder }) => {
  return (
    <Form.Field>
      <input type="text"
        {...input}
        placeholder={placeholder} />
    </Form.Field>
  )
}

const renderSelectField = ({ input, label }) => {
  return (
    <Form.Field>
      <Dropdown
        selection
        value={input.value}
        onChange={(param, data) => input.onChange(data.value)}
        placeholder={label}
        fluid
        search
        options={countryOptions}
      />
    </Form.Field>
  )
}

const renderDatePicker = ({ input }) => {
  console.log(input);
  return (
    <Form.Field>
      <DatePicker selected={input.value} onChange={input.onChange} />
    </Form.Field>
  )
}


function PassengerInput() {
  return (
    <Form>
      <h4 class="ui dividing header">Thông tin hành khách</h4>
      <label>Họ và tên</label>
      <Form.Group widths="equal">
        <Field name="firstName" placeholder="Họ" component={renderTextField} />
        <Field name="lastName" placeholder="Tên đệm & tên" component={renderTextField} />
      </Form.Group>
      <Form.Group widths="equal">
        <Field name="birthDay" label="Birth Day" component={renderDatePicker} />
        <Field name="country" label="Quốc gia" component={renderSelectField} />
      </Form.Group>
      <label>Địa chỉ</label>
      <Form.Group widths="equal">
        <Field name="address" placeholder="Địa chỉ" component={renderTextField} />
      </Form.Group>
      <Form.Group widths="equal">
        <Field name="email" placeholder="Địa chỉ emal" component={renderTextField} />
      </Form.Group>
      <Form.Group>
        <Field name="phone" placeholder="Số điện thoại" component={renderTextField} />
      </Form.Group>
    </Form>
  )
}

const mapStateToProps = (state) => {
  return {

  }
}

const wrapper = reduxForm({
  form: 'passenger',
})(PassengerInput);

export default connect(null)(wrapper);