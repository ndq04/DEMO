// import { resources } from '../demo-data/resources'
import {Button} from '@material-ui/core'
import DateAdapter from '@mui/lab/AdapterDateFns'
import DateTimePicker from '@mui/lab/DateTimePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import {useState} from 'react'
import AlertDialog from './Dialog'

export default function FormDate({data, resources, setDate}) {
  const [searchStart, setSearchStart] = useState(new Date())
  const [searchEnd, setSearchEnd] = useState(
    new Date(new Date().setHours(new Date().getHours() + 1))
  )
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')

  function handleStartChange(newValue) {
    setSearchStart(newValue)
  }
  function handleEndChange(newValue) {
    setSearchEnd(newValue)
  }
  function submitSearchDateHandle(e) {
    e.preventDefault()
    const a = new Date(searchStart).getTime()
    const b = new Date(searchEnd).getTime()

    const bookedRoom = data.filter((item) => {
      if (item.hasOwnProperty('rRule')) {
        const date = item.rRule.slice(item.rRule.indexOf('UNTIL') + 6)
        const minisec = new Date(
          date.slice(0, 4),
          parseInt(date.slice(4, 6)) - 1,
          date.slice(6, 8)
        ).getTime()
        if (minisec > a && item.startDate.getTime() <= b) {
          return true
        }
      }
      if (item.startDate.getTime() >= a && item.endDate.getTime() <= b) {
        return true
      }
      if (item.endDate.getTime() >= a && item.startDate.getTime() <= a) {
        return true
      }
      return false
    })

    const unique = new Set()
    bookedRoom.forEach((item) => unique.add(item.location))

    const emptyList = []

    resources[0].instances.forEach((item) => {
      if (!unique.has(item.text)) {
        emptyList.push(item.text)
      }
    })

    setDate(new Date(searchStart))
    setOpen(true)
    if (emptyList.length === 0) {
      setText('No empty room left during this period!')
    } else {
      setText(`${emptyList.join(', ')} is available`)
    }
  }

  return (
    <>
      <AlertDialog text={text} setOpen={setOpen} open={open} />
      <form onSubmit={submitSearchDateHandle}>
        <Stack spacing={1} direction='row'>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DateTimePicker
              value={searchStart}
              onChange={handleStartChange}
              renderInput={(params) => <TextField {...params} />}
              label='Start Date'
            />
            <DateTimePicker
              value={searchEnd}
              onChange={handleEndChange}
              renderInput={(params) => <TextField {...params} />}
              label='End Date'
            />
          </LocalizationProvider>
          <Button
            variant='contained'
            size='small'
            style={{width: '200px'}}
            type='submit'
          >
            Search empty rooms
          </Button>
        </Stack>
      </form>
    </>
  )
}
