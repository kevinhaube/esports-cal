import React, { useState, useEffect } from 'react';
import './App.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavAndToolbar from './Components/NavAndToolbar';
import CalendarList from './Components/CalendarList';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: '8px'
  },
}));

function App() {

  const classes = useStyles();
  const [page, setPage] = useState(0)

  const navListener = (pageNum) => {
    setPage(pageNum)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavAndToolbar navListener={navListener} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <CalendarList page={page} />
      </main>
    </div>
  );
}

export default App;
