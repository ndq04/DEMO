// import { styled } from '@mui/material/styles';
import {EditingState, ViewState} from '@devexpress/dx-react-scheduler'
import {
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  DateNavigator,
  DayView,
  EditRecurrenceMenu,
  MonthView,
  Resources,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui'
import {Button} from '@material-ui/core'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import {useState} from 'react'
import {appointments} from '.././demo-data/month-appointments' // demo data
import FormDate from '../components/FormDate'
import FormSearch from '../components/FormSearch'

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === 'multilineTextEditor') {
    return null
  }
  return <AppointmentForm.TextEditor {...props} />
}

const BasicLayout = ({onFieldChange, appointmentData, ...restProps}) => {
  const onCustomFieldChange = (nextValue) => {
    onFieldChange({customField: nextValue})
  }

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <AppointmentForm.Label text='Email' type='title' />
      <AppointmentForm.TextEditor
        value={appointmentData.customField}
        onValueChange={onCustomFieldChange}
        placeholder='Email'
      />
    </AppointmentForm.BasicLayout>
  )
}

export default function DashboardDefaultContent() {
  const [data, setData] = useState(appointments)
  const [roomType, setRoomType] = useState(0)
  const [currentViewName, setCurrentViewName] = useState('work-week')
  const [date, setDate] = useState(new Date())
  // const [startDate, setStartDate] = useState('2013-01-08')
  // const [mainResourceName, setMainResourceName] = useState('location')
  const [addedAppointment, setAddedAppointment] = useState({})
  const [appointmentChanges, setAppointmentChanges] = useState({})
  const [editingAppointment, setEditingAppointment] = useState(undefined)
  const [resources, setResources] = useState([
    //setting room color, text, kiểu dữ liệu để fetch
    {
      fieldName: 'location',
      title: 'Location',
      instances: [
        {id: 'Tsubaki', text: 'Tsubaki', color: 'black'},
        {id: 'Ajisai', text: 'Ajisai', color: 'green'},
        {id: 'Sakura', text: 'Sakura', color: 'red'},
        {id: 'Ume', text: 'Ume', color: 'orange'},
        {id: 'Fuji', text: 'Fuji', color: 'blue'},
        {id: 'Vip', text: 'Vip', color: 'purple'},
      ],
    },
    {
      fieldName: 'groups',
      title: 'Groups',
      instances: [
        {id: 'Andrew Glover', text: 'Andrew Glover'},
        {id: 'Arnie Schwartz', text: 'Arnie Schwartz'},
        {id: 'John Heart', text: 'John Heart'},
        {id: 'Taylor Riley', text: 'Taylor Riley'},
        {id: 'Brad Farkus', text: 'Brad Farkus'},
      ],
    },
  ])

  // room booking info, showing on console when adding a room
  const realData =
    roomType === 0 ? data : data.filter((d) => d.location.includes(roomType))

  function chooseRoom(number) {
    setRoomType(number)
  }
  function changeAddedAppointment(addedAppointment) {
    setAddedAppointment(addedAppointment)
  }

  function changeAppointmentChanges(appointmentChanges) {
    setAppointmentChanges(appointmentChanges)
  }

  function changeEditingAppointment(editingAppointment) {
    setEditingAppointment(editingAppointment)
  }
  const currentViewNameChange = (currentViewName) => {
    setCurrentViewName(currentViewName)
  }
  const currentDateChange = (currentDate) => {
    setDate(currentDate)
  }
  function commitChanges({added, changed, deleted}) {
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0
      setData([...data, {id: startingAddedId, ...added}])
    }
    if (changed) {
      setData(
        data.map((appointment) =>
          changed[appointment.id]
            ? {...appointment, ...changed[appointment.id]}
            : appointment
        )
      )
    }
    if (deleted !== undefined) {
      setData(data.filter((appointment) => appointment.id !== deleted))
    }
  }

  return (
    <Box style={{display: 'flex', marginTop: '10px'}}>
      <div>
        <Box style={{display: 'flex', transform: 'scale(0.95)'}}>
          <Stack direction='row' spacing={2}>
            <FormDate data={data} resources={resources} setDate={setDate} />
            <FormSearch data={data} setDate={setDate} />
          </Stack>
        </Box>
        <Box style={{display: 'flex'}}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: '4rem 30px 0 0',
            }}
          >
            <Stack spacing={1}>
              <Button
                startIcon={<DoubleArrowIcon />}
                size='small'
                variant='contained'
                onClick={() => chooseRoom(0)}
                style={{width: '100px'}}
              >
                All
              </Button>
              {resources[0].instances.map((item) => (
                <Button
                  key={item.id}
                  size='small'
                  variant='contained'
                  style={{background: item.color, color: '#fff'}}
                  onClick={() => chooseRoom(item.id)}
                >
                  {item.text}
                </Button>
              ))}
            </Stack>
            <p className='bg-blue-500'>{roomType ? roomType : ''}</p>
          </div>
          <Scheduler data={realData} height={660}>
            <ViewState
              currentDate={date}
              currentViewName={currentViewName}
              onCurrentDateChange={currentDateChange}
              onCurrentViewNameChange={currentViewNameChange}
            />
            <EditingState
              onCommitChanges={commitChanges}
              addedAppointment={addedAppointment}
              onAddedAppointmentChange={changeAddedAppointment}
              appointmentChanges={appointmentChanges}
              onAppointmentChangesChange={changeAppointmentChanges}
              editingAppointment={editingAppointment}
              onEditingAppointmentChange={changeEditingAppointment}
            />
            <WeekView startDayHour={10} endDayHour={19} />
            <WeekView
              name='work-week'
              displayName='Work Week'
              excludedDays={[0, 6]}
              startDayHour={9}
              endDayHour={19}
            />
            <MonthView />
            <DayView />
            <EditRecurrenceMenu />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />
            <Appointments />
            <AppointmentTooltip showOpenButton showDeleteButton />
            <AppointmentForm
              basicLayoutComponent={BasicLayout}
              textEditorComponent={TextEditor}
            />
            <Resources data={resources} mainResourceName={'location'} />
          </Scheduler>
        </Box>
      </div>
    </Box>
  )
}
