"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _validation = require("../validation");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["firstName"],
  _excluded2 = ["lastName"],
  _excluded3 = ["email"],
  _excluded4 = ["dob"],
  _excluded5 = ["city"],
  _excluded6 = ["postalCode"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Form = function Form() {
  var _useState = (0, _react.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    firstName = _useState2[0],
    setFirstName = _useState2[1];
  var _useState3 = (0, _react.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    lastName = _useState4[0],
    setLastName = _useState4[1];
  var _useState5 = (0, _react.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    email = _useState6[0],
    setEmail = _useState6[1];
  var _useState7 = (0, _react.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    dob = _useState8[0],
    setDob = _useState8[1];
  var _useState9 = (0, _react.useState)(""),
    _useState10 = _slicedToArray(_useState9, 2),
    city = _useState10[0],
    setCity = _useState10[1];
  var _useState11 = (0, _react.useState)(""),
    _useState12 = _slicedToArray(_useState11, 2),
    postalCode = _useState12[0],
    setPostalCode = _useState12[1];
  var _useState13 = (0, _react.useState)(""),
    _useState14 = _slicedToArray(_useState13, 2),
    error = _useState14[0],
    setError = _useState14[1];
  var _useState15 = (0, _react.useState)({}),
    _useState16 = _slicedToArray(_useState15, 2),
    fieldErrors = _useState16[0],
    setFieldErrors = _useState16[1];
  var _useState17 = (0, _react.useState)(false),
    _useState18 = _slicedToArray(_useState17, 2),
    openError = _useState18[0],
    setOpenError = _useState18[1];
  var _useState19 = (0, _react.useState)(false),
    _useState20 = _slicedToArray(_useState19, 2),
    openSuccess = _useState20[0],
    setOpenSuccess = _useState20[1];
  var _useState21 = (0, _react.useState)(false),
    _useState22 = _slicedToArray(_useState21, 2),
    submitted = _useState22[0],
    setSubmitted = _useState22[1]; // Nouvel état pour suivre si le formulaire a été soumis

  var resetForm = function resetForm() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setDob("");
    setCity("");
    setPostalCode("");
    setError("");
    setFieldErrors({});
    setSubmitted(false); // Réinitialiser l'état de soumission
  };

  // Simplifiez tous les gestionnaires de changement pour ne pas afficher d'erreurs pendant la saisie
  var handleFirstNameChange = function handleFirstNameChange(e) {
    var value = e.target.value;
    setFirstName(value);
    // Suppression des erreurs si on est après une soumission et que le champ devient valide
    if (submitted && (0, _validation.validateName)(value)) {
      setFieldErrors(function (prev) {
        var firstName = prev.firstName,
          rest = _objectWithoutProperties(prev, _excluded);
        return rest;
      });
    }
  };
  var handleLastNameChange = function handleLastNameChange(e) {
    var value = e.target.value;
    setLastName(value);
    if (submitted && (0, _validation.validateName)(value)) {
      setFieldErrors(function (prev) {
        var lastName = prev.lastName,
          rest = _objectWithoutProperties(prev, _excluded2);
        return rest;
      });
    }
  };
  var handleEmailChange = function handleEmailChange(e) {
    var value = e.target.value;
    setEmail(value);
    if (submitted && (0, _validation.validateEmail)(value)) {
      setFieldErrors(function (prev) {
        var email = prev.email,
          rest = _objectWithoutProperties(prev, _excluded3);
        return rest;
      });
    }
  };
  var handleDobChange = function handleDobChange(e) {
    var value = e.target.value;
    setDob(value);
    if (submitted && (0, _validation.calculateAge)(value) >= 18) {
      setFieldErrors(function (prev) {
        var dob = prev.dob,
          rest = _objectWithoutProperties(prev, _excluded4);
        return rest;
      });
    }
  };
  var handleCityChange = function handleCityChange(e) {
    var value = e.target.value;
    setCity(value);
    if (submitted && (0, _validation.validateCity)(value)) {
      setFieldErrors(function (prev) {
        var city = prev.city,
          rest = _objectWithoutProperties(prev, _excluded5);
        return rest;
      });
    }
  };
  var handlePostalCodeChange = function handlePostalCodeChange(e) {
    var value = e.target.value;
    setPostalCode(value);
    if (submitted && (0, _validation.validatePostalCode)(value)) {
      setFieldErrors(function (prev) {
        var postalCode = prev.postalCode,
          rest = _objectWithoutProperties(prev, _excluded6);
        return rest;
      });
    }
  };
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true); // Marquer le formulaire comme soumis

    // Vérifier tous les champs pour les erreurs
    var errors = {};
    if (!(0, _validation.validateName)(firstName)) {
      errors.firstName = "Le champ nom ne doit contenir que des lettres et des accents.";
    }
    if (!(0, _validation.validateName)(lastName)) {
      errors.lastName = "Le champ prenom ne doit contenir que des lettres et des accents.";
    }
    if (!(0, _validation.validateEmail)(email)) {
      errors.email = "Invalide champs email.";
    }
    var age = (0, _validation.calculateAge)(dob);
    if (age < 18) {
      errors.dob = "Vous devez avoir plus de 18 ans.";
    }
    if (!(0, _validation.validateCity)(city)) {
      errors.city = "Le champ ville ne doit contenir que des lettres et des accents.";
    }
    if (!(0, _validation.validatePostalCode)(postalCode)) {
      errors.postalCode = "Le code postale doit être au format français.";
    }

    // Si des erreurs existent, afficher le toaster d'erreur
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError("Corrigez les erreurs dans le formulaire.");
      setOpenError(true);
      return;
    }

    // Si tout est valide, enregistrer et afficher le toaster de succès
    var formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      dob: dob,
      city: city,
      postalCode: postalCode
    };
    localStorage.setItem("registrationData", JSON.stringify(formData));
    resetForm();
    setOpenSuccess(true);
  };
  var handleCloseError = function handleCloseError() {
    setOpenError(false);
  };
  var handleCloseSuccess = function handleCloseSuccess() {
    setOpenSuccess(false);
  };

  // Modifier pour que le bouton soit activé si tous les champs ont une valeur, même s'il y a des erreurs
  var isFormValid = function isFormValid() {
    return firstName && lastName && email && dob && city && postalCode;
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
      variant: "h4",
      children: "Form"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("form", {
      onSubmit: handleSubmit,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Grid, {
        container: true,
        spacing: 2,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          item: true,
          xs: 4,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.TextField, {
            label: "Nom",
            "data-testid": "nom",
            value: firstName,
            onChange: handleFirstNameChange,
            required: true,
            fullWidth: true,
            error: submitted && !!fieldErrors.firstName,
            helperText: submitted && fieldErrors.firstName
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          item: true,
          xs: 4,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.TextField, {
            label: "Prenom",
            "data-testid": "prenom",
            value: lastName,
            onChange: handleLastNameChange,
            required: true,
            fullWidth: true,
            error: submitted && !!fieldErrors.lastName,
            helperText: submitted && fieldErrors.lastName
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          item: true,
          xs: 4,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.TextField, {
            label: "Email",
            type: "email",
            "data-testid": "email",
            value: email,
            onChange: handleEmailChange,
            required: true,
            fullWidth: true,
            error: submitted && !!fieldErrors.email,
            helperText: submitted && fieldErrors.email
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          item: true,
          xs: 4,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.TextField, {
            label: "Date de naissance",
            type: "date",
            "data-testid": "dob",
            value: dob,
            onChange: handleDobChange,
            InputLabelProps: {
              shrink: true
            },
            required: true,
            fullWidth: true,
            error: submitted && !!fieldErrors.dob,
            helperText: submitted && fieldErrors.dob
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          item: true,
          xs: 4,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.TextField, {
            label: "Ville",
            "data-testid": "city",
            value: city,
            onChange: handleCityChange,
            required: true,
            fullWidth: true,
            error: submitted && !!fieldErrors.city,
            helperText: submitted && fieldErrors.city
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          item: true,
          xs: 4,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.TextField, {
            label: "Code Postale",
            "data-testid": "postalCode",
            value: postalCode,
            onChange: handlePostalCodeChange,
            required: true,
            fullWidth: true,
            error: submitted && !!fieldErrors.postalCode,
            helperText: submitted && fieldErrors.postalCode
          })
        })]
      }), submitted && error && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
        color: "error",
        children: error
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
        type: "submit",
        variant: "contained",
        color: "primary",
        style: {
          marginTop: "16px"
        },
        disabled: !isFormValid(),
        children: "Submit"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Snackbar, {
      open: openError,
      autoHideDuration: 6000,
      onClose: handleCloseError,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Alert, {
        onClose: handleCloseError,
        severity: "error",
        sx: {
          width: "100%"
        },
        children: error
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Snackbar, {
      open: openSuccess,
      autoHideDuration: 6000,
      onClose: handleCloseSuccess,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Alert, {
        onClose: handleCloseSuccess,
        severity: "success",
        sx: {
          width: "100%"
        },
        children: "Enregistrement r\xE9ussi"
      })
    })]
  });
};
var _default = exports["default"] = Form;