import ReactDOM from 'react-dom';
import React  from "react";
import { Provider } from 'react-redux';

import store from './myStore';
import App from "./App";


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
)
