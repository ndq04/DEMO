import {Container} from '@material-ui/core'
import {useContext} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Loading from './components/Loading'
import UseCookie from './context/auth/UseCookie'
import {LoadingContext} from './context/loading/LoadingContext'
import Router from './router'
import NavigationBar from './shared/components/navigation-bar'

function App() {
  const {cookies} = UseCookie()
  const {loading} = useContext(LoadingContext)

  return (
    <BrowserRouter>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {loading && <Loading />}
      {cookies.auth && <NavigationBar />}
      {cookies.auth ? (
        <Container>
          <Router />
        </Container>
      ) : (
        <div className={`App flex min-h-screen`}>
          <Router />
        </div>
      )}
    </BrowserRouter>
  )
}

export default App
