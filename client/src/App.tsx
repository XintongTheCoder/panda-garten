import React, { useState } from "react";
import axios from "axios";
import "./App.css";

interface Panda {
  name: string;
  photo: string;
}

const steps = ["next", "end", "restart"];

function App() {
  const [name, setName] = useState("");
  const [pandas, setPandas] = useState<Panda[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [guessResult, setGuessResult] = useState<"none" | "right" | "wrong">(
    "none"
  );

  const fetchPanda = () => {
    setIsLoading(true);
    setGuessResult("none");
    fetch("http://localhost:8080/api/pandas/draw")
      .then((resp) => resp.json())
      .then((resp) => {
        setName(resp.name);
        return resp.name;
      })
      .then((name) =>
        fetch(`http://localhost:8080/api/pandas/draw/${name}?count=3`)
      )
      .then((resp) => resp.json())
      .then((resp) => {
        setPandas(resp);
        setIsLoading(false);
      });
  };

  return (
    <div className="App">
      <div className="App-header">
        <div>Panda Garten</div>
        <button className="count-btn" onClick={fetchPanda}>
          Draw a panda
        </button>
      </div>
      {name && <div className="question">{`Which panda is ${name}`}</div>}
      <div className="cards-container">
        {!isLoading &&
          pandas.map((panda) => (
            <div>
              <img
                src={panda.photo}
                onClick={() => {
                  setGuessResult(panda.name === name ? "right" : "wrong");
                }}
              ></img>
            </div>
          ))}
      </div>
      {guessResult === "right" && (
        <div className="guess-result">Right guess!</div>
      )}
      {guessResult === "wrong" && (
        <div className="guess-result">Try again!</div>
      )}
    </div>
  );
}

export default App;
