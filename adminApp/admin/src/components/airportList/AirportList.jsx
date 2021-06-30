import React from 'react';
import './AirpotyList.css';
import { DataGrid } from '@material-ui/data-grid';
import { fetchAirports, deleteAirport } from '../../action';
import { connect } from 'react-redux'
import { useEffect, useState } from 'react';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Notification from '../notification/Notification';
import Modal from '../modal/Modal';




function AirportList(props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState(null);
  useEffect(() => {
    props.fetchAirports();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: "Airport's name", width: 200 },
    { field: 'location', headerName: 'Location', width: 150},
    { field: 'nation', headerName: 'Nation', width: 150},
    { field: 'action', headerName: 'Actions', width: 200, renderCell : (params) => {
      return (
        <>
          <Link to={"/airports/" + params.row._id}>
            <button className="AirportListEdit">Edit</button>
          </Link>
          <DeleteOutline className="AirportListDelete" onClick={() => onDeleteAirport(params.row)}/>
        </>
      )
    }}
  ];

  const onDeleteAirport = (airport) => {
    setSelectedAirport(airport);
    setShowModal(true);
  }

  const handleDelete = () => {
    props.deleteAirport(selectedAirport._id);
    setShowModal(false);
  }

  const actions = (
    <>
      <button onClick={() => handleDelete()} className="ui negative button">Confirm</button>
      <button onClick={() => setShowModal(false)} className="ui button">Back</button>
    </>
  )

  if(!props.airports) {
    return <div>Loading...</div>
  }
  return (
    <>
    <div className="airportList">
      <div className="airportTitleContainer">
        <h1 className="airportTitle">Airports</h1>
        <Link to='/airports/newAirport'>
          <button className="airportAddButton">Create</button>
        </Link>
      </div>
      <DataGrid rows={props.airports} disableSelectionOnClick columns={columns} pageSize={8} checkboxSelection />
    </div>
    {showModal ? <Modal redirect='/admins'
        actions={actions} header='Warning' content={`Do you want to delete ${selectedAirport.name} ?`} />: null}
    <Notification notify={props.alert}/>
    </>
  )
}

const mapStateToProps = (state) => {
  const airports = Object.values(state.airports);
  airports.forEach((airport, index) => {
    airport.id = index + 1
  });
  return {
    airports : airports,
    alert: state.alert
  }
}


export default connect(mapStateToProps, {fetchAirports, deleteAirport})(AirportList);
