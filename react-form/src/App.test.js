import React from "react";
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import axios from "axios";

// Mock axios
jest.mock("axios");
const mockedAxios = axios;

// Augmenter le timeout global pour les tests
jest.setTimeout(10000);

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing and displays user count", async () => {
    // Mock axios pour retourner des utilisateurs
    mockedAxios.get.mockResolvedValueOnce({
      data: [{}, {}, {}],
    });

    await act(async () => {
      render(<App />);
    });

    await waitFor(
      () => {
        expect(
          screen.getByText(/Nombre d'utilisateurs : 3/i)
        ).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  test("handles fetch error gracefully", async () => {
    // Mock axios pour simuler une erreur
    mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));

    await act(async () => {
      render(<App />);
    });

    await waitFor(
      () => {
        expect(
          screen.getByText(/Nombre d'utilisateurs : 0/i)
        ).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  test("renders Form component", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [],
    });

    await act(async () => {
      render(<App />);
    });

    expect(screen.getByText(/Form/i)).toBeInTheDocument();
  });

  test("renders App with correct CSS class", () => {
    const { container } = render(<App />);
    expect(container.firstChild).toHaveClass("App");
  });

  test("affiche la liste des utilisateurs avec leurs emails", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        { firstName: "Jean", lastName: "Dupont", email: "jean@ex.com" },
        { firstName: "Marie", lastName: "Curie", email: "marie@ex.com" },
      ],
    });

    await act(async () => {
      render(<App />);
    });

    expect(await screen.findByText(/Jean Dupont/i)).toBeInTheDocument();
    expect(screen.getByText(/jean@ex.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Marie Curie/i)).toBeInTheDocument();
    expect(screen.getByText(/marie@ex.com/i)).toBeInTheDocument();
  });

  test("affiche un message si aucun utilisateur n'est présent", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [],
    });

    await act(async () => {
      render(<App />);
    });

    // Vérifie qu'aucun <li> n'est présent dans la liste
    const listItems = document.querySelectorAll("ul li");
    expect(listItems.length).toBe(0);
  });

  test("gère le cas où axios retourne une erreur", async () => {
    const error = {
      response: {
        status: 500,
        data: { detail: "Server error" },
      },
    };
    mockedAxios.get.mockRejectedValueOnce(error);

    await act(async () => {
      render(<App />);
    });

    expect(
      await screen.findByText(/Nombre d'utilisateurs : 0/i)
    ).toBeInTheDocument();
  });

  test("ajoute un utilisateur via le formulaire et met à jour la liste", async () => {
    // 1er get : liste vide
    mockedAxios.get.mockResolvedValueOnce({
      data: [],
    });
    
    // Mock pour la création d'utilisateur
    mockedAxios.post.mockResolvedValueOnce({
      data: { firstName: "Nouveau", lastName: "User", email: "nouveau@ex.com" },
    });
    
    // 2e get (après ajout) : liste avec un utilisateur
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        { firstName: "Nouveau", lastName: "User", email: "nouveau@ex.com" },
      ],
    });

    await act(async () => {
      render(<App />);
    });

    // Remplir le formulaire (cibler les <input> internes)
    fireEvent.change(screen.getByTestId("nom").querySelector("input"), {
      target: { value: "Nouveau" },
    });
    fireEvent.change(screen.getByTestId("prenom").querySelector("input"), {
      target: { value: "User" },
    });
    fireEvent.change(screen.getByTestId("email").querySelector("input"), {
      target: { value: "nouveau@ex.com" },
    });
    fireEvent.change(screen.getByTestId("dob").querySelector("input"), {
      target: { value: "2000-01-01" },
    });
    fireEvent.change(screen.getByTestId("city").querySelector("input"), {
      target: { value: "Paris" },
    });
    fireEvent.change(screen.getByTestId("postalCode").querySelector("input"), {
      target: { value: "75000" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Attendre la mise à jour de la liste
    expect(await screen.findByText(/Nouveau User/i)).toBeInTheDocument();
    expect(screen.getByText(/nouveau@ex.com/i)).toBeInTheDocument();
  });
});
