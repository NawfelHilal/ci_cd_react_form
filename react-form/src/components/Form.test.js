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

  test("verify fields are cleared after successful submission", async () => {
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

    expect(firstName.value).toBe("Jean");
    expect(lastName.value).toBe("Dupont");
    expect(email.value).toBe("jean.dupont@example.com");
    expect(dob.value).toBe("2000-01-01");
    expect(city.value).toBe("Paris");
    expect(postalCode.value).toBe("75001");

    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Enregistrement réussi/i)).toBeInTheDocument();
    });

    expect(firstName.value).toBe("");
    expect(lastName.value).toBe("");
    expect(email.value).toBe("");
    expect(dob.value).toBe("");
    expect(city.value).toBe("");
    expect(postalCode.value).toBe("");
  });

  test("verify error handling on form submission with invalid data", async () => {
    render(<Form />);

    const firstName = screen.getByTestId("nom").querySelector("input");
    fireEvent.change(firstName, { target: { value: "Jean123" } });

    const lastName = screen.getByTestId("prenom").querySelector("input");
    fireEvent.change(lastName, { target: { value: "Dupont456" } });

    const email = screen.getByTestId("email").querySelector("input");
    fireEvent.change(email, { target: { value: "invalid-email" } });

    const dob = screen.getByTestId("dob").querySelector("input");
    fireEvent.change(dob, { target: { value: "2020-01-01" } });

    const city = screen.getByTestId("city").querySelector("input");
    fireEvent.change(city, { target: { value: "City123" } });

    const postalCode = screen.getByTestId("postalCode").querySelector("input");
    fireEvent.change(postalCode, { target: { value: "ABCDE" } });

    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorAlert = screen.getByRole("alert");
      expect(errorAlert).toBeInTheDocument();
      expect(errorAlert).toHaveTextContent(/Corrigez les erreurs/i);
    });
  });

  test("verify closing error Snackbar message", async () => {
    render(<Form />);
    // Remplir le formulaire avec des données invalides
    const firstName = screen.getByTestId("nom").querySelector("input");
    fireEvent.change(firstName, { target: { value: "Jean123" } });

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

    // Soumettre le formulaire pour déclencher l'erreur
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    // Attendre l'affichage de l'alerte d'erreur
    await waitFor(() => {
      const errorAlert = screen.getByRole("alert");
      expect(errorAlert).toBeInTheDocument();
    });

    // Fermer la notification d'erreur
    const closeButton = screen.getAllByRole("button", { name: /close/i })[0];
    fireEvent.click(closeButton);

    // Vérifier que la notification d'erreur est fermée
    await waitFor(() => {
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  test("verify field errors are cleared when field value becomes valid", async () => {
    render(<Form />);

    // Remplir tous les champs avec des valeurs (certaines invalides)
    const firstName = screen.getByTestId("nom").querySelector("input");
    fireEvent.change(firstName, { target: { value: "Jean123" } });

    const lastName = screen.getByTestId("prenom").querySelector("input");
    fireEvent.change(lastName, { target: { value: "Dupont" } });

    const email = screen.getByTestId("email").querySelector("input");
    fireEvent.change(email, { target: { value: "jean.dupont@example.com" } });

    const dob = screen.getByTestId("dob").querySelector("input");
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 20);
    const formattedPastDate = pastDate.toISOString().split("T")[0];
    fireEvent.change(dob, { target: { value: formattedPastDate } });

    const city = screen.getByTestId("city").querySelector("input");
    fireEvent.change(city, { target: { value: "Paris" } });

    const postalCode = screen.getByTestId("postalCode").querySelector("input");
    fireEvent.change(postalCode, { target: { value: "75001" } });

    // Soumettre le formulaire pour déclencher l'affichage des erreurs
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    // Attendre que les erreurs s'affichent
    await waitFor(() => {
      expect(
        screen.getByText(/Le champ nom ne doit contenir que des lettres/i)
      ).toBeInTheDocument();
    });

    // Corriger le champ firstName
    fireEvent.change(firstName, { target: { value: "Jean" } });

    // Vérifier que l'erreur a disparu
    await waitFor(() => {
      expect(
        screen.queryByText(/Le champ nom ne doit contenir que des lettres/i)
      ).not.toBeInTheDocument();
    });

    // Pour tester l'email, d'abord le rendre invalide
    fireEvent.change(email, { target: { value: "invalid-email" } });

    // Soumettre à nouveau pour afficher l'erreur d'email
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalide champs email/i)).toBeInTheDocument();
    });

    // Corriger l'email
    fireEvent.change(email, { target: { value: "valid@example.com" } });

    // Vérifier que l'erreur d'email a disparu
    await waitFor(() => {
      expect(
        screen.queryByText(/Invalide champs email/i)
      ).not.toBeInTheDocument();
    });
  });

  test("verify age calculation and validation", async () => {
    render(<Form />);

    // Remplir les champs requis pour pouvoir soumettre
    const firstName = screen.getByTestId("nom").querySelector("input");
    fireEvent.change(firstName, { target: { value: "Jean" } });

    const lastName = screen.getByTestId("prenom").querySelector("input");
    fireEvent.change(lastName, { target: { value: "Dupont" } });

    const email = screen.getByTestId("email").querySelector("input");
    fireEvent.change(email, { target: { value: "jean.dupont@example.com" } });

    const city = screen.getByTestId("city").querySelector("input");
    fireEvent.change(city, { target: { value: "Paris" } });

    const postalCode = screen.getByTestId("postalCode").querySelector("input");
    fireEvent.change(postalCode, { target: { value: "75001" } });

    // Test avec un âge inférieur à 18 ans
    const dob = screen.getByTestId("dob").querySelector("input");
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() - 10); // 10 ans
    const formattedFutureDate = futureDate.toISOString().split("T")[0];

    fireEvent.change(dob, { target: { value: formattedFutureDate } });

    // Soumettre pour afficher l'erreur
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Vous devez avoir plus de 18 ans/i)
      ).toBeInTheDocument();
    });

    // Test avec un âge supérieur à 18 ans
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 20); // 20 ans
    const formattedPastDate = pastDate.toISOString().split("T")[0];

    fireEvent.change(dob, { target: { value: formattedPastDate } });

    // Vérifier que l'erreur disparaît
    await waitFor(() => {
      expect(
        screen.queryByText(/Vous devez avoir plus de 18 ans/i)
      ).not.toBeInTheDocument();
    });
  });

  test("verify postal code validation", async () => {
    render(<Form />);

    // Remplir les champs requis pour pouvoir soumettre
    const firstName = screen.getByTestId("nom").querySelector("input");
    fireEvent.change(firstName, { target: { value: "Jean" } });

    const lastName = screen.getByTestId("prenom").querySelector("input");
    fireEvent.change(lastName, { target: { value: "Dupont" } });

    const email = screen.getByTestId("email").querySelector("input");
    fireEvent.change(email, { target: { value: "jean.dupont@example.com" } });

    const dob = screen.getByTestId("dob").querySelector("input");
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 20);
    const formattedPastDate = pastDate.toISOString().split("T")[0];
    fireEvent.change(dob, { target: { value: formattedPastDate } });

    const city = screen.getByTestId("city").querySelector("input");
    fireEvent.change(city, { target: { value: "Paris" } });

    // Test avec un code postal invalide
    const postalCode = screen.getByTestId("postalCode").querySelector("input");
    fireEvent.change(postalCode, { target: { value: "1234" } }); // trop court

    // Soumettre pour afficher l'erreur
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Le code postale doit être au format français/i)
      ).toBeInTheDocument();
    });

    // Test avec des lettres
    fireEvent.change(postalCode, { target: { value: "ABCDE" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Le code postale doit être au format français/i)
      ).toBeInTheDocument();
    });

    // Test avec un code postal valide
    fireEvent.change(postalCode, { target: { value: "75001" } });

    // Vérifier que l'erreur disparaît
    await waitFor(() => {
      expect(
        screen.queryByText(/Le code postale doit être au format français/i)
      ).not.toBeInTheDocument();
    });
  });

  // Ajoutez ce test pour vérifier la validation de la ville
  test("verify city validation", async () => {
    render(<Form />);

    // Remplir les champs requis pour pouvoir soumettre
    const firstName = screen.getByTestId("nom").querySelector("input");
    fireEvent.change(firstName, { target: { value: "Jean" } });

    const lastName = screen.getByTestId("prenom").querySelector("input");
    fireEvent.change(lastName, { target: { value: "Dupont" } });

    const email = screen.getByTestId("email").querySelector("input");
    fireEvent.change(email, { target: { value: "jean.dupont@example.com" } });

    const dob = screen.getByTestId("dob").querySelector("input");
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 20);
    const formattedPastDate = pastDate.toISOString().split("T")[0];
    fireEvent.change(dob, { target: { value: formattedPastDate } });

    const postalCode = screen.getByTestId("postalCode").querySelector("input");
    fireEvent.change(postalCode, { target: { value: "75001" } });

    // Test avec une ville invalide
    const city = screen.getByTestId("city").querySelector("input");
    fireEvent.change(city, { target: { value: "Paris123" } }); // Ville avec chiffres

    // Soumettre pour afficher l'erreur
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Le champ ville ne doit contenir que des lettres/i)
      ).toBeInTheDocument();
    });

    // Test avec une ville valide
    fireEvent.change(city, { target: { value: "Paris" } });

    // Vérifier que l'erreur disparaît
    await waitFor(() => {
      expect(
        screen.queryByText(/Le champ ville ne doit contenir que des lettres/i)
      ).not.toBeInTheDocument();
    });
  });

  // Test pour vérifier le reset du formulaire avec un champ firstName invalide
  test("verify form reset with invalid firstName", async () => {
    render(<Form />);

    // Remplir les champs avec firstName invalide
    const firstName = screen.getByTestId("nom").querySelector("input");
    fireEvent.change(firstName, { target: { value: "Jean123" } });

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

    // Soumettre le formulaire
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    // Attendre l'erreur
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    // Corriger firstName et soumettre à nouveau
    fireEvent.change(firstName, { target: { value: "Jean" } });
    fireEvent.click(submitButton);

    // Vérifier succès
    await waitFor(() => {
      expect(screen.getByText(/Enregistrement réussi/i)).toBeInTheDocument();
    });

    // Vérifier le reset
    expect(firstName.value).toBe("");
    expect(lastName.value).toBe("");
    expect(email.value).toBe("");
    expect(dob.value).toBe("");
    expect(city.value).toBe("");
    expect(postalCode.value).toBe("");
  });

  // Test pour vérifier le cas où tous les champs sont vides
  test("verify form with all fields empty", () => {
    render(<Form />);

    // Vérifier que tous les champs sont vides par défaut
    const firstName = screen.getByTestId("nom").querySelector("input");
    const lastName = screen.getByTestId("prenom").querySelector("input");
    const email = screen.getByTestId("email").querySelector("input");
    const dob = screen.getByTestId("dob").querySelector("input");
    const city = screen.getByTestId("city").querySelector("input");
    const postalCode = screen.getByTestId("postalCode").querySelector("input");

    expect(firstName.value).toBe("");
    expect(lastName.value).toBe("");
    expect(email.value).toBe("");
    expect(dob.value).toBe("");
    expect(city.value).toBe("");
    expect(postalCode.value).toBe("");

    // Vérifier que le bouton Submit est désactivé
    const submitButton = screen.getByText(/Submit/i);
    expect(submitButton).toBeDisabled();
  });

  // Test pour vérifier le cas où l'utilisateur remplit certains champs puis les vide
  test("verify form with fields filled then emptied", () => {
    render(<Form />);

    // Remplir un champ
    const firstName = screen.getByTestId("nom").querySelector("input");
    fireEvent.change(firstName, { target: { value: "Jean" } });
    expect(firstName.value).toBe("Jean");

    // Vider le champ
    fireEvent.change(firstName, { target: { value: "" } });
    expect(firstName.value).toBe("");

    // Vérifier que le bouton Submit est désactivé
    const submitButton = screen.getByText(/Submit/i);
    expect(submitButton).toBeDisabled();
  });
});
