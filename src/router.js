import {Navigate, Route, Routes} from 'react-router'
import RequireAuth from './components/RequireAuth'
import UseCookie from './context/auth/UseCookie'
import Dashboard from './dashboard/Dashboard'
import DashboardDefaultContent from './dashboard/dashboard-default-content'
import Inbox from './dashboard/inbox'
import SettingsAndPrivacy from './dashboard/settings-and-privacy'
import Forget from './forget/Forget'
import Login from './login/Login'
import LandingPage from './pages/LandingPage'
import NotFound from './pages/NotFound'
import Register from './register/Register'
import SchedulePage from './schedule/SchedulePage'

/*Routes is used to be Switch*/
const Router = () => {
  /* nesting routes*/
  const {cookies} = UseCookie()

  return (
    <Routes>
      <Route path='/' element={cookies?.auth ? <LandingPage /> : <Login />} />
      <Route
        path='/login'
        element={!cookies?.auth ? <Login /> : <Navigate to='/dashboard' />}
      />
      <Route path='/register' element={<Register />} />
      <Route path='/forget' element={<Forget />} />

      <Route element={<RequireAuth />}>
        <Route path='/schedule' element={<SchedulePage />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='/dashboard/' element={<DashboardDefaultContent />} />
          <Route path='/dashboard/inbox' element={<Inbox />} />
          <Route
            path='/dashboard/settings-and-privacy'
            element={<SettingsAndPrivacy />}
          />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
export default Router
