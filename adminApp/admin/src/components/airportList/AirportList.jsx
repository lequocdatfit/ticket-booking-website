import React from 'react';
import './AirpotyList.css';
import { DataGrid } from '@material-ui/data-grid';
import { fetchAirports } from '../../action';
import { connect } from 'react-redux'
import { useEffect } from 'react';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';

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
        <DeleteOutline className="AirportListDelete" />
      </>
    )
  }}
];


function AirportList(props) {
  useEffect(() => {
    props.fetchAirports();
  }, []);

  if(!props.airports) {
    return <div>Loading...</div>
  }
  return (
    <div className="airportList">
       <DataGrid rows={props.airports} disableSelectionOnClick columns={columns} pageSize={5} checkboxSelection />
    </div>
  )
}

const mapStateToProps = (state) => {
  const airports = Object.values(state.airports);
  airports.forEach((airport, index) => {
    airport.id = index + 1
  });
  return {
    airports : airports
  }
}

export default connect(mapStateToProps, {fetchAirports})(AirportList);
