import { Route, Routes } from "react-router-dom";
import "./App.css";
import CountriesList from "./components/CountriesList";
import CountryDetails from "./components/CountryDetails";
import Navbar from "./components/Navbar";
import { useState, useEffect } from 'react'
import axios from 'axios'

const ApiURL = 'https://ih-countries-api.herokuapp.com/countries'

function App() {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get(ApiURL)
      .then(response => {
        setCountries(response.data.reverse())
      }).catch(err => console.log(err))
  }, [])
 
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="row">
          <CountriesList countries={countries} />
          <Routes>
            <Route path="/:alpha3Code" element={ <CountryDetails countries={countries} /> } ></Route>
          </Routes>
        </div>
      </div>
    </div>
   );
 }

export default App;