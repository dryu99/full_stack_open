import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux' // library that lets us maintain and organize application state in a single object with defined state manipulations
import { Provider } from 'react-redux' // library that makes Store available globally in a react application
import App from './App'
import reducer from './reducers/anecdoteReducer'

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)