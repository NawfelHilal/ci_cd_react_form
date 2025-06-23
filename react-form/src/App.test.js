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

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Augmenter le timeout global pour les tests
jest.setTimeout(10000);

describe("App Component", () => {
  beforeEach(() => {
    mockFetch.mockClear();
    jest.clearAllMocks();
  });

  test("renders without crashing and displays user count", async () => {
    // Mock fetch pour retourner des utilisateurs
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{}, {}, {}]),
      })
    );

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
    // Mock fetch pour simuler une erreur
    mockFetch.mockImplementationOnce(() =>
      Promise.reject(new Error("API Error"))
    );

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
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );

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
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { firstName: "Jean", lastName: "Dupont", email: "jean@ex.com" },
            { firstName: "Marie", lastName: "Curie", email: "marie@ex.com" },
          ]),
      })
    );

    await act(async () => {
      render(<App />);
    });

    expect(await screen.findByText(/Jean Dupont/i)).toBeInTheDocument();
    expect(screen.getByText(/jean@ex.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Marie Curie/i)).toBeInTheDocument();
    expect(screen.getByText(/marie@ex.com/i)).toBeInTheDocument();
  });

  test("affiche un message si aucun utilisateur n'est présent", async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );

    await act(async () => {
      render(<App />);
    });

    // Vérifie qu'aucun <li> n'est présent dans la liste
    const listItems = document.querySelectorAll("ul li");
    expect(listItems.length).toBe(0);
  });

  test("gère le cas où fetch retourne ok: false", async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve([]),
      })
    );

    await act(async () => {
      render(<App />);
    });

    expect(
      await screen.findByText(/Nombre d'utilisateurs : 0/i)
    ).toBeInTheDocument();
  });

  test("ajoute un utilisateur via le formulaire et met à jour la liste", async () => {
    // 1er fetch : liste vide
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );
    // 2e fetch (après ajout) : liste avec un utilisateur
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { firstName: "Nouveau", lastName: "User", email: "nouveau@ex.com" },
          ]),
      })
    );

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
