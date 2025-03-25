"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _validation = require("../validation");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Form = () => {
  const [firstName, setFirstName] = (0, _react.useState)("");
  const [lastName, setLastName] = (0, _react.useState)("");
  const [email, setEmail] = (0, _react.useState)("");
  const [dob, setDob] = (0, _react.useState)("");
  const [city, setCity] = (0, _react.useState)("");
  const [postalCode, setPostalCode] = (0, _react.useState)("");
  const [error, setError] = (0, _react.useState)("");
  const [fieldErrors, setFieldErrors] = (0, _react.useState)({});
  const [openError, setOpenError] = (0, _react.useState)(false);
  const [openSuccess, setOpenSuccess] = (0, _react.useState)(false);
  const [submitted, setSubmitted] = (0, _react.useState)(false); // Nouvel état pour suivre si le formulaire a été soumis

  const resetForm = () => {
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
  const handleFirstNameChange = e => {
    const value = e.target.value;
    setFirstName(value);
    // Suppression des erreurs si on est après une soumission et que le champ devient valide
    if (submitted && (0, _validation.validateName)(value)) {
      setFieldErrors(prev => {
        const {
          firstName,
          ...rest
        } = prev;
        return rest;
      });
    }
  };
  const handleLastNameChange = e => {
    const value = e.target.value;
    setLastName(value);
    if (submitted && (0, _validation.validateName)(value)) {
      setFieldErrors(prev => {
        const {
          lastName,
          ...rest
        } = prev;
        return rest;
      });
    }
  };
  const handleEmailChange = e => {
    const value = e.target.value;
    setEmail(value);
    if (submitted && (0, _validation.validateEmail)(value)) {
      setFieldErrors(prev => {
        const {
          email,
          ...rest
        } = prev;
        return rest;
      });
    }
  };
  const handleDobChange = e => {
    const value = e.target.value;
    setDob(value);
    if (submitted && (0, _validation.calculateAge)(value) >= 18) {
      setFieldErrors(prev => {
        const {
          dob,
          ...rest
        } = prev;
        return rest;
      });
    }
  };
  const handleCityChange = e => {
    const value = e.target.value;
    setCity(value);
    if (submitted && (0, _validation.validateCity)(value)) {
      setFieldErrors(prev => {
        const {
          city,
          ...rest
        } = prev;
        return rest;
      });
    }
  };
  const handlePostalCodeChange = e => {
    const value = e.target.value;
    setPostalCode(value);
    if (submitted && (0, _validation.validatePostalCode)(value)) {
      setFieldErrors(prev => {
        const {
          postalCode,
          ...rest
        } = prev;
        return rest;
      });
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true); // Marquer le formulaire comme soumis

    // Vérifier tous les champs pour les erreurs
    const errors = {};
    if (!(0, _validation.validateName)(firstName)) {
      errors.firstName = "Le champ nom ne doit contenir que des lettres et des accents.";
    }
    if (!(0, _validation.validateName)(lastName)) {
      errors.lastName = "Le champ prenom ne doit contenir que des lettres et des accents.";
    }
    if (!(0, _validation.validateEmail)(email)) {
      errors.email = "Invalide champs email.";
    }
    const age = (0, _validation.calculateAge)(dob);
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
    const formData = {
      firstName,
      lastName,
      email,
      dob,
      city,
      postalCode
    };
    localStorage.setItem("registrationData", JSON.stringify(formData));
    resetForm();
    setOpenSuccess(true);
  };
  const handleCloseError = () => {
    setOpenError(false);
  };
  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  // Modifier pour que le bouton soit activé si tous les champs ont une valeur, même s'il y a des erreurs
  const isFormValid = () => {
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
var _default = exports.default = Form;