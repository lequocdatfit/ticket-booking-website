import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function Notification(props) {
  const { notify, setNotify } = props;
  const handleClose = (event, reason) => {
    setNotify({
      ...notify,
      isOpen: false
    })
  }
  return (
    <Snackbar 
      open={notify.isOpen} 
      autoHideDuration={3000}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      onClose={handleClose}
    >
      <Alert severity={notify.type}>
        {notify.message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
