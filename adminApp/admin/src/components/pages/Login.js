import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../action';
import { Redirect } from 'react-router-dom';
import history from '../../history';

import axios from 'axios';
import './Login.css';

function Login(props) {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("authentication/login", { email, password });
      props.signIn(res.data);
      history.push('/');
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
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, { signIn })(Login)
