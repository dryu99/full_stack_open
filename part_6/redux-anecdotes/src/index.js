import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux' // library that makes Store available globally in a react application
import App from './App'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)