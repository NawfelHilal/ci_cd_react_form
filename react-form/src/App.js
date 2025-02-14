import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  let [count, setCount] = React.useState(0);
  const clickOnMe = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={clickOnMe}>Click on me</button>
        <span data-testid="count">{count}</span>
      </header>
    </div>
  );
}

export default App;
