import React from 'react';
import Card from './Card'



const CovidSummery = (props) => {

  const {
      totalConfirmed,
      totalRecovered,
      totalDeaths,
      contry,
  } = props;

  return (
    <div>
      <div>
        <h1>{contry ==='' ? 'World Wide Corona Report': contry}</h1>
          <div style={{
            display:' flex',
            justifyContent: 'center'
          }}>

            <Card>
              <span>Total Confirmed</span> <br/>
              <span>{totalConfirmed}</span> <br/>
          </Card>
          <Card>
            <span>Total Recovered</span> <br/>
            <span>{totalRecovered}</span> <br/>
          </Card>
          <Card>
            <span>Total Deaths</span> <br/>
            <span>{totalDeaths}</span> <br/>
          </Card>
          </div>
      </div>
    </div>
  )
}

export default CovidSummery
