import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";

function App() {
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    async function countUsers() {
      try {
        const response = await fetch("http://localhost:8000/users");
        const data = await response.json();
        setUsersCount(data.users.length);
        console.log("data:", data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    countUsers();
  }, []); // On garde une dépendance vide car l'URL est fixe

  return (
    <div className="App">
      <Form />
      <p>Nombre d'utilisateurs : {usersCount}</p>
    </div>
  );
}

export default App;
