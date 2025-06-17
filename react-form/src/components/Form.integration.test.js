import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "./Form";
import { userService } from "../services/api";

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Augmenter le timeout global pour les tests
jest.setTimeout(15000);

describe("Form Integration Tests", () => {
  let originalConsoleError;
  let originalConsoleLog;

  beforeEach(() => {
    mockFetch.mockClear();
    localStorage.clear();
    jest.clearAllMocks();
    // Sauvegarder les fonctions originales de console
    originalConsoleError = console.error;
    originalConsoleLog = console.log;
    // Supprimer les logs pendant les tests
    console.error = jest.fn();
    console.log = jest.fn();
  });

  afterEach(() => {
    // Restaurer les fonctions originales de console
    console.error = originalConsoleError;
    console.log = originalConsoleLog;
  });

  test("renders form component", () => {
    render(<Form />);
    expect(screen.getByTestId("nom")).toBeInTheDocument();
  });

  // test("successfully submits form and shows success message", async () => {
  //   mockFetch.mockImplementationOnce(() =>
  //     Promise.resolve({
  //       ok: true,
  //       json: () => Promise.resolve({ message: "User created successfully" }),
  //     })
  //   );

  //   await act(async () => {
  //     render(<Form />);
  //   });

  //   // Remplir le formulaire
  //   const inputs = {
  //     nom: "Jean",
  //     prenom: "Dupont",
  //     email: "jean.dupont@example.com",
  //     dob: new Date(Date.now() - 20 * 365 * 24 * 60 * 60 * 1000)
  //       .toISOString()
  //       .split("T")[0],
  //     city: "Paris",
  //     postalCode: "75001",
  //   };

  //   for (const [id, value] of Object.entries(inputs)) {
  //     const input = screen.getByTestId(id).querySelector("input");
  //     await act(async () => {
  //       fireEvent.change(input, { target: { value } });
  //     });
  //   }

  //   const submitButton = screen.getByRole("button", { name: /submit/i });
  //   await act(async () => {
  //     fireEvent.click(submitButton);
  //   });

  //   // Vérifier le message de succès
  //   await waitFor(
  //     () => {
  //       expect(screen.getByText("Enregistrement réussi")).toBeInTheDocument();
  //     },
  //     { timeout: 10000 }
  //   );

  //   // Vérifier l'appel API
  //   expect(mockFetch).toHaveBeenCalledWith(
  //     expect.any(String),
  //     expect.objectContaining({
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: expect.any(String),
  //     })
  //   );
  // });

  // test("handles API errors appropriately", async () => {
  //   mockFetch.mockImplementationOnce(() =>
  //     Promise.reject(new Error("Network error"))
  //   );

  //   await act(async () => {
  //     render(<Form />);
  //   });

  //   // Remplir le formulaire
  //   const inputs = {
  //     nom: "Jean",
  //     prenom: "Dupont",
  //     email: "jean.dupont@example.com",
  //     dob: new Date(Date.now() - 20 * 365 * 24 * 60 * 60 * 1000)
  //       .toISOString()
  //       .split("T")[0],
  //     city: "Paris",
  //     postalCode: "75001",
  //   };

  //   for (const [id, value] of Object.entries(inputs)) {
  //     const input = screen.getByTestId(id).querySelector("input");
  //     await act(async () => {
  //       fireEvent.change(input, { target: { value } });
  //     });
  //   }

  //   const submitButton = screen.getByRole("button", { name: /submit/i });
  //   await act(async () => {
  //     fireEvent.click(submitButton);
  //   });

  //   // Vérifier le message d'erreur
  //   await waitFor(
  //     () => {
  //       expect(
  //         screen.getByText("Erreur lors de l'enregistrement de l'utilisateur.")
  //       ).toBeInTheDocument();
  //     },
  //     { timeout: 10000 }
  //   );
  // });

  // test("saves form data to localStorage", async () => {
  //   mockFetch.mockImplementationOnce(() =>
  //     Promise.resolve({
  //       ok: true,
  //       json: () => Promise.resolve({ message: "User created successfully" }),
  //     })
  //   );

  //   await act(async () => {
  //     render(<Form />);
  //   });

  //   const testData = {
  //     nom: "Jean",
  //     prenom: "Dupont",
  //     email: "jean.dupont@example.com",
  //     dob: new Date(Date.now() - 20 * 365 * 24 * 60 * 60 * 1000)
  //       .toISOString()
  //       .split("T")[0],
  //     city: "Paris",
  //     postalCode: "75001",
  //   };

  //   // Remplir le formulaire
  //   for (const [id, value] of Object.entries(testData)) {
  //     const input = screen.getByTestId(id).querySelector("input");
  //     await act(async () => {
  //       fireEvent.change(input, { target: { value } });
  //     });
  //   }

  //   // Soumettre le formulaire
  //   const submitButton = screen.getByRole("button", { name: /submit/i });
  //   await act(async () => {
  //     fireEvent.click(submitButton);
  //   });

  //   // Vérifier que les données sont sauvegardées dans le localStorage
  //   await waitFor(() => {
  //     expect(localStorage.setItem).toHaveBeenCalledWith(
  //       "formData",
  //       expect.any(String)
  //     );
  //   });

  //   // Vérifier le contenu exact des données sauvegardées
  //   const savedData = JSON.parse(localStorage.getItem("formData"));
  //   expect(savedData).toEqual({
  //     firstName: testData.nom,
  //     lastName: testData.prenom,
  //     email: testData.email,
  //     dob: testData.dob,
  //     city: testData.city,
  //     postalCode: testData.postalCode,
  //   });
  // });

  // test("loads saved form data from localStorage", async () => {
  //   const savedData = {
  //     firstName: "Jean",
  //     lastName: "Dupont",
  //     email: "jean.dupont@example.com",
  //     dob: "2000-01-01",
  //     city: "Paris",
  //     postalCode: "75001",
  //   };

  //   // Sauvegarder les données dans le localStorage avant le rendu
  //   localStorage.setItem("formData", JSON.stringify(savedData));

  //   // Rendre le composant
  //   await act(async () => {
  //     render(<Form />);
  //   });

  //   // Vérifier que les données sont chargées dans le formulaire
  //   await waitFor(() => {
  //     const nomInput = screen.getByTestId("nom").querySelector("input");
  //     const prenomInput = screen.getByTestId("prenom").querySelector("input");
  //     const emailInput = screen.getByTestId("email").querySelector("input");
  //     const dobInput = screen.getByTestId("dob").querySelector("input");
  //     const cityInput = screen.getByTestId("city").querySelector("input");
  //     const postalCodeInput = screen
  //       .getByTestId("postalCode")
  //       .querySelector("input");

  //     expect(nomInput.value).toBe(savedData.firstName);
  //     expect(prenomInput.value).toBe(savedData.lastName);
  //     expect(emailInput.value).toBe(savedData.email);
  //     expect(dobInput.value).toBe(savedData.dob);
  //     expect(cityInput.value).toBe(savedData.city);
  //     expect(postalCodeInput.value).toBe(savedData.postalCode);
  //   });
  // });

  // test("handles malformed localStorage data", async () => {
  //   // Simuler des données corrompues dans le localStorage
  //   localStorage.setItem("formData", "invalid json");

  //   // Rendre le composant
  //   await act(async () => {
  //     render(<Form />);
  //   });

  //   // Vérifier que le formulaire est vide
  //   await waitFor(() => {
  //     const inputs = ["nom", "prenom", "email", "dob", "city", "postalCode"];
  //     for (const id of inputs) {
  //       const input = screen.getByTestId(id).querySelector("input");
  //       expect(input.value).toBe("");
  //     }
  //   });
  // });

  // test("clears localStorage after successful submission", async () => {
  //   mockFetch.mockImplementationOnce(() =>
  //     Promise.resolve({
  //       ok: true,
  //       json: () => Promise.resolve({ message: "User created successfully" }),
  //     })
  //   );

  //   await act(async () => {
  //     render(<Form />);
  //   });

  //   const testData = {
  //     nom: "Jean",
  //     prenom: "Dupont",
  //     email: "jean.dupont@example.com",
  //     dob: new Date(Date.now() - 20 * 365 * 24 * 60 * 60 * 1000)
  //       .toISOString()
  //       .split("T")[0],
  //     city: "Paris",
  //     postalCode: "75001",
  //   };

  //   // Remplir le formulaire
  //   for (const [id, value] of Object.entries(testData)) {
  //     const input = screen.getByTestId(id).querySelector("input");
  //     await act(async () => {
  //       fireEvent.change(input, { target: { value } });
  //     });
  //   }

  //   // Soumettre le formulaire
  //   const submitButton = screen.getByRole("button", { name: /submit/i });
  //   await act(async () => {
  //     fireEvent.click(submitButton);
  //   });

  //   // Vérifier que le localStorage est nettoyé après la soumission réussie
  //   await waitFor(() => {
  //     expect(localStorage.removeItem).toHaveBeenCalledWith("formData");
  //   });

  //   // Vérifier que les données ont été supprimées
  //   expect(localStorage.getItem("formData")).toBeNull();
  // });

  // test("handles validation errors correctly", async () => {
  //   await act(async () => {
  //     render(<Form />);
  //   });

  //   const testData = {
  //     nom: "123", // Invalid name
  //     prenom: "Dupont",
  //     email: "invalid-email", // Invalid email
  //     dob: new Date().toISOString().split("T")[0], // Invalid age
  //     city: "Paris123", // Invalid city
  //     postalCode: "ABC", // Invalid postal code
  //   };

  //   for (const [id, value] of Object.entries(testData)) {
  //     const input = screen.getByTestId(id).querySelector("input");
  //     await act(async () => {
  //       fireEvent.change(input, { target: { value } });
  //     });
  //   }

  //   const submitButton = screen.getByRole("button", { name: /submit/i });
  //   await act(async () => {
  //     fireEvent.click(submitButton);
  //   });

  //   await waitFor(
  //     () => {
  //       expect(
  //         screen.getByText("Corrigez les erreurs dans le formulaire.")
  //       ).toBeInTheDocument();
  //       expect(
  //         screen.getByText(
  //           "Le champ nom ne doit contenir que des lettres et des accents."
  //         )
  //       ).toBeInTheDocument();
  //       expect(screen.getByText("Invalide champs email.")).toBeInTheDocument();
  //       expect(
  //         screen.getByText("Vous devez avoir plus de 18 ans.")
  //       ).toBeInTheDocument();
  //       expect(
  //         screen.getByText(
  //           "Le champ ville ne doit contenir que des lettres et des accents."
  //         )
  //       ).toBeInTheDocument();
  //       expect(
  //         screen.getByText("Le code postale doit être au format français.")
  //       ).toBeInTheDocument();
  //     },
  //     { timeout: 10000 }
  //   );
  // });
});
