import React from "react";

const UserList = ({ users }) => {
  if (!Array.isArray(users)) {
    return (
      <div>
        <h2>Liste des utilisateurs</h2>
        <ul></ul>
      </div>
    );
  }
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
