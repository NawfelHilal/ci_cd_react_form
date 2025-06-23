import React, { useEffect, useState } from "react";
import { userService } from "../services/api";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    userService
      .getUsers()
      .then((data) => setUsers(data.users))
      .catch(() => setError("Erreur lors du chargement des utilisateurs"));
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.map((u, i) => (
          <li key={i}>
            {u.firstName} {u.lastName} ({u.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
