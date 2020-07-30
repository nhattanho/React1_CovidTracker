import React, {useState, useEffect} from 'react';
import './chart.style.css';
import {fetchDataDaily} from '../../api/get-data';
import {Line, Bar} from 'react-chartjs-2';

const Chart = ({data: {confirmed, deaths, recovered}, country}) => {
    const [dailyData, setDailyData] = useState([]);//Hook
    useEffect( ()=>{
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchAPI = async ()=>{
            try {
                const getDailyData = await fetchDataDaily(signal);
                setDailyData(getDailyData);
                // return function cleanup() {
                //     abortController.abort();
                // }
                //console.log(dailyData);
            }catch(err) {
                console.log(err);
                return function cleanup() {
                    abortController.abort();
                }
            }
        }
        fetchAPI();
    }, []); // though the second parameter is empty but it stil prevents the hook run all the times
    //==> so it only runs whenever something change in its body

    const LineChart = (
        dailyData.length //checking for the first time of rendering
        ?
        (  <Line className='line'
                data={{
                    labels: dailyData.map( ({date})=> date),
                    datasets: [{
                        data: dailyData.map( ({confirmed})=> confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true
                    }, 
                    {
                        data: dailyData.map( ({deaths})=> deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true
                    }]
                }}
            />
        ) 
        : null
    );

    const barChart = (
        confirmed
        ?
        (
            <Bar className='bar'
                data={{
                   labels: ['Infected', 'Recovered', 'Deaths'],
                   datasets: [{
                       label: 'People',
                       backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                       data: [confirmed.value, recovered.value, confirmed.value]
                   }]
                }}
                options={{
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: `Current status in ${country}`
                    }
                }}
            />
        )
        : null
    );

    return (
        <div className='container'>
            {country ? barChart : LineChart }
        </div>
    );
};

export default Chart;