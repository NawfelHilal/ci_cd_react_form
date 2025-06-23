import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import UserList from "./components/UserList";
import { userService } from "./services/api";

const App = () => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    userService
      .getUsers()
      .then((data) => {
        setUsers(data);
        setUserCount(data.length);
        setError(null);
      })
      .catch(() => {
        setUsers([]);
        setUserCount(0);
        setError("Erreur lors du chargement des utilisateurs");
      });
  }, []);

  const handleUserAdded = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
    setUserCount((prev) => prev + 1);
  };

  return (
    <div className="App">
      <h1>Utilisateurs ({userCount})</h1>
      <p>Nombre d'utilisateurs : {userCount}</p>
      <Form onUserAdded={handleUserAdded} />
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
      <UserList users={users} />
    </div>
  );
};

export default App;
