import React from 'react';
import { useState } from 'react';

import './App.css';

function App() {
  const [fact, setFact] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [typeOfInfo, setInfo] = useState("year")

  const infoTypeSelector = (e) => {
    setInfo(e.target.defaultValue)
    if (fact.number) {
      fetchingUrl(`http://numbersapi.com/${fact.number}/${e.target.defaultValue}?json`)
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchingUrl(`http://numbersapi.com/${inputSearch}/${typeOfInfo}?json`)
    setInputSearch("");
  }

  const generateRandom = () => {
    fetchingUrl(`http://numbersapi.com/random/${typeOfInfo}?json`)
  }
  
  function fetchingUrl(url) {
    fetch(url)
      .then(res => res.json())
      .then(quote => setFact(quote))
  }

  return (
    <div className="App">
      <h1 className="App-header"><strong>Choose the type of information and enter a number to learn a fact!</strong></h1>
      <div className="checkBoxes" value={typeOfInfo} onChange={infoTypeSelector}>
        <label>
          History
          <input type="radio" value="year" defaultChecked={typeOfInfo==="year"} name="infotype" />
        </label>
        <label>
          Math
          <input type="radio" value="math" name="infotype" />
        </label>
        <label>
          Trivia
          <input type="radio" value="trivia" name="infotype" />
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name='input-number'
          placeholder='Enter a number/year'
          onChange={e => setInputSearch(e.target.value)}
          value={inputSearch}
        />
         <button type="submit" className="btn" >Submit</button>
      </form>
        
      <div className="factBox">
        <h3>{fact.text}</h3>
      </div>

      <button className="btn btnRandom" onClick={generateRandom}>
        Random number
      </button>

    </div>
  )
}

export default App; 