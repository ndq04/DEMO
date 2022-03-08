import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import UseCookie from './../../context/auth/UseCookie'

export default function NavigationBar() {
  const classes = useStyles()
  const {cookies} = UseCookie()

  return (
    <AppBar position='static' className={classes.appBar}>
      <Box
        display={'flex'}
        flexDirection={'row-reverse'}
        justifyContent={'end'}
      >
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <Link to='/' className={classes.link}>
              Home
            </Link>
          </Typography>
          <Typography variant='h6' className={classes.title}>
            <Link
              to={`${!cookies.auth ? '/login' : '/dashboard'}`}
              className={classes.link}
            >
              {!cookies.auth ? 'Login' : 'Dashboard'}
            </Link>
          </Typography>
          {cookies.auth && (
            <Typography variant='h6' className={classes.title}>
              <Link to='/schedule' className={classes.link}>
                Schedule
              </Link>
            </Typography>
          )}
        </Toolbar>
      </Box>
    </AppBar>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      marginRight: '2rem',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  })
)
