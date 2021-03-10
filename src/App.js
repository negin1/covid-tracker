import React, {useEffect, useState} from 'react';
import './App.css';
import CovidSummery from './components/CovidSummery';
import LineGraph from './components/LineGraph';
import Card from './components/Card'
import axios from './axios'


function App() {

  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
/*   const [loading, setLoading] = useState(false); */
  const [covidSummery, setCovidSummery] = useState({});
  const [days, setDays] = useState (7); 
  const [country, setCountry] = useState ('');  
  const [coronaCountAr, setCoronaCountAr] = useState ([]); 
 
  useEffect(() =>{
   /*  setLoading(true) */
    axios.get(`/summary`)
    .then(res => {
     /*  setLoading(false) */
      

      if(res.status === 200){
        setTotalConfirmed(res.data.Global.TotalConfirmed);
        setTotalRecovered(res.data.Global.NewRecovered);
        setTotalDeaths(res.data.Global.TotalDeaths);
        setCovidSummery(res.data);
      }

      console.log(res);



    })
    .catch(error =>{
      console.log(error)
    })
    


  }, []);

  const fromatDate = (date) =>{
    const d = new Date(date);
      //2021-03-09;
    const year = d.getFullYear();
    const month = `0${d.getMonth()+1}`.slice(-2); 
    const _date = d.getDate();
    return `${year}-${month}-${_date}` 

  }

  const countryHandler = (e) =>{
    setCountry(e.target.value);
    const d = new Date();
    const to = fromatDate(d); 
    const from =fromatDate(d.setDate(d.getDate() -7));

    //console.log(from, to )

     getCoronaReportByDateRange(e.target.value, from, to );

  }

  const daysHandler = (e) =>{
    setDays(e.target.value);
  
  }

  const getCoronaReportByDateRange = (countrySlug, from, to ) =>{
    axios.get(`/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to={to}T00:00:00Z`)
    .then(res => {
      console.log(res);

      const yAxisCoronaCount = res.data.map (d => d.Cases);
      setCoronaCountAr(yAxisCoronaCount) 
    })

 


    .catch(error=>{
      console.log(error);
    })
  }

  /* if(loading){
    return <p>Fetching data from api... </p>
  } */


  return (
    <div className="App">
    <CovidSummery 
      totalConfirmed={totalConfirmed}
      totalRecovered={totalRecovered}
      totalDeaths= {totalDeaths}
      contry={''}
    />

    <div>
      <select value={country} onChange={countryHandler}>
        {
          covidSummery.Countries && covidSummery.Countries.map(country =>
          <option key={country.Slug} value={country.Slug}>{country.Country}</option>
          )
        }
      </select>
      <select value={days} onChange={daysHandler} > 
        <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
      </select>
    </div>
    <LineGraph 
      yAxis={coronaCountAr}
    />
    
    </div>
  );
}

export default App;
