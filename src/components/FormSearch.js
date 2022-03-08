import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import {useState} from 'react'

export default function FormSearch({data, setDate}) {
  const [search, setSearch] = useState('')

  function searchHandle(e) {
    e.preventDefault()
    data.forEach((item) => {
      if (item.title.toLowerCase().includes(search.toLowerCase())) {
        setDate(item.startDate)
      }
    })
  }
  return (
    <form onSubmit={searchHandle}>
      <Stack spacing={1} direction='row'>
        <TextField
          placeholder='Search event...'
          variant='outlined'
          value={search}
          size='small'
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button size='small' variant='contained' type='submit'>
          search
        </Button>
      </Stack>
    </form>
  )
}
