import React from 'react'
import {CookiesProvider} from 'react-cookie'
import ReactDOM from 'react-dom'
import App from './App'
import AuthProvider from './context/auth/AuthContext'
import LoadingProvider from './context/loading/LoadingContext'
import './index.css'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </AuthProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
