import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import SettingsIcon from '@material-ui/icons/Settings'
import GroupIcon from '@mui/icons-material/Group'
import PersonIcon from '@mui/icons-material/Person'
import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import UseCookie from '../context/auth/UseCookie'
import logo from './../logo.svg'

const DashboardSidebarNavigation = () => {
  const classes = useStyles()

  const {removeCookie} = UseCookie()

  useEffect(() => {
    // alert("Rendering Dashboard Sidebar Navigation");
  }, [])

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out ?')) {
      removeCookie('auth')
    }
  }

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant='permanent'
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor='left'
        >
          <Toolbar style={{width: '6rem', height: 'auto'}}>
            <Link to='/' className={classes.logoWithLink}>
              <img
                className={'App-logo'}
                width={'100%'}
                height={'auto'}
                src={logo}
                alt='logo'
              />
              React
            </Link>
          </Toolbar>
          <div className={classes.drawerContainer}>
            <List>
              <Link className={classes.link} to={'user'}>
                <ListItem button>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={'user'} />
                </ListItem>
              </Link>
              <Link className={classes.link} to={'group'}>
                <ListItem button>
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText primary={'group'} />
                </ListItem>
              </Link>
              <Link className={classes.link} to={'inbox'}>
                <ListItem button>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={'inbox'} />
                </ListItem>
              </Link>
              <Link className={classes.link} to={'settings-and-privacy'}>
                <ListItem button>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary={'settings and privacy'} />
                </ListItem>
              </Link>

              {/* <a className={classes.link} href={'/login'}> */}
              <ListItem button>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={'logout'} onClick={handleLogout} />
              </ListItem>
              {/* </a> */}
            </List>
          </div>
        </Drawer>
      </div>
    </>
  )
}

export default DashboardSidebarNavigation

const drawerWidth = 240

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    link: {textDecoration: 'none', color: 'inherit'},
    logoWithLink: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: 'inherit',
    },
  })
)
