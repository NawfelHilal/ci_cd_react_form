import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "./Form";
import {
  validateName,
  validateEmail,
  validatePostalCode,
  calculateAge,
  validateCity,
} from "../validation";

jest.mock("../services/api", () => ({
  userService: {
    createUser: jest.fn(() => Promise.resolve()),
  },
}));

describe("Form Unit Tests", () => {
  test("renders form fields", () => {
    render(<Form />);

    // Vérifier la présence des champs
    expect(screen.getByTestId("nom")).toBeInTheDocument();
    expect(screen.getByTestId("prenom")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("dob")).toBeInTheDocument();
    expect(screen.getByTestId("city")).toBeInTheDocument();
    expect(screen.getByTestId("postalCode")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("validates name field", () => {
    expect(validateName("Jean-Pierre")).toBe(true);
    expect(validateName("Élise")).toBe(true);
    expect(validateName("Jean123")).toBe(false);
    expect(validateName("Pierre@")).toBe(false);
  });

  test("validates email field", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("invalid-email")).toBe(false);
    expect(validateEmail("test@.com")).toBe(false);
    expect(validateEmail("test@domain")).toBe(false);
  });

  test("validates postal code field", () => {
    expect(validatePostalCode("75001")).toBe(true);
    expect(validatePostalCode("1234")).toBe(false);
    expect(validatePostalCode("ABCDE")).toBe(false);
    expect(validatePostalCode("123456")).toBe(false);
  });

  test("validates city field", () => {
    expect(validateCity("Paris")).toBe(true);
    expect(validateCity("Saint-Étienne")).toBe(true);
    expect(validateCity("City123")).toBe(false);
    expect(validateCity("Paris!")).toBe(false);
  });

  test("calculates age correctly", () => {
    const today = new Date();
    const past = new Date();
    past.setFullYear(today.getFullYear() - 20);
    const future = new Date();
    future.setFullYear(today.getFullYear() - 10);

    expect(
      calculateAge(past.toISOString().split("T")[0])
    ).toBeGreaterThanOrEqual(18);
    expect(calculateAge(future.toISOString().split("T")[0])).toBeLessThan(18);
  });

  test("submit button is initially disabled", () => {
    render(<Form />);
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });

  test("validates special characters in name fields", () => {
    expect(validateName("Marie-Thérèse")).toBe(true);
    expect(validateName("Jean-François")).toBe(true);
    expect(validateName("O'Connor")).toBe(true);
    expect(validateName("123Marie")).toBe(false);
  });

  test("validates empty fields", () => {
    expect(validateName("")).toBe(false);
    expect(validateEmail("")).toBe(false);
    expect(validateCity("")).toBe(false);
    expect(validatePostalCode("")).toBe(false);
  });

  test("validates edge cases for postal code", () => {
    expect(validatePostalCode("00000")).toBe(true);
    expect(validatePostalCode("99999")).toBe(true);
    expect(validatePostalCode("0123")).toBe(false);
    expect(validatePostalCode("100000")).toBe(false);
  });

  test("validates edge cases for date of birth", () => {
    const today = new Date();
    const dates = {
      exactly18: new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      ),
      almost18: new Date(
        today.getFullYear() - 17,
        today.getMonth(),
        today.getDate()
      ),
      over100: new Date(
        today.getFullYear() - 101,
        today.getMonth(),
        today.getDate()
      ),
    };

    expect(calculateAge(dates.exactly18.toISOString().split("T")[0])).toBe(18);
    expect(calculateAge(dates.almost18.toISOString().split("T")[0])).toBe(17);
    expect(calculateAge(dates.over100.toISOString().split("T")[0])).toBe(101);
  });
});

