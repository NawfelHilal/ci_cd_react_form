import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  validateEmail,
  validatePostalCode,
  calculateAge,
  validateName,
  validateCity,
} from "../validation";

const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Nouvel état pour suivre si le formulaire a été soumis

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
  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    // Suppression des erreurs si on est après une soumission et que le champ devient valide
    if (submitted && validateName(value)) {
      setFieldErrors((prev) => {
        const { firstName, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    if (submitted && validateName(value)) {
      setFieldErrors((prev) => {
        const { lastName, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (submitted && validateEmail(value)) {
      setFieldErrors((prev) => {
        const { email, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleDobChange = (e) => {
    const value = e.target.value;
    setDob(value);
    if (submitted && calculateAge(value) >= 18) {
      setFieldErrors((prev) => {
        const { dob, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    if (submitted && validateCity(value)) {
      setFieldErrors((prev) => {
        const { city, ...rest } = prev;
        return rest;
      });
    }
  };

  const handlePostalCodeChange = (e) => {
    const value = e.target.value;
    setPostalCode(value);
    if (submitted && validatePostalCode(value)) {
      setFieldErrors((prev) => {
        const { postalCode, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Marquer le formulaire comme soumis

    // Vérifier tous les champs pour les erreurs
    const errors = {};

    if (!validateName(firstName)) {
      errors.firstName =
        "Le champ nom ne doit contenir que des lettres et des accents.";
    }

    if (!validateName(lastName)) {
      errors.lastName =
        "Le champ prenom ne doit contenir que des lettres et des accents.";
    }

    if (!validateEmail(email)) {
      errors.email = "Invalide champs email.";
    }

    const age = calculateAge(dob);
    if (age < 18) {
      errors.dob = "Vous devez avoir plus de 18 ans.";
    }

    if (!validateCity(city)) {
      errors.city =
        "Le champ ville ne doit contenir que des lettres et des accents.";
    }

    if (!validatePostalCode(postalCode)) {
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
      postalCode,
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

  return (
    <div>
      <Typography variant="h4">Form</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Nom"
              data-testid="nom"
              value={firstName}
              onChange={handleFirstNameChange}
              required
              fullWidth
              error={submitted && !!fieldErrors.firstName}
              helperText={submitted && fieldErrors.firstName}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Prenom"
              data-testid="prenom"
              value={lastName}
              onChange={handleLastNameChange}
              required
              fullWidth
              error={submitted && !!fieldErrors.lastName}
              helperText={submitted && fieldErrors.lastName}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Email"
              type="email"
              data-testid="email"
              value={email}
              onChange={handleEmailChange}
              required
              fullWidth
              error={submitted && !!fieldErrors.email}
              helperText={submitted && fieldErrors.email}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Date de naissance"
              type="date"
              data-testid="dob"
              value={dob}
              onChange={handleDobChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
              fullWidth
              error={submitted && !!fieldErrors.dob}
              helperText={submitted && fieldErrors.dob}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Ville"
              data-testid="city"
              value={city}
              onChange={handleCityChange}
              required
              fullWidth
              error={submitted && !!fieldErrors.city}
              helperText={submitted && fieldErrors.city}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Code Postale"
              data-testid="postalCode"
              value={postalCode}
              onChange={handlePostalCodeChange}
              required
              fullWidth
              error={submitted && !!fieldErrors.postalCode}
              helperText={submitted && fieldErrors.postalCode}
            />
          </Grid>
        </Grid>
        {submitted && error && <Typography color="error">{error}</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
          disabled={!isFormValid()}
        >
          Submit
        </Button>
      </form>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          Enregistrement réussi
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Form;
