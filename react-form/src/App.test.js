import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
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
});
