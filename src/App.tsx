import React from "react";
import "./App.css";

function App() {
  const click = async () => {
    const res = await fetch("http://localhost:3001");
    console.log("res.json() :>> ", await res.json());
  };

  return (
    <div className="App">
      <button onClick={click}>Click me</button>
    </div>
  );
}

export default App;
