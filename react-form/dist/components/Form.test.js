"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
require("@testing-library/jest-dom");
var _Form = _interopRequireDefault(require("./Form"));
var _validation = require("../validation");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
describe("Form Component", () => {
  test("renders form", () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));
    const formElement = _react2.screen.getByText(/Form/i);
    expect(formElement).toBeInTheDocument();
  });
  test("verify champs name", () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean-Pierre"
      }
    });
    expect(firstName.value).toBe("Jean-Pierre");
    const lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Élise"
      }
    });
    expect(lastName.value).toBe("Élise");
  });
  test("verify validate name", () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean-Pierre"
      }
    });
    expect((0, _validation.validateName)(firstName.value)).toBe(true);
    const lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Élise&&&"
      }
    });
    expect((0, _validation.validateName)(lastName.value)).toBe(false);
  });
  test("verify email field", () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));
    const email = _react2.screen.getByTestId("email").querySelector("input");
    _react2.fireEvent.change(email, {
      target: {
        value: "test@example.com"
      }
    });
    expect(email.value).toBe("test@example.com");
    expect((0, _validation.validateEmail)(email.value)).toBe(true);
    _react2.fireEvent.change(email, {
      target: {
        value: "invalid-email"
      }
    });
    expect((0, _validation.validateEmail)(email.value)).toBe(false);
  });
  test("verify date of birth field", () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));
    const dob = _react2.screen.getByTestId("dob").querySelector("input");
    _react2.fireEvent.change(dob, {
      target: {
        value: "2000-01-01"
      }
    });
    expect(dob.value).toBe("2000-01-01");
    expect((0, _validation.calculateAge)(dob.value)).toBeGreaterThanOrEqual(18);
    _react2.fireEvent.change(dob, {
      target: {
        value: "2020-01-01"
      }
    });
    expect((0, _validation.calculateAge)(dob.value)).toBeLessThan(18);
  });
  test("verify city field", () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));
    const city = _react2.screen.getByTestId("city").querySelector("input");
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris"
      }
    });
    expect(city.value).toBe("Paris");
    expect((0, _validation.validateCity)(city.value)).toBe(true);
    _react2.fireEvent.change(city, {
      target: {
        value: "City123"
      }
    });
    expect((0, _validation.validateCity)(city.value)).toBe(false);
  });
  test("verify postal code field", () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));
    const postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "75001"
      }
    });
    expect(postalCode.value).toBe("75001");
    expect((0, _validation.validatePostalCode)(postalCode.value)).toBe(true);
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "ABCDE"
      }
    });
    expect((0, _validation.validatePostalCode)(postalCode.value)).toBe(false);
  });
  test("verify form submission", () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean"
      }
    });
    const lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Dupont"
      }
    });
    const email = _react2.screen.getByTestId("email").querySelector("input");
    _react2.fireEvent.change(email, {
      target: {
        value: "jean.dupont@example.com"
      }
    });
    const dob = _react2.screen.getByTestId("dob").querySelector("input");
    _react2.fireEvent.change(dob, {
      target: {
        value: "2000-01-01"
      }
    });
    const city = _react2.screen.getByTestId("city").querySelector("input");
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris"
      }
    });
    const postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "75001"
      }
    });
    const submitButton = _react2.screen.getByText(/Submit/i);
    expect(submitButton).not.toBeDisabled();
    _react2.fireEvent.click(submitButton);
    expect(_react2.screen.getByText(/Enregistrement réussi/i)).toBeInTheDocument();
  });
  test("verify data is stored in localStorage", () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean"
      }
    });
    const lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Dupont"
      }
    });
    const email = _react2.screen.getByTestId("email").querySelector("input");
    _react2.fireEvent.change(email, {
      target: {
        value: "jean.dupont@example.com"
      }
    });
    const dob = _react2.screen.getByTestId("dob").querySelector("input");
    _react2.fireEvent.change(dob, {
      target: {
        value: "2000-01-01"
      }
    });
    const city = _react2.screen.getByTestId("city").querySelector("input");
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris"
      }
    });
    const postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "75001"
      }
    });
    const submitButton = _react2.screen.getByText(/Submit/i);
    _react2.fireEvent.click(submitButton);
    const storedData = JSON.parse(localStorage.getItem("registrationData"));
    expect(storedData).toEqual({
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@example.com",
      dob: "2000-01-01",
      city: "Paris",
      postalCode: "75001"
    });
  });
  test("verify closing Snackbar messages", async () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean"
      }
    });
    const lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Dupont"
      }
    });
    const email = _react2.screen.getByTestId("email").querySelector("input");
    _react2.fireEvent.change(email, {
      target: {
        value: "jean.dupont@example.com"
      }
    });
    const dob = _react2.screen.getByTestId("dob").querySelector("input");
    _react2.fireEvent.change(dob, {
      target: {
        value: "2000-01-01"
      }
    });
    const city = _react2.screen.getByTestId("city").querySelector("input");
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris"
      }
    });
    const postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "75001"
      }
    });
    const submitButton = _react2.screen.getByText(/Submit/i);
    _react2.fireEvent.click(submitButton);
    const successSnackbar = _react2.screen.getByText(/Enregistrement réussi/i);
    expect(successSnackbar).toBeInTheDocument();
    const closeButton = _react2.screen.getByRole("button", {
      name: /close/i
    });
    _react2.fireEvent.click(closeButton);
    await (0, _react2.waitFor)(() => {
      expect(successSnackbar).not.toBeInTheDocument();
    });
  });
  test("verify submit button is disabled when form is invalid", () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: ""
      }
    });
    const lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    _react2.fireEvent.change(lastName, {
      target: {
        value: ""
      }
    });
    const email = _react2.screen.getByTestId("email").querySelector("input");
    _react2.fireEvent.change(email, {
      target: {
        value: "invalid-email"
      }
    });
    const dob = _react2.screen.getByTestId("dob").querySelector("input");
    _react2.fireEvent.change(dob, {
      target: {
        value: "2020-01-01"
      }
    });
    const city = _react2.screen.getByTestId("city").querySelector("input");
    _react2.fireEvent.change(city, {
      target: {
        value: "City123"
      }
    });
    const postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "ABCDE"
      }
    });
    const submitButton = _react2.screen.getByText(/Submit/i);
    expect(submitButton).toBeDisabled();
  });
  test("verify fields are cleared after successful submission", async () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean"
      }
    });
    const lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Dupont"
      }
    });
    const email = _react2.screen.getByTestId("email").querySelector("input");
    _react2.fireEvent.change(email, {
      target: {
        value: "jean.dupont@example.com"
      }
    });
    const dob = _react2.screen.getByTestId("dob").querySelector("input");
    _react2.fireEvent.change(dob, {
      target: {
        value: "2000-01-01"
      }
    });
    const city = _react2.screen.getByTestId("city").querySelector("input");
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris"
      }
    });
    const postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "75001"
      }
    });
    expect(firstName.value).toBe("Jean");
    expect(lastName.value).toBe("Dupont");
    expect(email.value).toBe("jean.dupont@example.com");
    expect(dob.value).toBe("2000-01-01");
    expect(city.value).toBe("Paris");
    expect(postalCode.value).toBe("75001");
    const submitButton = _react2.screen.getByText(/Submit/i);
    _react2.fireEvent.click(submitButton);
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.getByText(/Enregistrement réussi/i)).toBeInTheDocument();
    });
    expect(firstName.value).toBe("");
    expect(lastName.value).toBe("");
    expect(email.value).toBe("");
    expect(dob.value).toBe("");
    expect(city.value).toBe("");
    expect(postalCode.value).toBe("");
  });
  test("verify error handling on form submission with invalid data", async () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean123"
      }
    });
    const lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Dupont456"
      }
    });
    const email = _react2.screen.getByTestId("email").querySelector("input");
    _react2.fireEvent.change(email, {
      target: {
        value: "invalid-email"
      }
    });
    const dob = _react2.screen.getByTestId("dob").querySelector("input");
    _react2.fireEvent.change(dob, {
      target: {
        value: "2020-01-01"
      }
    });
    const city = _react2.screen.getByTestId("city").querySelector("input");
    _react2.fireEvent.change(city, {
      target: {
        value: "City123"
      }
    });
    const postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "ABCDE"
      }
    });
    const submitButton = _react2.screen.getByText(/Submit/i);
    _react2.fireEvent.click(submitButton);
    await (0, _react2.waitFor)(() => {
      const errorAlert = _react2.screen.getByRole("alert");
      expect(errorAlert).toBeInTheDocument();
      expect(errorAlert).toHaveTextContent(/Corrigez les erreurs/i);
    });
  });
  test("verify closing error Snackbar message", async () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));
    // Remplir le formulaire avec des données invalides
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean123"
      }
    });
    const lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Dupont"
      }
    });
    const email = _react2.screen.getByTestId("email").querySelector("input");
    _react2.fireEvent.change(email, {
      target: {
        value: "jean.dupont@example.com"
      }
    });
    const dob = _react2.screen.getByTestId("dob").querySelector("input");
    _react2.fireEvent.change(dob, {
      target: {
        value: "2000-01-01"
      }
    });
    const city = _react2.screen.getByTestId("city").querySelector("input");
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris"
      }
    });
    const postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "75001"
      }
    });

    // Soumettre le formulaire pour déclencher l'erreur
    const submitButton = _react2.screen.getByText(/Submit/i);
    _react2.fireEvent.click(submitButton);

    // Attendre l'affichage de l'alerte d'erreur
    await (0, _react2.waitFor)(() => {
      const errorAlert = _react2.screen.getByRole("alert");
      expect(errorAlert).toBeInTheDocument();
    });

    // Fermer la notification d'erreur
    const closeButton = _react2.screen.getAllByRole("button", {
      name: /close/i
    })[0];
    _react2.fireEvent.click(closeButton);

    // Vérifier que la notification d'erreur est fermée
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });
  test("verify field errors are cleared when field value becomes valid", async () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));

    // Remplir tous les champs avec des valeurs (certaines invalides)
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean123"
      }
    });
    const lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Dupont"
      }
    });
    const email = _react2.screen.getByTestId("email").querySelector("input");
    _react2.fireEvent.change(email, {
      target: {
        value: "jean.dupont@example.com"
      }
    });
    const dob = _react2.screen.getByTestId("dob").querySelector("input");
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 20);
    const formattedPastDate = pastDate.toISOString().split("T")[0];
    _react2.fireEvent.change(dob, {
      target: {
        value: formattedPastDate
      }
    });
    const city = _react2.screen.getByTestId("city").querySelector("input");
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris"
      }
    });
    const postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "75001"
      }
    });

    // Soumettre le formulaire pour déclencher l'affichage des erreurs
    const submitButton = _react2.screen.getByText(/Submit/i);
    _react2.fireEvent.click(submitButton);

    // Attendre que les erreurs s'affichent
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.getByText(/Le champ nom ne doit contenir que des lettres/i)).toBeInTheDocument();
    });

    // Corriger le champ firstName
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean"
      }
    });

    // Vérifier que l'erreur a disparu
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.queryByText(/Le champ nom ne doit contenir que des lettres/i)).not.toBeInTheDocument();
    });

    // Pour tester l'email, d'abord le rendre invalide
    _react2.fireEvent.change(email, {
      target: {
        value: "invalid-email"
      }
    });

    // Soumettre à nouveau pour afficher l'erreur d'email
    _react2.fireEvent.click(submitButton);
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.getByText(/Invalide champs email/i)).toBeInTheDocument();
    });

    // Corriger l'email
    _react2.fireEvent.change(email, {
      target: {
        value: "valid@example.com"
      }
    });

    // Vérifier que l'erreur d'email a disparu
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.queryByText(/Invalide champs email/i)).not.toBeInTheDocument();
    });
  });
  test("verify age calculation and validation", async () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));

    // Remplir les champs requis pour pouvoir soumettre
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean"
      }
    });
    const lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Dupont"
      }
    });
    const email = _react2.screen.getByTestId("email").querySelector("input");
    _react2.fireEvent.change(email, {
      target: {
        value: "jean.dupont@example.com"
      }
    });
    const city = _react2.screen.getByTestId("city").querySelector("input");
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris"
      }
    });
    const postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "75001"
      }
    });

    // Test avec un âge inférieur à 18 ans
    const dob = _react2.screen.getByTestId("dob").querySelector("input");
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() - 10); // 10 ans
    const formattedFutureDate = futureDate.toISOString().split("T")[0];
    _react2.fireEvent.change(dob, {
      target: {
        value: formattedFutureDate
      }
    });

    // Soumettre pour afficher l'erreur
    const submitButton = _react2.screen.getByText(/Submit/i);
    _react2.fireEvent.click(submitButton);
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.getByText(/Vous devez avoir plus de 18 ans/i)).toBeInTheDocument();
    });

    // Test avec un âge supérieur à 18 ans
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 20); // 20 ans
    const formattedPastDate = pastDate.toISOString().split("T")[0];
    _react2.fireEvent.change(dob, {
      target: {
        value: formattedPastDate
      }
    });

    // Vérifier que l'erreur disparaît
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.queryByText(/Vous devez avoir plus de 18 ans/i)).not.toBeInTheDocument();
    });
  });
  test("verify postal code validation", async () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));

    // Remplir les champs requis pour pouvoir soumettre
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean"
      }
    });
    const lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Dupont"
      }
    });
    const email = _react2.screen.getByTestId("email").querySelector("input");
    _react2.fireEvent.change(email, {
      target: {
        value: "jean.dupont@example.com"
      }
    });
    const dob = _react2.screen.getByTestId("dob").querySelector("input");
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 20);
    const formattedPastDate = pastDate.toISOString().split("T")[0];
    _react2.fireEvent.change(dob, {
      target: {
        value: formattedPastDate
      }
    });
    const city = _react2.screen.getByTestId("city").querySelector("input");
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris"
      }
    });

    // Test avec un code postal invalide
    const postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "1234"
      }
    }); // trop court

    // Soumettre pour afficher l'erreur
    const submitButton = _react2.screen.getByText(/Submit/i);
    _react2.fireEvent.click(submitButton);
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.getByText(/Le code postale doit être au format français/i)).toBeInTheDocument();
    });

    // Test avec des lettres
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "ABCDE"
      }
    });
    _react2.fireEvent.click(submitButton);
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.getByText(/Le code postale doit être au format français/i)).toBeInTheDocument();
    });

    // Test avec un code postal valide
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "75001"
      }
    });

    // Vérifier que l'erreur disparaît
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.queryByText(/Le code postale doit être au format français/i)).not.toBeInTheDocument();
    });
  });

  // Ajoutez ce test pour vérifier la validation de la ville
  test("verify city validation", async () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));

    // Remplir les champs requis pour pouvoir soumettre
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean"
      }
    });
    const lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Dupont"
      }
    });
    const email = _react2.screen.getByTestId("email").querySelector("input");
    _react2.fireEvent.change(email, {
      target: {
        value: "jean.dupont@example.com"
      }
    });
    const dob = _react2.screen.getByTestId("dob").querySelector("input");
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 20);
    const formattedPastDate = pastDate.toISOString().split("T")[0];
    _react2.fireEvent.change(dob, {
      target: {
        value: formattedPastDate
      }
    });
    const postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "75001"
      }
    });

    // Test avec une ville invalide
    const city = _react2.screen.getByTestId("city").querySelector("input");
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris123"
      }
    }); // Ville avec chiffres

    // Soumettre pour afficher l'erreur
    const submitButton = _react2.screen.getByText(/Submit/i);
    _react2.fireEvent.click(submitButton);
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.getByText(/Le champ ville ne doit contenir que des lettres/i)).toBeInTheDocument();
    });

    // Test avec une ville valide
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris"
      }
    });

    // Vérifier que l'erreur disparaît
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.queryByText(/Le champ ville ne doit contenir que des lettres/i)).not.toBeInTheDocument();
    });
  });

  // Test pour vérifier le reset du formulaire avec un champ firstName invalide
  test("verify form reset with invalid firstName", async () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));

    // Remplir les champs avec firstName invalide
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean123"
      }
    });
    const lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Dupont"
      }
    });
    const email = _react2.screen.getByTestId("email").querySelector("input");
    _react2.fireEvent.change(email, {
      target: {
        value: "jean.dupont@example.com"
      }
    });
    const dob = _react2.screen.getByTestId("dob").querySelector("input");
    _react2.fireEvent.change(dob, {
      target: {
        value: "2000-01-01"
      }
    });
    const city = _react2.screen.getByTestId("city").querySelector("input");
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris"
      }
    });
    const postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "75001"
      }
    });

    // Soumettre le formulaire
    const submitButton = _react2.screen.getByText(/Submit/i);
    _react2.fireEvent.click(submitButton);

    // Attendre l'erreur
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.getByRole("alert")).toBeInTheDocument();
    });

    // Corriger firstName et soumettre à nouveau
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean"
      }
    });
    _react2.fireEvent.click(submitButton);

    // Vérifier succès
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.getByText(/Enregistrement réussi/i)).toBeInTheDocument();
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
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));

    // Vérifier que tous les champs sont vides par défaut
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    const lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    const email = _react2.screen.getByTestId("email").querySelector("input");
    const dob = _react2.screen.getByTestId("dob").querySelector("input");
    const city = _react2.screen.getByTestId("city").querySelector("input");
    const postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    expect(firstName.value).toBe("");
    expect(lastName.value).toBe("");
    expect(email.value).toBe("");
    expect(dob.value).toBe("");
    expect(city.value).toBe("");
    expect(postalCode.value).toBe("");

    // Vérifier que le bouton Submit est désactivé
    const submitButton = _react2.screen.getByText(/Submit/i);
    expect(submitButton).toBeDisabled();
  });

  // Test pour vérifier le cas où l'utilisateur remplit certains champs puis les vide
  test("verify form with fields filled then emptied", () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));

    // Remplir un champ
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean"
      }
    });
    expect(firstName.value).toBe("Jean");

    // Vider le champ
    _react2.fireEvent.change(firstName, {
      target: {
        value: ""
      }
    });
    expect(firstName.value).toBe("");

    // Vérifier que le bouton Submit est désactivé
    const submitButton = _react2.screen.getByText(/Submit/i);
    expect(submitButton).toBeDisabled();
  });

  // Test pour vérifier handleFirstNameChange avec validation d'entrée
  test("verify handleFirstNameChange with valid and invalid input", async () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));

    // Remplir tous les champs pour pouvoir soumettre
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    const lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    const email = _react2.screen.getByTestId("email").querySelector("input");
    const dob = _react2.screen.getByTestId("dob").querySelector("input");
    const city = _react2.screen.getByTestId("city").querySelector("input");
    const postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");

    // Remplir avec des valeurs valides
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Dupont"
      }
    });
    _react2.fireEvent.change(email, {
      target: {
        value: "jean.dupont@example.com"
      }
    });
    _react2.fireEvent.change(dob, {
      target: {
        value: "2000-01-01"
      }
    });
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris"
      }
    });
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "75001"
      }
    });

    // Entrer une valeur invalide pour firstName
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean123"
      }
    });

    // Soumettre pour déclencher la validation
    const submitButton = _react2.screen.getByText(/Submit/i);
    _react2.fireEvent.click(submitButton);

    // Vérifier que l'erreur est affichée
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.getByText(/Le champ nom ne doit contenir que des lettres/i)).toBeInTheDocument();
    });

    // Corriger avec une valeur valide
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean"
      }
    });

    // Vérifier que l'erreur a disparu
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.queryByText(/Le champ nom ne doit contenir que des lettres/i)).not.toBeInTheDocument();
    });
  });

  // Test pour vérifier handleLastNameChange avec validation d'entrée
  test("verify handleLastNameChange with valid and invalid input", async () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));

    // Remplir tous les champs pour pouvoir soumettre
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    const lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    const email = _react2.screen.getByTestId("email").querySelector("input");
    const dob = _react2.screen.getByTestId("dob").querySelector("input");
    const city = _react2.screen.getByTestId("city").querySelector("input");
    const postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");

    // Remplir avec des valeurs valides
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean"
      }
    });
    _react2.fireEvent.change(email, {
      target: {
        value: "jean.dupont@example.com"
      }
    });
    _react2.fireEvent.change(dob, {
      target: {
        value: "2000-01-01"
      }
    });
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris"
      }
    });
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "75001"
      }
    });

    // Entrer une valeur invalide pour lastName
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Dupont123"
      }
    });

    // Soumettre pour déclencher la validation
    const submitButton = _react2.screen.getByText(/Submit/i);
    _react2.fireEvent.click(submitButton);

    // Vérifier que l'erreur est affichée
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.getByText(/Le champ prenom ne doit contenir que des lettres/i)).toBeInTheDocument();
    });

    // Corriger avec une valeur valide
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Dupont"
      }
    });

    // Vérifier que l'erreur a disparu
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.queryByText(/Le champ prenom ne doit contenir que des lettres/i)).not.toBeInTheDocument();
    });
  });

  // Test pour vérifier la gestion des erreurs multiples
  test("verify handling of multiple errors simultaneously", async () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));

    // Remplir tous les champs avec des valeurs invalides
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    const lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    const email = _react2.screen.getByTestId("email").querySelector("input");
    const dob = _react2.screen.getByTestId("dob").querySelector("input");
    const city = _react2.screen.getByTestId("city").querySelector("input");
    const postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean123"
      }
    });
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Dupont456"
      }
    });
    _react2.fireEvent.change(email, {
      target: {
        value: "invalid-email"
      }
    });
    const today = new Date();
    today.setFullYear(today.getFullYear() - 10); // 10 ans
    const formattedDate = today.toISOString().split("T")[0];
    _react2.fireEvent.change(dob, {
      target: {
        value: formattedDate
      }
    });
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris123"
      }
    });
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "ABCDE"
      }
    });

    // Soumettre pour déclencher toutes les validations
    const submitButton = _react2.screen.getByText(/Submit/i);
    _react2.fireEvent.click(submitButton);

    // Vérifier que toutes les erreurs sont affichées
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.getByText(/Le champ nom ne doit contenir que des lettres/i)).toBeInTheDocument();
      expect(_react2.screen.getByText(/Le champ prenom ne doit contenir que des lettres/i)).toBeInTheDocument();
      expect(_react2.screen.getByText(/Invalide champs email/i)).toBeInTheDocument();
      expect(_react2.screen.getByText(/Vous devez avoir plus de 18 ans/i)).toBeInTheDocument();
      expect(_react2.screen.getByText(/Le champ ville ne doit contenir que des lettres/i)).toBeInTheDocument();
      expect(_react2.screen.getByText(/Le code postale doit être au format français/i)).toBeInTheDocument();
    });

    // Corriger tous les champs
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean"
      }
    });
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Dupont"
      }
    });
    _react2.fireEvent.change(email, {
      target: {
        value: "jean.dupont@example.com"
      }
    });
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 20); // 20 ans
    const formattedPastDate = pastDate.toISOString().split("T")[0];
    _react2.fireEvent.change(dob, {
      target: {
        value: formattedPastDate
      }
    });
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris"
      }
    });
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "75001"
      }
    });

    // Soumettre à nouveau
    _react2.fireEvent.click(submitButton);

    // Vérifier que le message de succès s'affiche
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.getByText(/Enregistrement réussi/i)).toBeInTheDocument();
    });
  });

  // Test pour vérifier submitted state et error message persistance
  test("verify error message persistence after submission", async () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));

    // Remplir les champs avec une valeur invalide
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean123"
      }
    });
    const lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Dupont"
      }
    });
    const email = _react2.screen.getByTestId("email").querySelector("input");
    _react2.fireEvent.change(email, {
      target: {
        value: "jean.dupont@example.com"
      }
    });
    const dob = _react2.screen.getByTestId("dob").querySelector("input");
    _react2.fireEvent.change(dob, {
      target: {
        value: "2000-01-01"
      }
    });
    const city = _react2.screen.getByTestId("city").querySelector("input");
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris"
      }
    });
    const postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "75001"
      }
    });

    // Soumettre le formulaire
    const submitButton = _react2.screen.getByText(/Submit/i);
    _react2.fireEvent.click(submitButton);

    // Vérifier que l'erreur est affichée
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.getByText(/Le champ nom ne doit contenir que des lettres/i)).toBeInTheDocument();
    });

    // Ne pas corriger le champ, mais soumettre à nouveau
    _react2.fireEvent.click(submitButton);

    // Vérifier que l'erreur est toujours affichée
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.getByText(/Le champ nom ne doit contenir que des lettres/i)).toBeInTheDocument();
    });
  });

  // Test pour vérifier le comportement des cases vides après reset
  test("verify empty fields after reset", async () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));

    // Remplir tous les champs
    const firstName = _react2.screen.getByTestId("nom").querySelector("input");
    const lastName = _react2.screen.getByTestId("prenom").querySelector("input");
    const email = _react2.screen.getByTestId("email").querySelector("input");
    const dob = _react2.screen.getByTestId("dob").querySelector("input");
    const city = _react2.screen.getByTestId("city").querySelector("input");
    const postalCode = _react2.screen.getByTestId("postalCode").querySelector("input");
    _react2.fireEvent.change(firstName, {
      target: {
        value: "Jean"
      }
    });
    _react2.fireEvent.change(lastName, {
      target: {
        value: "Dupont"
      }
    });
    _react2.fireEvent.change(email, {
      target: {
        value: "jean.dupont@example.com"
      }
    });
    _react2.fireEvent.change(dob, {
      target: {
        value: "2000-01-01"
      }
    });
    _react2.fireEvent.change(city, {
      target: {
        value: "Paris"
      }
    });
    _react2.fireEvent.change(postalCode, {
      target: {
        value: "75001"
      }
    });

    // Soumettre le formulaire
    const submitButton = _react2.screen.getByText(/Submit/i);
    _react2.fireEvent.click(submitButton);

    // Vérifier que le formulaire est réinitialisé
    await (0, _react2.waitFor)(() => {
      expect(firstName.value).toBe("");
      expect(lastName.value).toBe("");
      expect(email.value).toBe("");
      expect(dob.value).toBe("");
      expect(city.value).toBe("");
      expect(postalCode.value).toBe("");
      expect(submitButton).toBeDisabled(); // Le bouton doit être désactivé après réinitialisation
    });
  });
});