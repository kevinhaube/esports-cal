import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Button, IconButton, Icon, ListItem, List } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import LoLIcon from './img/lol.png';
import CSGOIcon from './img/csgo.png';
import DOTA2Icon from './img/dota2.png';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CalendarListItem from './CalendarListItem';
import { Divider, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        padding: '0px'
    },
    imgWrap: {
        padding: '0.2rem',
        display: 'flex',
        alignSelf: 'stretch',
        width: 'auto',
        alignItems: 'center',
    },
    titleWrap: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 0.6rem',
        flexGrow: 1
    },
  }));

function CalendarDateMarker(props) {

    const classes = useStyles();
    const formatDate = (ISOdate) => {
        const monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ]
        let date = new Date(ISOdate);
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return monthNames[monthIndex] + ' ' + day + ', ' + year;
    }

    return (

        <ExpansionPanel
        defaultExpanded={true} style={{flexGrow: 1}}>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
                <div className={classes.imgWrap}>
                    <Icon color='primary'>
                        <EventIcon/>
                    </Icon>
                </div>
                <div className={classes.titleWrap}>
                    <Typography variant='body1'>
                        {formatDate(props.date)}
                    </Typography>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{padding: '0px 0px 6px 0px'}}>
                {/*Load in lists of events*/}
                <Grid container>
                    {
                        props.events.length > 0 ? 
                        props.events.map(event => 
                            <Grid item xs={12} key={event.id}>
                                <CalendarListItem event={event}/>
                            </Grid>
                        ) : null // TODO: Loader instead of null
                    }
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>

    )
}

export default CalendarDateMarker
