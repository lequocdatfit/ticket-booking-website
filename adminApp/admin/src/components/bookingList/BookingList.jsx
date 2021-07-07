import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

import './bookingList.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'pnr', headerName: 'PNR', width: 130 },
  { field: 'buyerName', headerName: "Buyer's Name", width: 130 },
  { field: 'buyerId', headerName: "Buyer's ID", width: 130 },
  { field: 'phoneNumber', headerName: "Phone Number", width: 130 },
  { field: 'address', headerName: "Address", width: 130 },
  { field: 'nationality', headerName: "Nation", width: 130 },
  { field: 'totalPrice', headerName: "TotalPrice", width: 130 },
];

function BookingList(props) {
  console.log(props.rows);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={props.rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  )
}


export default BookingList;
