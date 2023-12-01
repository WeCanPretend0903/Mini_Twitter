import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootreducer from './reducers/rootReducer';

import { sessionService } from 'redux-react-session';

const initialState = {};
const middlewares = [thunk];

// Using the new createStore signature
const store = createStore(
  rootreducer,
  initialState,
  compose(applyMiddleware(...middlewares))
);

sessionService.initSessionService(store);

export default store;

