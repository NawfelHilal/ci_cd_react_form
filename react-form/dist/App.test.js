"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
require("@testing-library/jest-dom");
var _App = _interopRequireDefault(require("./App"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
describe('App Component', function () {
  test('renders without crashing', function () {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_App["default"], {}));
    // Le composant Form contient un titre "Form", donc nous pouvons vérifier 
    // que ce texte est bien présent dans le DOM
    var formElement = _react2.screen.getByText(/Form/i);
    expect(formElement).toBeInTheDocument();
  });
  test('renders Form component', function () {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_App["default"], {}));
    // Vérifier que des éléments attendus du Form sont présents
    // Par exemple, les champs du formulaire devraient être présents
    var nameField = _react2.screen.getByTestId('nom');
    var lastnameField = _react2.screen.getByTestId('prenom');
    var emailField = _react2.screen.getByTestId('email');
    var dobField = _react2.screen.getByTestId('dob');
    var cityField = _react2.screen.getByTestId('city');
    var postalCodeField = _react2.screen.getByTestId('postalCode');

    // Vérifier que tous ces éléments sont dans le document
    expect(nameField).toBeInTheDocument();
    expect(lastnameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(dobField).toBeInTheDocument();
    expect(cityField).toBeInTheDocument();
    expect(postalCodeField).toBeInTheDocument();
  });
  test('renders App with correct CSS class', function () {
    var _render = (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_App["default"], {})),
      container = _render.container;
    var appDiv = container.firstChild;
    expect(appDiv).toHaveClass('App');
  });
});