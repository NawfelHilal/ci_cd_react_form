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

describe("Form Component", () => {
  test("renders form", () => {
    render(<Form />);
    const formElement = screen.getByText(/Form/i);
    expect(formElement).toBeInTheDocument();
  });

  test("verify champs name", () => {
    render(<Form />);
    const firstName = screen.getByTestId("nom").querySelector("input");
    fireEvent.change(firstName, { target: { value: "Jean-Pierre" } });
    expect(firstName.value).toBe("Jean-Pierre");

    const lastName = screen.getByTestId("prenom").querySelector("input");
    fireEvent.change(lastName, { target: { value: "Élise" } });
    expect(lastName.value).toBe("Élise");
  });

  test("verify validate name", () => {
    render(<Form />);
    const firstName = screen.getByTestId("nom").querySelector("input");
    fireEvent.change(firstName, { target: { value: "Jean-Pierre" } });
    expect(validateName(firstName.value)).toBe(true);

    const lastName = screen.getByTestId("prenom").querySelector("input");
    fireEvent.change(lastName, { target: { value: "Élise&&&" } });
    expect(validateName(lastName.value)).toBe(false);
  });

  test("verify email field", () => {
    render(<Form />);
    const email = screen.getByTestId("email").querySelector("input");
    fireEvent.change(email, { target: { value: "test@example.com" } });
    expect(email.value).toBe("test@example.com");
    expect(validateEmail(email.value)).toBe(true);

    fireEvent.change(email, { target: { value: "invalid-email" } });
    expect(validateEmail(email.value)).toBe(false);
  });

  test("verify date of birth field", () => {
    render(<Form />);
    const dob = screen.getByTestId("dob").querySelector("input");
    fireEvent.change(dob, { target: { value: "2000-01-01" } });
    expect(dob.value).toBe("2000-01-01");
    expect(calculateAge(dob.value)).toBeGreaterThanOrEqual(18);

    fireEvent.change(dob, { target: { value: "2020-01-01" } });
    expect(calculateAge(dob.value)).toBeLessThan(18);
  });

  test("verify city field", () => {
    render(<Form />);
    const city = screen.getByTestId("city").querySelector("input");
    fireEvent.change(city, { target: { value: "Paris" } });
    expect(city.value).toBe("Paris");
    expect(validateCity(city.value)).toBe(true);

    fireEvent.change(city, { target: { value: "City123" } });
    expect(validateCity(city.value)).toBe(false);
  });

  test("verify postal code field", () => {
    render(<Form />);
    const postalCode = screen.getByTestId("postalCode").querySelector("input");
    fireEvent.change(postalCode, { target: { value: "75001" } });
    expect(postalCode.value).toBe("75001");
    expect(validatePostalCode(postalCode.value)).toBe(true);

    fireEvent.change(postalCode, { target: { value: "ABCDE" } });
    expect(validatePostalCode(postalCode.value)).toBe(false);
  });

  test("verify form submission", () => {
    render(<Form />);
    const firstName = screen.getByTestId("nom").querySelector("input");
    fireEvent.change(firstName, { target: { value: "Jean" } });

    const lastName = screen.getByTestId("prenom").querySelector("input");
    fireEvent.change(lastName, { target: { value: "Dupont" } });

    const email = screen.getByTestId("email").querySelector("input");
    fireEvent.change(email, { target: { value: "jean.dupont@example.com" } });

    const dob = screen.getByTestId("dob").querySelector("input");
    fireEvent.change(dob, { target: { value: "2000-01-01" } });

    const city = screen.getByTestId("city").querySelector("input");
    fireEvent.change(city, { target: { value: "Paris" } });

    const postalCode = screen.getByTestId("postalCode").querySelector("input");
    fireEvent.change(postalCode, { target: { value: "75001" } });

    const submitButton = screen.getByText(/Submit/i);
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);
    expect(screen.getByText(/Enregistrement réussi/i)).toBeInTheDocument();
  });

  test("verify data is stored in localStorage", () => {
    render(<Form />);
    const firstName = screen.getByTestId("nom").querySelector("input");
    fireEvent.change(firstName, { target: { value: "Jean" } });

    const lastName = screen.getByTestId("prenom").querySelector("input");
    fireEvent.change(lastName, { target: { value: "Dupont" } });

    const email = screen.getByTestId("email").querySelector("input");
    fireEvent.change(email, { target: { value: "jean.dupont@example.com" } });

    const dob = screen.getByTestId("dob").querySelector("input");
    fireEvent.change(dob, { target: { value: "2000-01-01" } });

    const city = screen.getByTestId("city").querySelector("input");
    fireEvent.change(city, { target: { value: "Paris" } });

    const postalCode = screen.getByTestId("postalCode").querySelector("input");
    fireEvent.change(postalCode, { target: { value: "75001" } });

    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    const storedData = JSON.parse(localStorage.getItem("registrationData"));
    expect(storedData).toEqual({
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@example.com",
      dob: "2000-01-01",
      city: "Paris",
      postalCode: "75001",
    });
  });

  // test("verify error handling on form submission with invalid data", async () => {
  //   render(<Form />);
  //   const firstName = screen.getByTestId("nom").querySelector("input");
  //   fireEvent.change(firstName, { target: { value: "" } });

  //   const lastName = screen.getByTestId("prenom").querySelector("input");
  //   fireEvent.change(lastName, { target: { value: "" } });

  //   const email = screen.getByTestId("email").querySelector("input");
  //   fireEvent.change(email, { target: { value: "invalid-email" } });

  //   const dob = screen.getByTestId("dob").querySelector("input");
  //   fireEvent.change(dob, { target: { value: "2020-01-01" } });

  //   const city = screen.getByTestId("city").querySelector("input");
  //   fireEvent.change(city, { target: { value: "City123" } });

  //   const postalCode = screen.getByTestId("postalCode").querySelector("input");
  //   fireEvent.change(postalCode, { target: { value: "ABCDE" } });

  //   const submitButton = screen.getByText(/Submit/i);
  //   fireEvent.click(submitButton);

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText(/Corrigez les erreurs dans le formulaire./i)
  //     ).toBeInTheDocument();
  //   });
  // });

  test("verify closing Snackbar messages", async () => {
    render(<Form />);
    const firstName = screen.getByTestId("nom").querySelector("input");
    fireEvent.change(firstName, { target: { value: "Jean" } });

    const lastName = screen.getByTestId("prenom").querySelector("input");
    fireEvent.change(lastName, { target: { value: "Dupont" } });

    const email = screen.getByTestId("email").querySelector("input");
    fireEvent.change(email, { target: { value: "jean.dupont@example.com" } });

    const dob = screen.getByTestId("dob").querySelector("input");
    fireEvent.change(dob, { target: { value: "2000-01-01" } });

    const city = screen.getByTestId("city").querySelector("input");
    fireEvent.change(city, { target: { value: "Paris" } });

    const postalCode = screen.getByTestId("postalCode").querySelector("input");
    fireEvent.change(postalCode, { target: { value: "75001" } });

    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    const successSnackbar = screen.getByText(/Enregistrement réussi/i);
    expect(successSnackbar).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(successSnackbar).not.toBeInTheDocument();
    });
  });

  test("verify submit button is disabled when form is invalid", () => {
    render(<Form />);
    const firstName = screen.getByTestId("nom").querySelector("input");
    fireEvent.change(firstName, { target: { value: "" } });

    const lastName = screen.getByTestId("prenom").querySelector("input");
    fireEvent.change(lastName, { target: { value: "" } });

    const email = screen.getByTestId("email").querySelector("input");
    fireEvent.change(email, { target: { value: "invalid-email" } });

    const dob = screen.getByTestId("dob").querySelector("input");
    fireEvent.change(dob, { target: { value: "2020-01-01" } });

    const city = screen.getByTestId("city").querySelector("input");
    fireEvent.change(city, { target: { value: "City123" } });

    const postalCode = screen.getByTestId("postalCode").querySelector("input");
    fireEvent.change(postalCode, { target: { value: "ABCDE" } });

    const submitButton = screen.getByText(/Submit/i);
    expect(submitButton).toBeDisabled();
  });
});
