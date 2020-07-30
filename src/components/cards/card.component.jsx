import React from 'react';
import './card.style.css';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

const Cards = ( {data: {confirmed, recovered, deaths, lastUpdate} } ) => {
    /*We can't use data instead of confirmed variable to check at here because the data has been destructured to its methods*/
    /* At the first time page loading, the data value hasn't been received from the async axios function, so the Card component
    can't not get the value for its child components that makes it fails ==> checking for the first time is really necessary*/
    if(!confirmed) return 'Loading in showing Cards...';
    return (
        <div className='container'>
            <Grid container spacing={3} justify='center' className='group-card'>
                <Grid item component={Card} xs={12} md={3} className={cx('card', 'infected')}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>Infected</Typography>
                        <Typography varaint='h5' gutterBottom>
                            <CountUp start={0} end={confirmed.value} duration={2.5} separator=','/>
                        </Typography>
                        <Typography color='textSecondary'>{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant='body2'>Number of active cases of COVID-19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx('card', 'recovered')}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>Recovered</Typography>
                        <Typography varaint='h5' gutterBottom>
                            <CountUp start={0} end={recovered.value} duration={2.5} separator=','/>
                        </Typography>
                        <Typography color='textSecondary'>{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant='body2'>Number of active cases of COVID-19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx('card', 'deaths')}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>Deaths</Typography>
                        <Typography varaint='h5' gutterBottom>
                            <CountUp start={0} end={deaths.value} duration={2.5} separator=','/>
                        </Typography>
                        <Typography color='textSecondary'>{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant='body2'>Number of active cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;