describe("Form coverage tests", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  function fillValidForm() {
    fireEvent.change(screen.getByTestId("nom").querySelector("input"), {
      target: { value: "Jean" },
    });
    fireEvent.change(screen.getByTestId("prenom").querySelector("input"), {
      target: { value: "Dupont" },
    });
    fireEvent.change(screen.getByTestId("email").querySelector("input"), {
      target: { value: "jean@ex.com" },
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
  }

  it("affiche le helperText d'erreur sur le champ nom si nom invalide", async () => {
    render(<Form />);
    fireEvent.change(screen.getByTestId("nom").querySelector("input"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByTestId("prenom").querySelector("input"), {
      target: { value: "Dupont" },
    });
    fireEvent.change(screen.getByTestId("email").querySelector("input"), {
      target: { value: "jean@ex.com" },
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
    expect(
      screen.getByText(
        "Le champ nom ne doit contenir que des lettres et des accents."
      )
    ).toBeInTheDocument();
  });

  it("affiche le helperText d'erreur sur le champ email si email invalide", async () => {
    render(<Form />);
    fireEvent.change(screen.getByTestId("nom").querySelector("input"), {
      target: { value: "Jean" },
    });
    fireEvent.change(screen.getByTestId("prenom").querySelector("input"), {
      target: { value: "Dupont" },
    });
    fireEvent.change(screen.getByTestId("email").querySelector("input"), {
      target: { value: "notanemail" },
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
    expect(screen.getByText("Invalide champs email.")).toBeInTheDocument();
  });

  it("affiche le Snackbar de succès après soumission valide", async () => {
    render(<Form />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(
      await screen.findByText("Enregistrement réussi")
    ).toBeInTheDocument();
  });

  it("gère une erreur lors de l'appel API (catch)", async () => {
    const { userService } = require("../services/api");
    userService.createUser.mockImplementationOnce(() =>
      Promise.reject(new Error("API Error"))
    );
    render(<Form />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent("API Error");
  });

  it("appelle la prop onUserAdded si fournie", async () => {
    const onUserAdded = jest.fn();
    render(<Form onUserAdded={onUserAdded} />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => expect(onUserAdded).toHaveBeenCalled());
  });

  it("réinitialise le formulaire après succès", async () => {
    render(<Form />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => {
      expect(screen.getByTestId("nom").querySelector("input")).toHaveValue("");
      expect(screen.getByTestId("prenom").querySelector("input")).toHaveValue(
        ""
      );
      expect(screen.getByTestId("email").querySelector("input")).toHaveValue(
        ""
      );
      expect(screen.getByTestId("dob").querySelector("input")).toHaveValue("");
      expect(screen.getByTestId("city").querySelector("input")).toHaveValue("");
      expect(
        screen.getByTestId("postalCode").querySelector("input")
      ).toHaveValue("");
    });
  });

  it("le bouton submit est désactivé si un champ est vide", () => {
    render(<Form />);
    fillValidForm();
    fireEvent.change(screen.getByTestId("nom").querySelector("input"), {
      target: { value: "" },
    });
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });

  it("le bouton submit est activé si tous les champs sont remplis", () => {
    render(<Form />);
    fillValidForm();
    expect(screen.getByRole("button", { name: /submit/i })).not.toBeDisabled();
  });

  // Nouveaux tests pour améliorer la couverture
  it("affiche l'erreur de validation pour le champ prénom", async () => {
    render(<Form />);
    fireEvent.change(screen.getByTestId("nom").querySelector("input"), {
      target: { value: "Jean" },
    });
    fireEvent.change(screen.getByTestId("prenom").querySelector("input"), {
      target: { value: "123" }, // Prénom invalide
    });
    fireEvent.change(screen.getByTestId("email").querySelector("input"), {
      target: { value: "jean@ex.com" },
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
    expect(
      screen.getByText("Le champ prenom ne doit contenir que des lettres et des accents.")
    ).toBeInTheDocument();
  });

  it("affiche l'erreur de validation pour l'âge insuffisant", async () => {
    render(<Form />);
    fireEvent.change(screen.getByTestId("nom").querySelector("input"), {
      target: { value: "Jean" },
    });
    fireEvent.change(screen.getByTestId("prenom").querySelector("input"), {
      target: { value: "Dupont" },
    });
    fireEvent.change(screen.getByTestId("email").querySelector("input"), {
      target: { value: "jean@ex.com" },
    });
    fireEvent.change(screen.getByTestId("dob").querySelector("input"), {
      target: { value: "2010-01-01" }, // Trop jeune
    });
    fireEvent.change(screen.getByTestId("city").querySelector("input"), {
      target: { value: "Paris" },
    });
    fireEvent.change(screen.getByTestId("postalCode").querySelector("input"), {
      target: { value: "75000" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(
      screen.getByText("Vous devez avoir plus de 18 ans.")
    ).toBeInTheDocument();
  });

  it("affiche l'erreur de validation pour la ville", async () => {
    render(<Form />);
    fireEvent.change(screen.getByTestId("nom").querySelector("input"), {
      target: { value: "Jean" },
    });
    fireEvent.change(screen.getByTestId("prenom").querySelector("input"), {
      target: { value: "Dupont" },
    });
    fireEvent.change(screen.getByTestId("email").querySelector("input"), {
      target: { value: "jean@ex.com" },
    });
    fireEvent.change(screen.getByTestId("dob").querySelector("input"), {
      target: { value: "2000-01-01" },
    });
    fireEvent.change(screen.getByTestId("city").querySelector("input"), {
      target: { value: "Paris123" }, // Ville invalide
    });
    fireEvent.change(screen.getByTestId("postalCode").querySelector("input"), {
      target: { value: "75000" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(
      screen.getByText("Le champ ville ne doit contenir que des lettres et des accents.")
    ).toBeInTheDocument();
  });

  it("affiche l'erreur de validation pour le code postal", async () => {
    render(<Form />);
    fireEvent.change(screen.getByTestId("nom").querySelector("input"), {
      target: { value: "Jean" },
    });
    fireEvent.change(screen.getByTestId("prenom").querySelector("input"), {
      target: { value: "Dupont" },
    });
    fireEvent.change(screen.getByTestId("email").querySelector("input"), {
      target: { value: "jean@ex.com" },
    });
    fireEvent.change(screen.getByTestId("dob").querySelector("input"), {
      target: { value: "2000-01-01" },
    });
    fireEvent.change(screen.getByTestId("city").querySelector("input"), {
      target: { value: "Paris" },
    });
    fireEvent.change(screen.getByTestId("postalCode").querySelector("input"), {
      target: { value: "ABCDE" }, // Code postal invalide
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(
      screen.getByText("Le code postale doit être au format français.")
    ).toBeInTheDocument();
  });

  it("supprime les erreurs de champ nom après correction", async () => {
    render(<Form />);
    
    // Remplir avec des données partiellement invalides et soumettre
    fireEvent.change(screen.getByTestId("nom").querySelector("input"), {
      target: { value: "123" }, // Invalide
    });
    fillValidForm(); // Autres champs valides
    fireEvent.change(screen.getByTestId("nom").querySelector("input"), {
      target: { value: "123" }, // Garder invalide
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    
    // Vérifier que l'erreur apparaît
    expect(
      screen.getByText("Le champ nom ne doit contenir que des lettres et des accents.")
    ).toBeInTheDocument();
    
    // Corriger le champ nom
    fireEvent.change(screen.getByTestId("nom").querySelector("input"), {
      target: { value: "Jean" }, // Valide maintenant
    });
    
    // L'erreur devrait disparaître
    await waitFor(() => {
      expect(
        screen.queryByText("Le champ nom ne doit contenir que des lettres et des accents.")
      ).not.toBeInTheDocument();
    });
  });

  it("supprime les erreurs de champ prénom après correction", async () => {
    render(<Form />);
    
    // Soumettre avec prénom invalide
    fillValidForm();
    fireEvent.change(screen.getByTestId("prenom").querySelector("input"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    
    expect(
      screen.getByText("Le champ prenom ne doit contenir que des lettres et des accents.")
    ).toBeInTheDocument();
    
    // Corriger le prénom
    fireEvent.change(screen.getByTestId("prenom").querySelector("input"), {
      target: { value: "Pierre" },
    });
    
    await waitFor(() => {
      expect(
        screen.queryByText("Le champ prenom ne doit contenir que des lettres et des accents.")
      ).not.toBeInTheDocument();
    });
  });

  it("supprime les erreurs de champ email après correction", async () => {
    render(<Form />);
    
    // Soumettre avec email invalide
    fillValidForm();
    fireEvent.change(screen.getByTestId("email").querySelector("input"), {
      target: { value: "invalid" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    
    expect(screen.getByText("Invalide champs email.")).toBeInTheDocument();
    
    // Corriger l'email
    fireEvent.change(screen.getByTestId("email").querySelector("input"), {
      target: { value: "valid@email.com" },
    });
    
    await waitFor(() => {
      expect(screen.queryByText("Invalide champs email.")).not.toBeInTheDocument();
    });
  });

  it("supprime les erreurs de champ dob après correction", async () => {
    render(<Form />);
    
    // Soumettre avec âge invalide
    fillValidForm();
    fireEvent.change(screen.getByTestId("dob").querySelector("input"), {
      target: { value: "2010-01-01" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    
    expect(screen.getByText("Vous devez avoir plus de 18 ans.")).toBeInTheDocument();
    
    // Corriger la date
    fireEvent.change(screen.getByTestId("dob").querySelector("input"), {
      target: { value: "1990-01-01" },
    });
    
    await waitFor(() => {
      expect(screen.queryByText("Vous devez avoir plus de 18 ans.")).not.toBeInTheDocument();
    });
  });

  it("supprime les erreurs de champ city après correction", async () => {
    render(<Form />);
    
    // Soumettre avec ville invalide
    fillValidForm();
    fireEvent.change(screen.getByTestId("city").querySelector("input"), {
      target: { value: "Paris123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    
    expect(
      screen.getByText("Le champ ville ne doit contenir que des lettres et des accents.")
    ).toBeInTheDocument();
    
    // Corriger la ville
    fireEvent.change(screen.getByTestId("city").querySelector("input"), {
      target: { value: "Paris" },
    });
    
    await waitFor(() => {
      expect(
        screen.queryByText("Le champ ville ne doit contenir que des lettres et des accents.")
      ).not.toBeInTheDocument();
    });
  });

  it("supprime les erreurs de champ postalCode après correction", async () => {
    render(<Form />);
    
    // Soumettre avec code postal invalide
    fillValidForm();
    fireEvent.change(screen.getByTestId("postalCode").querySelector("input"), {
      target: { value: "ABCDE" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    
    expect(
      screen.getByText("Le code postale doit être au format français.")
    ).toBeInTheDocument();
    
    // Corriger le code postal
    fireEvent.change(screen.getByTestId("postalCode").querySelector("input"), {
      target: { value: "75001" },
    });
    
    await waitFor(() => {
      expect(
        screen.queryByText("Le code postale doit être au format français.")
      ).not.toBeInTheDocument();
    });
  });

  it("ferme le Snackbar d'erreur", async () => {
    const { userService } = require("../services/api");
    userService.createUser.mockImplementationOnce(() =>
      Promise.reject(new Error("Test error"))
    );
    
    render(<Form />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    
    // Attendre que l'erreur apparaisse
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
    
    // Fermer le Snackbar
    const closeButton = screen.getAllByRole("button").find(btn => 
      btn.getAttribute("aria-label") === "Close"
    );
    if (closeButton) {
      fireEvent.click(closeButton);
    }
    
    await waitFor(() => {
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  it("ferme le Snackbar de succès", async () => {
    render(<Form />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    
    // Attendre que le succès apparaisse
    await waitFor(() => {
      expect(screen.getByText("Enregistrement réussi")).toBeInTheDocument();
    });
    
    // Fermer le Snackbar
    const closeButton = screen.getAllByRole("button").find(btn => 
      btn.getAttribute("aria-label") === "Close"
    );
    if (closeButton) {
      fireEvent.click(closeButton);
    }
    
    await waitFor(() => {
      expect(screen.queryByText("Enregistrement réussi")).not.toBeInTheDocument();
    });
  });

  it("gère une erreur API sans message spécifique", async () => {
    const { userService } = require("../services/api");
    userService.createUser.mockImplementationOnce(() =>
      Promise.reject({}) // Erreur sans message
    );
    
    render(<Form />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Erreur lors de l'enregistrement de l'utilisateur."
      );
    });
  });

  it("charge les données depuis localStorage au montage", () => {
    const savedData = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      dob: "1990-01-01",
      city: "New York",
      postalCode: "12345"
    };
    
    localStorage.setItem("formData", JSON.stringify(savedData));
    
    render(<Form />);
    
    expect(screen.getByTestId("nom").querySelector("input")).toHaveValue("John");
    expect(screen.getByTestId("prenom").querySelector("input")).toHaveValue("Doe");
    expect(screen.getByTestId("email").querySelector("input")).toHaveValue("john@example.com");
    expect(screen.getByTestId("dob").querySelector("input")).toHaveValue("1990-01-01");
    expect(screen.getByTestId("city").querySelector("input")).toHaveValue("New York");
    expect(screen.getByTestId("postalCode").querySelector("input")).toHaveValue("12345");
  });

  it("gère l'erreur de parsing localStorage", () => {
    // Mock console.error pour éviter les logs d'erreur pendant le test
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    
    // Mettre des données invalides dans localStorage
    localStorage.setItem("formData", "invalid json");
    
    render(<Form />);
    
    // Les champs devraient être vides
    expect(screen.getByTestId("nom").querySelector("input")).toHaveValue("");
    expect(screen.getByTestId("prenom").querySelector("input")).toHaveValue("");
    
    // Vérifier que l'erreur a été logguée
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error loading form data:",
      expect.any(Error)
    );
    
    // Vérifier que localStorage a été nettoyé
    expect(localStorage.getItem("formData")).toBeNull();
    
    consoleErrorSpy.mockRestore();
  });

  it("gère les données localStorage nulles ou invalides", () => {
    localStorage.setItem("formData", JSON.stringify(null));
    
    render(<Form />);
    
    // Les champs devraient être vides
    expect(screen.getByTestId("nom").querySelector("input")).toHaveValue("");
  });

  it("gère les données localStorage non-objet", () => {
    localStorage.setItem("formData", JSON.stringify("not an object"));
    
    render(<Form />);
    
    // Les champs devraient être vides
    expect(screen.getByTestId("nom").querySelector("input")).toHaveValue("");
  });
});
