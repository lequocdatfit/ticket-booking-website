import React from 'react';
import ReactDOM from 'react-dom';
import history from '../../history';

function Modal(props) {
  const { redirect } = props;
  const type = props.type;
  return ReactDOM.createPortal(
    <div onClick={() => history.push(redirect)} className="ui dimmer modals visible active">
      <div onClick={(e) => e.stopPropagation()} className={`ui ${type ? type : ''} standard modal visible active`}>
        <div className="header">{props.header}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  )
}

export default Modal;
