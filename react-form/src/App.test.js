import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ users: [] }),
  })
);

describe("App Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders without crashing and displays user count", async () => {
    // Mock fetch pour retourner des utilisateurs
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ users: [{}, {}, {}] }),
      })
    );

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText(/Nombre d'utilisateurs : 3/i)
      ).toBeInTheDocument();
    });
  });

  test("handles fetch error gracefully", async () => {
    // Mock fetch pour simuler une erreur
    global.fetch = jest.fn(() => Promise.reject("API Error"));

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText(/Nombre d'utilisateurs : 0/i)
      ).toBeInTheDocument();
    });
  });

  test("renders Form component with all fields", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ users: [] }),
      })
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId("nom")).toBeInTheDocument();
      expect(screen.getByTestId("prenom")).toBeInTheDocument();
      expect(screen.getByTestId("email")).toBeInTheDocument();
      expect(screen.getByTestId("dob")).toBeInTheDocument();
      expect(screen.getByTestId("city")).toBeInTheDocument();
      expect(screen.getByTestId("postalCode")).toBeInTheDocument();
    });
  });

  test("renders App with correct CSS class", () => {
    const { container } = render(<App />);
    expect(container.firstChild).toHaveClass("App");
  });
});
