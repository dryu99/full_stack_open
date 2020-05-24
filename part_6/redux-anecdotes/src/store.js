import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux' // library that lets us maintain and organize application state in a single object with defined state manipulations
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools())

export default store;