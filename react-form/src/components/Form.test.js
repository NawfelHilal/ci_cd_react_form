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
});
