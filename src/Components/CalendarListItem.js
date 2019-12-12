import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Button, IconButton } from '@material-ui/core';
import LoLIcon from './img/lol.png';
import CSGOIcon from './img/csgo.png';
import DOTA2Icon from './img/dota2.png';
import RLIcon from './img/rl-white.png';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        minHeight: '5rem',
        '&:hover': {
            backgroundColor: '#e7e7e7',
        },
        cursor: 'pointer',
        marginBottom: '2px'
    },
    icon: {
        height: 'auto',
        width: '1.5rem',
    },
    imgWrap: {
        padding: '0.2rem',
        display: 'flex',
        alignSelf: 'stretch',
        width: 'auto',
        alignItems: 'center',
        margin: '0 0.6rem',
        borderRadius: '5%'
    },
    dateWrap: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 0.6rem',
        flex: '15.5% 0 0'
    },
    titleWrap: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 0.6rem',
        flexGrow: 1
    },
    buttonWrap: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 0.6rem'
    }
  }));

function CalendarListItem(props) {

  const [notify, setNotify] = useState(false)
  const [gameColor, setGameColor] = useState('')

  useEffect(() => {
    switch (props.event.videogame.slug) {
        case 'cs-go':
            setGameColor('#ffd275')
            break;
        case 'league-of-legends':
            setGameColor('#59c3c3')
            break;
        case 'dota-2':
            setGameColor('#f06449')
            break;
        case 'rl':
            setGameColor('#8b69bf')
      }
  }, [])
    
  const classes = useStyles();
  const time = (string) => {
    let date = new Date(string)
    let localDate = new Date(date.getTime() + (date.getTimezoneOffset() * 60000))
    let time = {
        hours: localDate.getHours(),
        mins: localDate.getMinutes(),
    }
    if (time.hours < 10) {
        time.hours = "0" + (time.hours);
    }
    if (time.mins < 10) {
        time.mins = "0" + time.mins
    }
    return `${time.hours}.${time.mins}`
  }
  const notifIcon = (notify) => {
      if (!notify) {
          return <NotificationsNoneIcon/>
      } else {
          return <NotificationsActiveIcon/>
      }
  }
  const gameIcon = (game) => {
      switch (game) {
        case 'cs-go':
            return <img className={classes.icon} src={CSGOIcon} />
        case 'league-of-legends':
            return <img className={classes.icon} src={LoLIcon} />
        case 'dota-2':
            return <img className={classes.icon} src={DOTA2Icon} />
        case 'rl':
            return <img className={classes.icon} src={RLIcon} />
      }
  }
  const notifToggle = () => {
      setNotify(!notify)
      console.log(notify)
  }

    return (
        <div className={classes.root}>
            <div className={classes.dateWrap}>
                <Typography>
                    {time(props.event.begin_at)}
                </Typography>
            </div>
            <div className={classes.imgWrap} style={{background: gameColor}}>
                {gameIcon(props.event.videogame.slug)}
            </div>
            <div className={classes.titleWrap}>
                <Typography variant='body1'>
                    {props.event.league.name}
                </Typography>
            </div>
            <div className={classes.buttonWrap}>
                <IconButton onClick={notifToggle}>
                    {notifIcon(notify)}
                </IconButton>
            </div>
        </div>
    )
}

export default CalendarListItem
