import React from 'react';
import './airlinerList.css';
import { DataGrid } from '@material-ui/data-grid';
import { fetchAirliners } from '../../action';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteOutline } from '@material-ui/icons';

function AirlinerList(props) {

  useEffect(() => {
    props.fetchAirliners();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'model', headerName: 'Model', width: 150},
    { field: 'manufacturer', headerName: 'Manufacturer', width: 150},
    { field: 'dateOfCommissioning', headerName: 'Date of Commissioning', width: 200},
    { field: 'passengerCapacity', headerName: 'Passenger capacity', width: 200,
      valueFormatter: ({value}) => value[0].amount + value[1].amount + value[2].amount},
    { field: 'action', headerName: 'Actions', width: 200, renderCell: (params) => {
      return (
        <>
          <Link to={"/airports/" + params.row._id}>
            <button className="AirlinerListEdit">Edit</button>
          </Link>
          <DeleteOutline className="AirlinerListDelete" />
        </>
      )
    }}
  ];
  
  if(!props.airliners) 
    return <div>Loading...</div>
  return (
    <div className="airlinerList">
        <DataGrid rows={props.airliners} disableSelectionOnClick columns={columns} pageSize={9} checkboxSelection />
    </div>
  )
}

const mapStateToProps = (state) => {
  const airliners = Object.values(state.airliners);
  airliners.forEach((airliner, index) => {
    airliner.id = index + 1;
    if(airliner.dateOfCommissioning) {
      let d = new Date(airliner.dateOfCommissioning);
      let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
      let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
      let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
      airliner.dateOfCommissioning = `${ye}-${mo}-${da}`;
    }
  });
  return {
    airliners: airliners
  }
}

export default connect(mapStateToProps, { fetchAirliners })(AirlinerList);
