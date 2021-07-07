import React from 'react';
import ReactDOM from 'react-dom';
import history from '../../history';

function BookingModal(props) {
  const { redirect } = props;
  return ReactDOM.createPortal(
    <div onClick={() => history.push(redirect)} className="ui dimmer modals visible active">
      <div onClick={(e) => e.stopPropagation()} className="ui large standard modal visible active">
        <div className="header">{props.header}</div>
        <div className="scrolling content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  )
}

export default BookingModal;
