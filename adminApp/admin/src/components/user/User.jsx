import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { useEffect, useState } from "react";
import { fetchAdmin, editAdmin } from "../../action";
import Notification from "../notification/Notification";
import "./user.css";

function User(props) {
  const [fullName, setFullName] = useState(props.admin.fullName);
  const [email, setEmail] =useState(props.admin.email);
  const [phoneNumber, setPhoneNumber] = useState(props.admin.phoneNumber);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: ''});
  useEffect(() => {
    props.fetchAdmin(props.match.params.id)
  }, [])

  const handleSubmit = (event) => {
    props.editAdmin(props.admin._id, {fullName, email, phoneNumber});
    props.fetchAdmin(props.match.params.id)
    setNotify({ isOpen: true, message: 'Update infomation success!', type: 'success'});
    event.preventDefault();
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

  if(!props.admin) {
    return <div className="others">Loading...</div>
  }
  return (
    <>
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{props.admin.fullName}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{props.admin.dateCreated}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{props.admin.phoneNumber}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{props.admin.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form onSubmit={handleSubmit} className="userUpdateForm">
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
        </div>
      </div>
    </div>
    <Notification 
      notify={notify}
      setNotify={setNotify} 
    />
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    admin: state.admins[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, {fetchAdmin, editAdmin})(User);