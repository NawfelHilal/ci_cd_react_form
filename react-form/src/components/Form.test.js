import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "./Form";
import {
  validateName,
  validateEmail,
  validatePostalCode,
  calculateAge,
  validateCity,
} from "../validation";

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
