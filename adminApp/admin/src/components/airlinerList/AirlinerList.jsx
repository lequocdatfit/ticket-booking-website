import React from 'react';
import './airlinerList.css';
import { DataGrid } from '@material-ui/data-grid';
import { fetchAirliners, deleteAirliner } from '../../action';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteOutline } from '@material-ui/icons';
import Notification from '../notification/Notification';
import Modal from '../modal/Modal';

function AirlinerList(props) {
  const [selectedAirliner, setSelectedAirliner] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
          <Link to={"/airliners/" + params.row._id}>
            <button className="AirlinerListEdit">Edit</button>
          </Link>
          <DeleteOutline className="AirlinerListDelete" onClick={() => onDeleteAirliner(params.row)}/>
        </>
      )
    }}
  ];

  const onDeleteAirliner = (airliner) => {
    setSelectedAirliner(airliner);
    setShowModal(true);
  }

  const handleDelete = () => {
    props.deleteAirliner(selectedAirliner._id);
    setShowModal(false);
  }

  const actions = (
    <>
      <button onClick={() => handleDelete()} className="ui negative button">Confirm</button>
      <button onClick={() => setShowModal(false)} className="ui button">Back</button>
    </>
  )
  
  if(!props.airliners) 
    return <div>Loading...</div>
  return (
    <>
    <div className="airlinerList">
      <div className="airlinerTitleContainer">
        <h1 className="airlinerTitle">Airliners</h1>
        <Link to="/airliners/newAirliner">
          <button className="airlinerAddButton">Create</button>
        </Link>
      </div>
        <DataGrid rows={props.airliners} disableSelectionOnClick columns={columns} pageSize={9} checkboxSelection />
    </div>
    {showModal ? <Modal redirect='/airliners'
        actions={actions} header='Warning' content={`Do you want to delete ${ selectedAirliner.manufacturer + ' ' + selectedAirliner.model} ?`} />: null}
    <Notification notify={props.alert} />
    </>
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
    airliners: airliners,
    alert: state.alert
  }
}

export default connect(mapStateToProps, { fetchAirliners, deleteAirliner })(AirlinerList);
