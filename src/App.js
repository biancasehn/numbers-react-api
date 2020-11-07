import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";

import './App.css';

function App() {
  const [fact, setFact] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [info, setInfo] = useState("year")

  const { handleSubmit } = useForm();

  
  const infoSelector = (e) => {
    setInfo(e.target.defaultValue)
    fetchingUrl(`https://numbersapi.com/${fact.number}/${e.target.defaultValue}?json`)
  }

  function onSubmit() {
    fetchingUrl(`https://numbersapi.com/${inputSearch}/${info}?json`)
    setInputSearch("");
  }

  const buttonClick = () => {
    fetchingUrl(`https://numbersapi.com/random/${info}?json`)
  }
  
  function fetchingUrl(url) {
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(result => setFact(result))
  }

  return (
    <div className="App">

      <h1 className="App-header"><strong>Choose the type of information and enter a number to learn a fact!</strong></h1>

      <div className="checkBoxes" value={info} onChange={infoSelector}>
        <label>
          History
          <input type="radio" value="year" defaultChecked={info==="year"} name="infotype" />
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          value={inputSearch}
          placeholder='Enter a year'
          onChange={e => setInputSearch(e.target.value)}
        />
        <input type="submit" className="btn btnSubmit" value="Submit" />
      </form>
        
      <div className="factBox">
        <h3>{fact.text}</h3>
      </div>

      <button className="btn btnRandom" onClick={buttonClick}>
        Random number
      </button>

    </div>
  )
}

export default App; 