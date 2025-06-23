import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import UserList from "./components/UserList";

function App() {
  const [usersCount, setUsersCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function countUsers() {
      try {
        const response = await fetch("http://localhost:8000/users");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) {
          setUsersCount(data.users.length);
          console.log("data:", data);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching users:", error);
          setError(error.message);
        }
      }
    }

    countUsers();

    return () => {
      isMounted = false;
    };
  }, []); // On garde une dépendance vide car l'URL est fixe

  return (
    <div className="App">
      <Form />
      <p>Nombre d'utilisateurs : {usersCount}</p>
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
      <UserList />
    </div>
  );
}

export default App;
