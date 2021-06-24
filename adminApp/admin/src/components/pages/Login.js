import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../action';
import axios from 'axios';

function Login(props) {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", { email, password });
      this.props.signIn(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  return (
      <div className="container">
      {props.isSignedIn ? (
        <div>
          Đã đăng nhập
        </div>  
      
      ) : (
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
      )}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, { signIn })(Login)
