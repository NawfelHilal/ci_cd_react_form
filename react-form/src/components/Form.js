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

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    if (!validateName(value)) {
      setFieldErrors((prev) => ({
        ...prev,
        firstName:
          "Le champ nom ne doit contenir que des lettres et des accents.",
      }));
    } else {
      setFieldErrors((prev) => {
        const { firstName, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    if (!validateName(value)) {
      setFieldErrors((prev) => ({
        ...prev,
        lastName:
          "Le champ prenom ne doit contenir que des lettres et des accents.",
      }));
    } else {
      setFieldErrors((prev) => {
        const { lastName, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setFieldErrors((prev) => ({ ...prev, email: "Invalide champs email." }));
    } else {
      setFieldErrors((prev) => {
        const { email, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleDobChange = (e) => {
    const value = e.target.value;
    setDob(value);
    const age = calculateAge(value);
    if (age < 18) {
      setFieldErrors((prev) => ({
        ...prev,
        dob: "Vous devez avoir plus de 18 ans.",
      }));
    } else {
      setFieldErrors((prev) => {
        const { dob, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    if (!validateCity(value)) {
      setFieldErrors((prev) => ({
        ...prev,
        city: "Le champ ville ne doit contenir que des lettres et des accents.",
      }));
    } else {
      setFieldErrors((prev) => {
        const { city, ...rest } = prev;
        return rest;
      });
    }
  };

  const handlePostalCodeChange = (e) => {
    const value = e.target.value;
    setPostalCode(value);
    if (!validatePostalCode(value)) {
      setFieldErrors((prev) => ({
        ...prev,
        postalCode: "Le code postale doit être au format français.",
      }));
    } else {
      setFieldErrors((prev) => {
        const { postalCode, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const age = calculateAge(dob);
    const errors = {};

    if (age < 18) {
      errors.dob = "Vous devez avoir plus de 18 ans.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError("Corrigez les erreurs dans le formulaire.");
      setOpenError(true);
      return;
    }

    const formData = {
      firstName,
      lastName,
      email,
      dob,
      city,
      postalCode,
    };

    localStorage.setItem("registrationData", JSON.stringify(formData));
    setFieldErrors({});
    setError("");
    setOpenSuccess(true);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const isFormValid = () => {
    return (
      firstName &&
      lastName &&
      email &&
      dob &&
      city &&
      postalCode &&
      !Object.keys(fieldErrors).length
    );
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
              error={!!fieldErrors.firstName}
              helperText={fieldErrors.firstName}
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
              error={!!fieldErrors.lastName}
              helperText={fieldErrors.lastName}
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
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
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
              error={!!fieldErrors.dob}
              helperText={fieldErrors.dob}
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
              error={!!fieldErrors.city}
              helperText={fieldErrors.city}
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
              error={!!fieldErrors.postalCode}
              helperText={fieldErrors.postalCode}
            />
          </Grid>
        </Grid>
        {error && <Typography color="error">{error}</Typography>}
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
