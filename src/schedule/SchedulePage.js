import React from 'react';
import Schedule from './Schedule';
import Box from '@mui/material/Box';
import { Paper } from '@material-ui/core';
import DashboardSidebarNavigation from '../dashboard/dashboard-sidebar-navigation'

const SchedulePage = () => {
    return(
        <Box sx={{
            display:'flex',   
        }}>
            <DashboardSidebarNavigation/>
            <Schedule/>
        </Box>
    )
}

export default SchedulePage