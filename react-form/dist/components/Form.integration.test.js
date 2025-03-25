"use strict";

var _react = require("@testing-library/react");
var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));
require("@testing-library/jest-dom");
var _Form = _interopRequireDefault(require("./Form"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
describe('Form Integration Tests', () => {
  beforeEach(() => {
    // Nettoyer le localStorage avant chaque test
    localStorage.clear();
  });
  test('should complete full registration flow successfully', async () => {
    const user = _userEvent.default.setup();
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));

    // Simulation de la saisie utilisateur complète
    const nomInput = _react.screen.getByTestId('nom').querySelector('input');
    const prenomInput = _react.screen.getByTestId('prenom').querySelector('input');
    const emailInput = _react.screen.getByTestId('email').querySelector('input');
    const dobInput = _react.screen.getByTestId('dob').querySelector('input');
    const cityInput = _react.screen.getByTestId('city').querySelector('input');
    const postalCodeInput = _react.screen.getByTestId('postalCode').querySelector('input');
    await user.type(nomInput, 'Martin');
    await user.type(prenomInput, 'Jean');
    await user.type(emailInput, 'jean.martin@email.com');

    // Définir une date de naissance valide (plus de 18 ans)
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 20);
    const formattedDate = pastDate.toISOString().split('T')[0];
    await user.type(dobInput, formattedDate);
    await user.type(cityInput, 'Paris');
    await user.type(postalCodeInput, '75001');

    // Soumettre le formulaire
    const submitButton = _react.screen.getByText('Submit');
    await user.click(submitButton);

    // Vérifier le message de succès
    await (0, _react.waitFor)(() => {
      expect(_react.screen.getByText('Enregistrement réussi')).toBeInTheDocument();
    });

    // Vérifier les données dans le localStorage
    const storedData = JSON.parse(localStorage.getItem('registrationData'));
    expect(storedData).toEqual({
      firstName: 'Martin',
      lastName: 'Jean',
      email: 'jean.martin@email.com',
      dob: formattedDate,
      city: 'Paris',
      postalCode: '75001'
    });

    // Vérifier que le formulaire a été réinitialisé
    expect(nomInput.value).toBe('');
    expect(prenomInput.value).toBe('');
  });
  test('should handle validation errors and recovery', async () => {
    const user = _userEvent.default.setup();
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));
    const nomInput = _react.screen.getByTestId('nom').querySelector('input');
    const prenomInput = _react.screen.getByTestId('prenom').querySelector('input');
    const emailInput = _react.screen.getByTestId('email').querySelector('input');
    const dobInput = _react.screen.getByTestId('dob').querySelector('input');
    const cityInput = _react.screen.getByTestId('city').querySelector('input');
    const postalCodeInput = _react.screen.getByTestId('postalCode').querySelector('input');

    // Saisir des données invalides
    await user.type(nomInput, '123');
    await user.type(emailInput, 'invalid-email');
    await user.type(cityInput, 'Paris123');
    await user.type(postalCodeInput, 'ABC');

    // Remplir les autres champs requis
    await user.type(prenomInput, 'Jean');
    const date = new Date();
    date.setFullYear(date.getFullYear() - 10); // Âge invalide
    await user.type(dobInput, date.toISOString().split('T')[0]);

    // Soumettre avec des erreurs
    const submitButton = _react.screen.getByText('Submit');
    await user.click(submitButton);

    // Vérifier les messages d'erreur
    await (0, _react.waitFor)(() => {
      expect(_react.screen.getByText(/Le champ nom ne doit contenir que des lettres/i)).toBeInTheDocument();
      expect(_react.screen.getByText(/Invalide champs email/i)).toBeInTheDocument();
      expect(_react.screen.getByText(/Le champ ville ne doit contenir que des lettres/i)).toBeInTheDocument();
      expect(_react.screen.getByText(/Le code postale doit être au format français/i)).toBeInTheDocument();
      expect(_react.screen.getByText(/Vous devez avoir plus de 18 ans/i)).toBeInTheDocument();
    });

    // Corriger les erreurs une par une
    await user.clear(nomInput);
    await user.type(nomInput, 'Martin');
    await user.clear(emailInput);
    await user.type(emailInput, 'martin@email.com');
    await user.clear(cityInput);
    await user.type(cityInput, 'Paris');
    await user.clear(postalCodeInput);
    await user.type(postalCodeInput, '75001');

    // Corriger la date de naissance
    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() - 20);
    await user.clear(dobInput);
    await user.type(dobInput, validDate.toISOString().split('T')[0]);

    // Soumettre à nouveau
    await user.click(submitButton);

    // Vérifier le succès
    await (0, _react.waitFor)(() => {
      expect(_react.screen.getByText('Enregistrement réussi')).toBeInTheDocument();
    });
  });
  test('should handle form state persistence correctly', async () => {
    const user = _userEvent.default.setup();
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form.default, {}));
    const nomInput = _react.screen.getByTestId('nom').querySelector('input');
    const prenomInput = _react.screen.getByTestId('prenom').querySelector('input');
    const emailInput = _react.screen.getByTestId('email').querySelector('input');
    const dobInput = _react.screen.getByTestId('dob').querySelector('input');
    const cityInput = _react.screen.getByTestId('city').querySelector('input');
    const postalCodeInput = _react.screen.getByTestId('postalCode').querySelector('input');

    // Remplir partiellement le formulaire
    await user.type(nomInput, 'Martin');
    await user.type(prenomInput, 'Jean');

    // Vérifier que le bouton est désactivé
    const submitButton = _react.screen.getByText('Submit');
    expect(submitButton).toBeDisabled();

    // Compléter le formulaire
    await user.type(emailInput, 'martin@email.com');
    const date = new Date();
    date.setFullYear(date.getFullYear() - 20);
    await user.type(dobInput, date.toISOString().split('T')[0]);
    await user.type(cityInput, 'Paris');
    await user.type(postalCodeInput, '75001');

    // Vérifier que le bouton est activé
    expect(submitButton).not.toBeDisabled();
  });
});