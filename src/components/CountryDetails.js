import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'

const apiURL = 'https://ih-countries-api.herokuapp.com/countries'

const CountryDetails = ({ countries }) => { // jeito novo de desestruturar a props
  const { alpha3Code } = useParams()
  const [country, setCountry] = useState(null)

  useEffect(() => {

    axios.get(`${apiURL}/${alpha3Code}`)
      .then(response => {
        setCountry(response.data)
      }).catch(err => console.log(err))
  }, [alpha3Code])

  const getCountryName = alpha3Code => {
    const borderings = countries.find(element => {
      return element.alpha3Code === alpha3Code
    })
    return borderings.name.common
  }

  if (!country || !countries.length) {
    return <p>Loading...</p>
  }

  return (
    <div className="col-7">
      <img src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`} alt="Flag" />
      <h1>{ country.name.common }</h1>
      <table className="table">
        <thead></thead>
        <tbody>
          <tr>
            <td style={{width: '30%'}}>Capital</td>
            <td>{ country.capital[0] }</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>
              { country.area }
              <sup>2</sup>
            </td>
          </tr>
          <tr>
            <td>Borders</td>
            <td>
              <ul>
                {
                  country.borders.map(alpha3Code => {
                    return (
                      <li key={alpha3Code}>
                        <Link to={`/${alpha3Code}`}>{ getCountryName(alpha3Code) }</Link>
                      </li>
                    )
                  })
                }
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CountryDetails