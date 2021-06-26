import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { loadState, saveState } from "./localStorage";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = {
  auth: loadState(),
  admins: [],
}
const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)));
store.subscribe(() => {
  saveState(store.getState().auth);
})

export default store;