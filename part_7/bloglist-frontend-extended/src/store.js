import { createStore, combineReducers, applyMiddleware } from 'redux'; // library that lets us maintain and organize application state in a single object with defined state manipulations
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import blogsReducer from './reducers/blogsReducer';
import loginReducer from './reducers/loginReducer';
import usersReducer from './reducers/usersReducer';
import notificationReducer from './reducers/notificationReducer';


const reducer = combineReducers({
  blogs: blogsReducer,
  login: loginReducer,
  users: usersReducer,
  notification: notificationReducer
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;