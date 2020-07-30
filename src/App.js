import React, { Component } from 'react';
import './App.css';
import { Cards, Chart, Country} from './components';
import {GetData} from './api/get-data';
import showImage from '../src/images/Covid_Banner_1024x259.jpg';
class App extends Component {
  /* Create an state to update data for rendering process */
  state = {
    data: {},
    country: ''
  };

  abortController = new AbortController();
  signal = this.abortController.signal;

  handleCountryChange = async (e) => {
    //console.log(e.target.value);
    let country = e.target.value;
    if (country === 'global') country = '';
    const dataCountry = await GetData(country, this.signal);
    this.setState({data: dataCountry, country: country});
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  async componentDidMount() {
    /* If you don't want componentDidMount become to async function, you can do this way.
    GetData().then( result =>{
      //data now is an object got from GetData function 
      const data = result;

      //just for testing if we get true data
      console.log(data);

      //Update state when getting true data
      this.setState({data: data})
    })
    .catch(err=>{
      console.log(err);
    }); */
   
   const data = await GetData('',this.signal);
   this.setState({data: data});
  };

  render() {
    const {data, country} = this.state;
    while (!data) return 'Loading in App...';
    return (
      <div className='container'>
        <img className='image' src={showImage} alt='COVID-19'/>
        <Cards data={data}></Cards>
        <Country handleCountryChange={this.handleCountryChange}></Country>
        <Chart data={data} country={country}></Chart>
        
      </div>
    );
  }
}
  

export default App;
