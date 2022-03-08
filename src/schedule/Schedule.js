import {
  EditingState,
  IntegratedEditing,
  ViewState,
} from '@devexpress/dx-react-scheduler'
import {
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
  DateNavigator,
  DayView,
  MonthView,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui'
import {Box} from '@material-ui/core'
import {useState} from 'react'
import {appointments} from './demo-data/appointments'

const meeting = {
  data: appointments,
  currentDate: '2018-11-01',
}

function Schedule() {
  const [state, setState] = useState(meeting)
  const handleDateChange = (currentDate) => {
    setState({...state, currentDate})
  }

  // const [appointment,setAppointment] = useState()
  // const handleAppointment =(state)=>{
  //     setAppointment({...appointment,(state.data.location)})
  // }
  const commitChange = ({added, changed, deleted}) => {
    setState((state) => {
      let {data} = state
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0
        data = [...data, {id: startingAddedId, ...added}]
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? {...appointment, ...changed[appointment.id]}
            : appointment
        )
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted)
      }
      return {data}
    })
  }

  return (
    <div className='schedule'>
      <Box
        sx={{
          padding: '0',
          margin: '0',
        }}
      >
        <Scheduler data={state.data}>
          <ViewState
            currentDate={state.currentDate}
            onCurrentDateChange={handleDateChange}
          />
          <EditingState onCommitChanges={commitChange} />
          <IntegratedEditing />
          <DayView startDayHour={9} endDayHour={17} />
          <WeekView startDayHour={9} endDayHour={17} />
          <MonthView startDayHour={9} endDayHour={17} />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip showCloseButton showOpenButton />
          <AppointmentForm />
        </Scheduler>
      </Box>
    </div>
  )
}

export default Schedule
