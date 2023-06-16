import React, { useState } from "react";
import "./App.css";
import Modal from "./Modal.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMemory } from "@fortawesome/free-solid-svg-icons";
import CloseIcon from "./close-icon.png";

library.add(faMemory);

interface Panda {
  name: string;
  photo: string;
}

function App() {
  const [name, setName] = useState("");
  const [pandas, setPandas] = useState<Panda[]>([]);
  const [count, setCount] = useState("3");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [guessResult, setGuessResult] = useState<"none" | "right" | "wrong">(
    "none"
  );
  const [showCheatsheet, setShowCheatsheet] = useState(false);

  const fetchPanda = () => {
    setIsLoading(true);
    setGuessResult("none");
    fetch("http://localhost:3000/api/pandas/draw")
      .then((resp) => resp.json())
      .then((resp) => {
        setName(resp.name);
        return resp.name;
      })
      .then((name) =>
        fetch(`http://localhost:3000/api/pandas/draw/${name}?count=${count}`)
      )
      .then((resp) => resp.json())
      .then((resp) => {
        setPandas(resp);
        setIsLoading(false);
      });
  };

  return (
    <div className="app-container">
      {showCheatsheet && (
        <div className="modal-container">
          <Modal>
            <button
              className="close-btn"
              onClick={() => {
                setShowCheatsheet(false);
              }}
            >
              <img src={CloseIcon} alt="Close Logo" className="close-icon" />
            </button>
            <div className="cheatsheet">
              <img
                src="../assets/photos/cheatsheet.png"
                className="cheatsheet-img"
              ></img>
            </div>
          </Modal>
        </div>
      )}
      <div>
        <div className="App-header">
          <div className="title">PandaGarten</div>
          <div>
            <button className="btn draw-btn" onClick={fetchPanda}>
              Draw a panda
            </button>
            <input
              className="btn count-btn"
              type="number"
              min="2"
              max="5"
              value={count}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCount(event.target.value);
              }}
            ></input>
            <FontAwesomeIcon
              className="cheatsheet-btn"
              icon={faMemory}
              bounce
              style={{ color: "#ffffff" }}
              onClick={() => {
                setPandas([]);
                setName("");
                setGuessResult("none");
                setShowCheatsheet(true);
              }}
            />
          </div>
        </div>
        {name && <div className="question">{`Which panda is ${name}?`}</div>}
        <div className="cards-container">
          {!isLoading &&
            pandas.map((panda) => (
              <div
                className={`card-container ${
                  guessResult === "none" ? "" : "flippable"
                }`}
                key={panda.name}
              >
                <div className="card-face card-face-front">
                  <img
                    src={panda.photo}
                    onClick={() => {
                      setGuessResult(panda.name === name ? "right" : "wrong");
                    }}
                  ></img>
                </div>
                <div className="card-face card-face-back">{panda.name}</div>
              </div>
            ))}
        </div>
        {guessResult === "right" && (
          <div className="guess-right">Right guess!</div>
        )}
        {guessResult === "wrong" && (
          <div className="guess-wrong">Try again!</div>
        )}
      </div>
    </div>
  );
}

export default App;
