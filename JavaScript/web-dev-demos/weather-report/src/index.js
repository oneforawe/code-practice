import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {store} from './state-action-store'
import {WeatherReport} from './Weather'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <WeatherReport/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)