import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CalendarDateMarker from './CalendarDateMarker';
import { Typography } from '@material-ui/core';


function CalendarList(props) {

    const [series, setSeries] = useState([]);
    const [prepared, setPrepared] = useState(false);
    const [sortedSeries, setSortedSeries] = useState([]);
    const [page, setPage] = useState(props.page)

    const address = (pageNum) => {
        switch(pageNum) {
            case 0:
                return '/api/series/upcoming'
            case 1:
                return '/api/lol/series/upcoming'
            case 2:
                return '/api/csgo/series/upcoming'
            case 3:
                return '/api/dota2/series/upcoming'
            default:
                return '/api/series/upcoming'
        }
    }

    useEffect(() => {
       setPage(props.page)
    })

    useEffect(() => {
        axios.get(address(page))
          .then(res => {
            // console.log(res.data)
            setSeries(res.data)
          })
          .catch(error => {
            console.log(error)
          })
    }, [page])

    useEffect(() => {
        if (series.length > 0) {
            let MainArray = []
            let SubArray = []
    
            for (var i = 0; i < series.length; i++) {
                if (i === 0) {
                    SubArray.push(series[i])
                } else {
                    let currentDate = new Date(series[i].begin_at)
                    let lastDate = new Date(SubArray[SubArray.length - 1].begin_at)
                    if (currentDate.getMonth() === lastDate.getMonth() && 
                        currentDate.getDate() === lastDate.getDate()) {
                        SubArray.push(series[i])
                    } else {
                        MainArray.push(SubArray)
    
                        SubArray = []
                        SubArray.push(series[i])
                    }
                }
            }
            
            setSortedSeries(MainArray)
        }
    }, [series])

    useEffect(() => {
        setPrepared(true)
    }, [sortedSeries])

    if (!prepared) {
        return (
            <Typography variant='h5'>Loading...</Typography>
        )
    } else {
        return (
        
            <div>
                {
                    sortedSeries.length > 0 ?
                    sortedSeries.map(events =>
                        <CalendarDateMarker 
                            events={events} 
                            date={events[0].begin_at} 
                            key={events[0].id}
                        />
                    ) : <Typography variant='body1'>sortedSeries is Empty</Typography> // TODO: Loader instead of null
                }
            </div>
        )
    }
}

export default CalendarList
