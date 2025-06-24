import React, { useState, useEffect } from "react";
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
import { userService } from "../services/api";

/**
 * Composant de formulaire d'inscription
 * @component
 * @returns {JSX.Element} Formulaire avec validation des champs
 * @example
 * // Utilisation du composant
 * <Form />
 *
 * // Rendu:
 * // Un formulaire avec des champs pour:
 * // - Nom
 * // - Prénom
 * // - Email
 * // - Date de naissance
 * // - Ville
 * // - Code postal
 */
const Form = (props) => {
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
  const [submitted, setSubmitted] = useState(false);

  // Charger les données du localStorage au montage du composant
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("formData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData && typeof parsedData === "object") {
          setFirstName(parsedData.firstName || "");
          setLastName(parsedData.lastName || "");
          setEmail(parsedData.email || "");
          setDob(parsedData.dob || "");
          setCity(parsedData.city || "");
          setPostalCode(parsedData.postalCode || "");
        }
      }
    } catch (error) {
      console.error("Error loading form data:", error);
      // En cas d'erreur, réinitialiser le localStorage
      localStorage.removeItem("formData");
    }
  }, []);

  /**
   * Réinitialise tous les champs du formulaire
   * @function
   * @returns {void} Ne retourne rien
   * @example
   * resetForm(); // Réinitialise tous les champs à leur état initial
   */
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

  /**
   * Gère le changement du champ prénom
   * @function
   * @param {React.ChangeEvent<HTMLInputElement>} e - Événement de changement
   * @returns {void} Ne retourne rien
   * @example
   * <TextField onChange={handleFirstNameChange} />
   */
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

  /**
   * Gère le changement du champ nom
   * @function
   * @param {React.ChangeEvent<HTMLInputElement>} e - Événement de changement
   * @returns {void} Ne retourne rien
   * @example
   * <TextField onChange={handleLastNameChange} />
   */
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

  /**
   * Gère le changement du champ email
   * @function
   * @param {React.ChangeEvent<HTMLInputElement>} e - Événement de changement
   * @returns {void} Ne retourne rien
   * @example
   * <TextField onChange={handleEmailChange} />
   */
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

  /**
   * Gère le changement du champ date de naissance
   * @function
   * @param {React.ChangeEvent<HTMLInputElement>} e - Événement de changement
   * @returns {void} Ne retourne rien
   * @example
   * <TextField type="date" onChange={handleDobChange} />
   */
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

  /**
   * Gère le changement du champ ville
   * @function
   * @param {React.ChangeEvent<HTMLInputElement>} e - Événement de changement
   * @returns {void} Ne retourne rien
   * @example
   * <TextField onChange={handleCityChange} />
   */
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

  /**
   * Gère le changement du champ code postal
   * @function
   * @param {React.ChangeEvent<HTMLInputElement>} e - Événement de changement
   * @returns {void} Ne retourne rien
   * @example
   * <TextField onChange={handlePostalCodeChange} />
   */
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

  /**
   * Gère la soumission du formulaire
   * @function
   * @param {React.FormEvent<HTMLFormElement>} e - Événement de soumission
   * @returns {void} Ne retourne rien
   * @example
   * <form onSubmit={handleSubmit}>
   *   // ... champs du formulaire
   * </form>
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

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

    try {
      const formData = {
        firstName,
        lastName,
        email,
        dob,
        city,
        postalCode,
      };

      // Sauvegarder les données dans le localStorage avant l'appel API
      localStorage.setItem("formData", JSON.stringify(formData));

      // Appel au service API pour créer l'utilisateur
      await userService.createUser(formData);
      setOpenSuccess(true);
      if (props.onUserAdded) {
        props.onUserAdded(formData);
      }
      resetForm();
      // Supprimer les données du localStorage après une soumission réussie
      localStorage.removeItem("formData");
    } catch (error) {
      setError(
        error.message || "Erreur lors de l'enregistrement de l'utilisateur."
      );
      setOpenError(true);
    }
  };

  /**
   * Ferme la notification d'erreur
   * @function
   * @returns {void} Ne retourne rien
   * @example
   * <Snackbar onClose={handleCloseError} />
   */
  const handleCloseError = () => {
    setOpenError(false);
  };

  /**
   * Ferme la notification de succès
   * @function
   * @returns {void} Ne retourne rien
   * @example
   * <Snackbar onClose={handleCloseSuccess} />
   */
  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  /**
   * Vérifie si le formulaire est valide pour la soumission
   * @function
   * @returns {boolean} True si tous les champs requis sont remplis
   * @example
   * const submitButtonDisabled = !isFormValid();
   * <Button disabled={submitButtonDisabled}>Submit</Button>
   */
  const isFormValid = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      dob.trim() !== "" &&
      city.trim() !== "" &&
      postalCode.trim() !== ""
    );
  };

  return (
    <div>
      <Typography variant="h4">Form</Typography>
      <form onSubmit={handleSubmit} noValidate>
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
              type="text"
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
