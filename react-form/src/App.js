import React from "react";
import "./App.css";
import Form from "./components/Form";

function App() {
  let [count, setCount] = React.useState(0);

  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
