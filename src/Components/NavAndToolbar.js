import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LoLIcon from './img/lol-primary.png';
import CSGOIcon from './img/csgo-primary.png';
import DOTA2Icon from './img/dota2-primary.png';
import RLIcon from './img/rl-primary.png';
import LoLIconOff from './img/lol-gray.png';
import CSGOIconOff from './img/csgo-gray.png';
import DOTA2IconOff from './img/dota2-gray.png';
import RLIconOff from './img/rl-gray.png';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Badge } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const drawerWidth = 60;
const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
      zIndex: theme.zIndex.drawer + 1
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

function NavAndToolbar(props) {

    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [checkedA, setCheckedA] = useState(false)
    const [title, setTitle] = useState('Esports Calendar')

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleChange = name => event => {
      switch(name) {
        case 'checkedA':
          setCheckedA(event.target.checked)
        default:
          break;
      }
    };

    const drawer = (
        <div>
          <div className={classes.toolbar} />
          <Divider/>
            <div style={{
                maxWidth: drawerWidth, 
                overflow: 'none',
                margin: '5px'
            }}>
              <IconButton onClick={() => props.navListener(0)} style={{width: 'auto', display: 'block', marginBottom: '8px'}} >
                <CalendarTodayIcon color='primary'/>
              </IconButton>
            </div>
          <Divider/>
          <div style={{
            maxWidth: drawerWidth, 
            overflow: 'none',
            margin: '5px'
          }}>
            <IconButton onClick={() => props.navListener(1)} style={{width: 'auto', display: 'block', marginBottom: '8px'}} >
              <img src={LoLIconOff} style={{height: '24px', width: 'auto'}} />
            </IconButton>
            <IconButton onClick={() => props.navListener(2)} style={{width: 'auto', display: 'block', marginBottom: '8px'}} >
              <img src={CSGOIconOff} style={{height: '24px', width: 'auto'}} />
            </IconButton>
            <IconButton onClick={() => props.navListener(3)} style={{width: 'auto', display: 'block', marginBottom: '8px'}} >
              <img src={DOTA2IconOff} style={{height: '24px', width: 'auto'}} />
            </IconButton>
            <IconButton onClick={() => props.navListener(4)} style={{width: 'auto', display: 'block', marginBottom: '8px'}} >
              <img src={RLIconOff} style={{height: '24px', width: 'auto'}} />
            </IconButton>
          </div>
          <Divider />
            <div style={{
              maxWidth: drawerWidth, 
              overflow: 'none',
              margin: '5px'
            }}>
              <IconButton onClick={() => props.navListener(5)} style={{width: 'auto', display: 'block', marginBottom: '8px'}} >
                <Badge badgeContent={2} color='secondary'>
                  <NotificationsIcon style={{height: '24px', width: 'auto'}} />
                </Badge>
              </IconButton>
            </div>
        </div>
      );

    return (
        <>
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
      </>
    )
}

export default NavAndToolbar
