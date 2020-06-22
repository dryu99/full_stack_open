import { createStore, combineReducers, applyMiddleware } from 'redux'; // library that lets us maintain and organize application state in a single object with defined state manipulations
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import blogsReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';
// import filterReducer from './reducers/filterReducer';

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;