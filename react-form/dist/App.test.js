"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
require("@testing-library/jest-dom");
var _App = _interopRequireDefault(require("./App"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
describe('App Component', () => {
  test('renders without crashing', () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_App.default, {}));
    // Le composant Form contient un titre "Form", donc nous pouvons vérifier 
    // que ce texte est bien présent dans le DOM
    const formElement = _react2.screen.getByText(/Form/i);
    expect(formElement).toBeInTheDocument();
  });
  test('renders Form component', () => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_App.default, {}));
    // Vérifier que des éléments attendus du Form sont présents
    // Par exemple, les champs du formulaire devraient être présents
    const nameField = _react2.screen.getByTestId('nom');
    const lastnameField = _react2.screen.getByTestId('prenom');
    const emailField = _react2.screen.getByTestId('email');
    const dobField = _react2.screen.getByTestId('dob');
    const cityField = _react2.screen.getByTestId('city');
    const postalCodeField = _react2.screen.getByTestId('postalCode');

    // Vérifier que tous ces éléments sont dans le document
    expect(nameField).toBeInTheDocument();
    expect(lastnameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(dobField).toBeInTheDocument();
    expect(cityField).toBeInTheDocument();
    expect(postalCodeField).toBeInTheDocument();
  });
  test('renders App with correct CSS class', () => {
    const {
      container
    } = (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_App.default, {}));
    const appDiv = container.firstChild;
    expect(appDiv).toHaveClass('App');
  });
});