import React, {useState, useEffect} from 'react';
import {NativeSelect, FormControl} from '@material-ui/core';
import './country.style.css';
import {fetchCountries} from '../../api/get-data';

const Country = ({handleCountryChange}) => {
    const [nameCountries, setFetchCountries] = useState([]);//Hook
    useEffect( ()=>{
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchNameCountries = async () => {
            try {
                const getDataCountries = await fetchCountries(signal);
                setFetchCountries(getDataCountries);
                //console.log(nameCountries);
            }catch(err) {
                console.log(err);
                return function cleanup() {
                    abortController.abort();
                }
                
            }
        }
        fetchNameCountries();
    },[setFetchCountries]);// if the second argument exists, the hook only runs when having
    //something change on this argument except the first time everything have to be ran

    return (
        nameCountries.length 
        ?
        (
        <FormControl className='form-control'>
            <NativeSelect onChange={handleCountryChange}>
                <option value='Global'>Global</option>
                {
                    nameCountries.map( (country, id ) => {
                        return (
                            <option key={id} value={country}>{country}</option>
                        )
                    })
                }
            </NativeSelect>
        </FormControl>
        )
        :
        null
    )
}

export default Country;