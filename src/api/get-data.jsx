import axios from 'axios';
const url = 'https://cors-anywhere.herokuapp.com/https://covid19.mathdro.id/api';

export const GetData = async (country, signal) => {
    let specificUrl = url;
    if (country) {
        specificUrl = `${specificUrl}/countries/${country}`;
    }

    try {
        /* Using destructuring in JS ES6 */
        const {data} = await axios.get(specificUrl, {signal: signal });
        /* Using realData as an object to get all neccessary data from API */
        const realData = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate
        }
        return realData;
        /* Note: because data is also an object itself, so we can continue using the destructuring
        for it too, just like:
        const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(url);
        return { confirmed, recovered, deaths, lastUpdate }; */
    } catch(err) {
        if (err.name === 'AbortError') return
        alert('Sorry, I am using the free API, so it limits the time to request the server\n Please try again later!');
        //console.log(err);
    }
};



export const fetchDataDaily = async (signal) => {
    try{
        const {data} = await axios.get(`${url}/daily`,{signal:signal});
        //console.log(data);
        const resDailyData = data.map(dailyData => {
            return {
                confirmed: dailyData.confirmed.total,
                deaths: dailyData.deaths.total,
                date: dailyData.reportDate
            };
        })
        //console.log(resDailyData);
        return resDailyData;
    }catch(err) {
        return err;
    }
};

export const fetchCountries = async (signal) => {
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`, {signal: signal});
        const nameCountries = countries.map( ({name})=> name);
        return nameCountries;
    } catch(err) {
        return err;
    }
};