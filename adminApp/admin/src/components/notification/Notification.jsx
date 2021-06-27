import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function Notification(props) {
  const { notify } = props;
  
  return (
    <Snackbar 
      open={notify.isOpen} 
      autoHideDuration={3000}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      
    >
      <Alert severity={notify.type}>
        {notify.message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
