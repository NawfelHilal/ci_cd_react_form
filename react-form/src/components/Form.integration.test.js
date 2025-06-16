import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "./Form";

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

jest.setTimeout(15000);

describe("Form Integration Tests", () => {
  beforeEach(() => {
    mockFetch.mockClear();
    localStorage.clear();
  });

  test("successfully submits form and shows success message", async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "User created successfully" }),
      })
    );

    render(<Form />);

    // Remplir le formulaire
    const inputs = {
      nom: "Jean",
      prenom: "Dupont",
      email: "jean.dupont@example.com",
      dob: new Date(Date.now() - 20 * 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      city: "Paris",
      postalCode: "75001",
    };

    for (const [id, value] of Object.entries(inputs)) {
      const input = screen.getByTestId(id).querySelector("input");
      fireEvent.change(input, { target: { value } });
    }

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    // Vérifier le message de succès
    await waitFor(
      () => {
        expect(screen.getByText("Enregistrement réussi")).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    // Vérifier l'appel API
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: expect.any(String),
      })
    );
  });

  test("handles API errors appropriately", async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Network error"))
    );

    render(<Form />);

    // Remplir le formulaire
    const inputs = {
      nom: "Jean",
      prenom: "Dupont",
      email: "jean.dupont@example.com",
      dob: new Date(Date.now() - 20 * 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      city: "Paris",
      postalCode: "75001",
    };

    for (const [id, value] of Object.entries(inputs)) {
      const input = screen.getByTestId(id).querySelector("input");
      fireEvent.change(input, { target: { value } });
    }

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    // Vérifier le message d'erreur
    await waitFor(
      () => {
        expect(
          screen.getByText("Erreur lors de l'enregistrement de l'utilisateur.")
        ).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  });

  test("handles network errors appropriately", async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Network error"))
    );

    render(<Form />);

    // Remplir le formulaire avec des données valides
    const inputs = {
      nom: "Jean",
      prenom: "Dupont",
      email: "jean.dupont@example.com",
      dob: new Date(Date.now() - 20 * 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      city: "Paris",
      postalCode: "75001",
    };

    for (const [id, value] of Object.entries(inputs)) {
      const input = screen.getByTestId(id).querySelector("input");
      fireEvent.change(input, { target: { value } });
    }

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(
          screen.getByText("Erreur lors de l'enregistrement de l'utilisateur.")
        ).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  });

  test("saves form data to localStorage", async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "User created successfully" }),
      })
    );

    render(<Form />);

    const testData = {
      nom: "Jean",
      prenom: "Dupont",
      email: "jean.dupont@example.com",
      dob: new Date(Date.now() - 20 * 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      city: "Paris",
      postalCode: "75001",
    };

    for (const [id, value] of Object.entries(testData)) {
      const input = screen.getByTestId(id).querySelector("input");
      fireEvent.change(input, { target: { value } });
    }

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        const savedData = JSON.parse(localStorage.getItem("formData"));
        expect(savedData).toEqual(
          expect.objectContaining({
            firstName: testData.nom,
            lastName: testData.prenom,
            email: testData.email,
            dob: testData.dob,
            city: testData.city,
            postalCode: testData.postalCode,
          })
        );
      },
      { timeout: 10000 }
    );
  });

  test("loads saved form data from localStorage", async () => {
    const savedData = {
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@example.com",
      dob: "2000-01-01",
      city: "Paris",
      postalCode: "75001",
    };

    localStorage.setItem("formData", JSON.stringify(savedData));

    render(<Form />);

    // Attendre que le composant charge les données
    await waitFor(
      () => {
        const nomInput = screen.getByTestId("nom").querySelector("input");
        const prenomInput = screen.getByTestId("prenom").querySelector("input");
        const emailInput = screen.getByTestId("email").querySelector("input");
        const dobInput = screen.getByTestId("dob").querySelector("input");
        const cityInput = screen.getByTestId("city").querySelector("input");
        const postalCodeInput = screen
          .getByTestId("postalCode")
          .querySelector("input");

        expect(nomInput.value).toBe("Jean");
        expect(prenomInput.value).toBe("Dupont");
        expect(emailInput.value).toBe("jean.dupont@example.com");
        expect(dobInput.value).toBe("2000-01-01");
        expect(cityInput.value).toBe("Paris");
        expect(postalCodeInput.value).toBe("75001");
      },
      { timeout: 10000 }
    );
  });

  test("handles malformed localStorage data", async () => {
    localStorage.setItem("formData", "invalid json");

    render(<Form />);

    // Vérifier que le formulaire est vide
    const inputs = ["nom", "prenom", "email", "dob", "city", "postalCode"];
    for (const id of inputs) {
      const input = screen.getByTestId(id).querySelector("input");
      expect(input.value).toBe("");
    }
  });
});
