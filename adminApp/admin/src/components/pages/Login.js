import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../action';
import { Redirect } from 'react-router-dom';
import history from '../../history';
import './Login.css';

function Login(props) {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      props.signIn({email, password});
    } catch (err) {
      console.log(err);
    }
  };

  if(props.isSignedIn) {
    return <Redirect to="/" />
  }
  return (
      <div className="container">
        <div className="login">
          <form onSubmit={handleSubmit}>
            <span className="formTitle">Login</span>
            <input
              type="text"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {props.alert.isOpen && <p className="error">{props.alert.message}</p>}
            <button type="submit" className="submitButton">
              Login
            </button>
          </form>
        </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    alert: state.alert
  }
}

export default connect(mapStateToProps, { signIn })(Login)
