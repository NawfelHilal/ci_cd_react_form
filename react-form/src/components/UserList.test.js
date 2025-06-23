import React from "react";
import { render, screen } from "@testing-library/react";
import UserList from "./UserList";

describe("UserList", () => {
  it("affiche la liste vide si users est un tableau vide", () => {
    render(<UserList users={[]} />);
    expect(screen.getByText(/Liste des utilisateurs/i)).toBeInTheDocument();
    // Aucun <li> ne doit être présent
    expect(document.querySelectorAll("ul li").length).toBe(0);
  });

  it("affiche les utilisateurs si users est un tableau rempli", () => {
    const users = [
      { firstName: "Jean", lastName: "Dupont", email: "jean@ex.com" },
      { firstName: "Marie", lastName: "Curie", email: "marie@ex.com" },
    ];
    render(<UserList users={users} />);
    expect(screen.getByText(/Jean Dupont/i)).toBeInTheDocument();
    expect(screen.getByText(/jean@ex.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Marie Curie/i)).toBeInTheDocument();
    expect(screen.getByText(/marie@ex.com/i)).toBeInTheDocument();
    // Il doit y avoir 2 <li>
    expect(document.querySelectorAll("ul li").length).toBe(2);
  });

  it("affiche la liste vide si users est undefined", () => {
    render(<UserList users={undefined} />);
    expect(screen.getByText(/Liste des utilisateurs/i)).toBeInTheDocument();
    expect(document.querySelectorAll("ul li").length).toBe(0);
  });

  it("affiche la liste vide si users est null", () => {
    render(<UserList users={null} />);
    expect(screen.getByText(/Liste des utilisateurs/i)).toBeInTheDocument();
    expect(document.querySelectorAll("ul li").length).toBe(0);
  });

  it("affiche la liste vide si users est une string", () => {
    render(<UserList users={"not an array"} />);
    expect(screen.getByText(/Liste des utilisateurs/i)).toBeInTheDocument();
    expect(document.querySelectorAll("ul li").length).toBe(0);
  });

  it("gère les utilisateurs avec des champs manquants", () => {
    const users = [
      { firstName: "Jean" },
      { lastName: "Curie" },
      { email: "test@ex.com" },
      {},
    ];
    render(<UserList users={users} />);
    // Les <li> doivent être présents même si incomplets
    expect(document.querySelectorAll("ul li").length).toBe(4);
  });

  it("correspond au snapshot", () => {
    const users = [
      { firstName: "Jean", lastName: "Dupont", email: "jean@ex.com" },
    ];
    const { asFragment } = render(<UserList users={users} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
