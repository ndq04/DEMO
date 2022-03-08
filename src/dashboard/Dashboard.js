import Box from '@mui/material/Box'
import {Outlet} from 'react-router'
import DashboardSidebarNavigation from './dashboard-sidebar-navigation'

const Dashboard = () => {
  return (
    <Box sx={{display: 'flex'}}>
      <DashboardSidebarNavigation />
      {/* <DashboardDefaultContent /> */}
      <Outlet />
    </Box>
  )
}

export default Dashboard
