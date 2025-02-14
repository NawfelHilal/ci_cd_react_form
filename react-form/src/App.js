import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";

function App() {
  let [count, setCount] = React.useState(0);
  const clickOnMe = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
