import React from 'react';
import './TopBar.css';
import { NotificationsNone, Language, Settings } from '@material-ui/icons';
import { signOut } from '../../action'
import { connect } from 'react-redux';

function TopBar(props) {
  if (!props.isSignedIn) return null;
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconsContainer">
            <NotificationsNone />
            <span className="topIconBag">
              2
            </span>
          </div>
          <div className="topbarIconsContainer">
            <Language />
            <span className="topIconBag">
              2
            </span>
          </div>
          <div className="topbarIconsContainer">
            <Settings />
            <span className="topIconBag">
              2
            </span>
          </div>
          <div className="topbarIconsContainer">
          <img style={{marginRight: '10xp'}} src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="avatar" className="topAvatar" />
          </div>
          

          <button  className="ui red button tiny" onClick={() => props.signOut()}>Sign Out</button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, { signOut })(TopBar)
